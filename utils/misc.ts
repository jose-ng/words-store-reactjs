import { isEnvDev } from "./env";

function allowCreate(ip: string): Boolean {
  if (ip === process.env.IP || isEnvDev) return true;
  else return false;
}

export { allowCreate };
