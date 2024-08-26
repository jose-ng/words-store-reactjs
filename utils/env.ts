import { EnvValue, EnvItem } from '../models/env.model';
import {
  CLIENT_DOMAIN,
  CLIENT_DOMAIN_LOCAL,
  API_DOMAIN,
  API_DOMAIN_LOCAL
} from './domains';
let envName = process.env.NEXT_PUBLIC_ENV_NAME!;

export default class Env {
  static values: EnvValue = {
    dev: {
      domain: {
        local: CLIENT_DOMAIN_LOCAL,
        default: CLIENT_DOMAIN,
      },
      apiDomain: API_DOMAIN,
    },
    qa: {
      domain: {
        local: CLIENT_DOMAIN_LOCAL,
        default: CLIENT_DOMAIN,
      },
      apiDomain: API_DOMAIN,
    },
    prod: {
      domain: {
        local: CLIENT_DOMAIN_LOCAL,
        default: CLIENT_DOMAIN,
      },
      apiDomain: API_DOMAIN,
    },
  };

  static getVar(varName: string) {
    console.log("env: ", envName)
    const envValues = this.values[envName];
    const accesors = varName.split('.');
    const envItem: EnvItem = envValues;
    let finalValue = '';
    for (const accesor of accesors) {
      finalValue = envItem[accesor] as string;
    }
    return finalValue;
  }
}

export { envName };
