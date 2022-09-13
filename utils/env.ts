
const isClient = typeof window !== 'undefined';
console.log(isClient && window.location.host)
const URL_API = isClient && window.location.host.includes("http://localhost:3000")
  ? "http://localhost:3000/api"
  : "https://words-t.vercel.app/api";

export default URL_API;
