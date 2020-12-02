const FOLDER_NAME = "post_requests";

function openDatabase() {
  // if `react-form` does not already exist in our browser (under  our site), it is created
  var indexedDBOpenRequest = indexedDB.open("react-form", 1);
  indexedDBOpenRequest.onerror = function (error) {
    // error creating db
    console.error("IndexedDB error:", error);
  };
  indexedDBOpenRequest.onupgradeneeded = function () {
    // This should only executes if there's a need to
    // create/update db.
    this.result.createObjectStore(FOLDER_NAME, {
      autoIncrement: true,
      keyPath: "id",
    });
  };
  // This will execute each time the database is opened.
  indexedDBOpenRequest.onsuccess = function () {
    our_db = this.result;
  };
}
var our_db;
openDatabase();

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const cacheName = "v1";
let cacheUrls = [];
var form_data;

self.addEventListener("install", function (e) {
  const installPromise = new Promise(function (resolve, reject) {
    console.log("Service Worker: Installed");
    e.waitUntil(
      caches
        .open(cacheName)
        .then((cache) => {
          // console.log("Service Worker: Caching Files");
          // console.log(cacheUrls);
          // slice(1) skip the fetch request to http://tenant1.localhost:8000/admin/list-workers
          // try again when Django can serve all routes
          cache.addAll(cacheUrls); //.slice(1)
        })
        .then(() => self.skipWaiting())
    );

    // eslint-disable-next-line
    self.addEventListener("message", function (e) {
      //New for post handling
      if (e.data.hasOwnProperty("form_data")) {
        // receives form data from Login upon submission
        form_data = e.data.form_data;
        // console.log("form data", e.data);
      }

      if (e.data.payload != undefined) {
        cacheUrls.push(...e.data.payload);
      }
      resolve();
    });
  });

  e.waitUntil(installPromise);
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");

  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

//funcion para guardar en indexDB
function getObjectStore(storeName, mode) {
  try {
    // retrieve our object store
    return our_db.transaction(storeName, mode).objectStore(storeName);
  } catch (err) {
    // No need to handle this error
  }
}
function savePostRequests(url, payload) {
  // get object_store and save our payload inside it
  var request = getObjectStore(FOLDER_NAME, "readwrite").add({
    url: url,
    payload: payload,
    method: "POST",
  });
  request.onsuccess = function (event) {
    console.log("a new pos_ request has been added to indexedb");
  };
  request.onerror = function (error) {
    console.error(error);
  };
}
//-------------------------------

// Call Fetch Event
self.addEventListener("fetch", (e) => {
  if (e.request.clone().method === "GET") {
    //Codigo inicial para GET --- ---
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const resClone = res.clone();
          caches.open(cacheName).then((cache) => {
            cache.put(e.request, resClone);
          });
          return res;
        })
        .catch((err) => caches.match(e.request).then((res) => res))
    );
    // --- --- --- --- --- --- --- --
  } else if (e.request.clone().method === "POST") {
    // attempt to send request normally
    e.respondWith(
      fetch(e.request.clone()).catch(function (error) {
        // only save post requests in browser, if an error occurs
        savePostRequests(e.request.clone().url, form_data);
      })
    );
  }
});

// Sync - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// communication service-worker -> client
const channel = new BroadcastChannel("sw-messages");

function sendPostToServer() {
  try {
    var savedRequests = [];

    var req = getObjectStore(FOLDER_NAME).openCursor();
    req.onsuccess = async function (event) {
      var cursor = event.target.result;
      if (cursor) {
        // Keep moving the cursor forward and collecting saved
        // requests.
        savedRequests.push(cursor.value);
        cursor.continue();
      } else {
        // At this point, we have collected all the post requests in
        // indexedb.
        for (let savedRequest of savedRequests) {
          // send them to the server one after the other
          // console.log("saved request", savedRequest);
          var requestUrl = savedRequest.url;
          var payload = JSON.stringify(savedRequest.payload);
          var method = savedRequest.method;
          var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
          }; // if you have any other headers put them here
          fetch(requestUrl, {
            headers: headers,
            method: method,
            body: payload,
          })
            .then(function (response) {
              // console.log("server response", response);
              // Message from service-worker to client -- -- -|              
              channel.postMessage({ 
                response: response.status,
                email: savedRequest.payload.user.email
              });
              // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- |

              //if (response.status < 400) { // for custom response messages from  server
              // If sending the POST request was successful, then
              // remove it from the IndexedDB.
              getObjectStore(FOLDER_NAME, "readwrite").delete(savedRequest.id);
              //}
            })
            .catch(function (error) {
              // This will be triggered if the network is still down.
              // The request will be replayed again
              // the next time the service worker starts up.
              console.error("Send to Server failed:", error);
              // since we are in a catch, it is important an error is
              //thrown,so the background sync knows to keep retrying
              // the send to server
              throw error;
            });
        }
      }
    };
  } catch (err) {
    // No need to handle this error
  }
}

self.addEventListener("sync", function (event) {
  // console.log('now online');
  if (event.tag === "sendFormData") {
    // event.tag name checked
    // here must be the same as the one used while registering
    // sync
    event.waitUntil(
      // Send our POST request to the server, now that the user is
      // online
      sendPostToServer()
    );
  }
});
