import { isEnvDev } from "./env";

function allowCreate(code: string): Boolean {
  if (code === process.env.CODE || isEnvDev) return true;
  else return false;
}

export { allowCreate };
