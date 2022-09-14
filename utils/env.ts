const isClient = typeof window !== "undefined";

const URL_API = isClient
  ? window.location.host.includes("localhost")
    ? "http://localhost:3000/api"
    : "https://words-t.vercel.app/api"
  : "";
console.log(URL_API);
export default URL_API;
