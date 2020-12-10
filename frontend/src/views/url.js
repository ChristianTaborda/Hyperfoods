let path = "";
let adminPath = "";

if (
  window.location.hostname.split(".").some((params) => params === "localhost")
) {
  path = `${window.location.hostname}:8000`;
  adminPath = "localhost:8000";
} else {
  path = `https://${window.location.hostname}`;
  adminPath = `https://${window.location.hostname.split(".").slice(1).join(".")}`;
}

export { adminPath };
export default path;

// Comentar todo y descomentar esto para trabajar desde React
// export default "tenant1.localhost:8000";
// export const adminPath = "localhost:8000";