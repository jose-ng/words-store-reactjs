type Domain = {
  local: string;
  default: string;
};

export type EnvItem = {
  [item: string]: Domain | string;
};

export type EnvValue = {
  [envName: string]: EnvItem;
};
