self.addEventListener('install', function(event) {
  console.log("Hello World")
})

self.addEventListener('fetch',() => console.log("fetch"));