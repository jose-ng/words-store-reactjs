export interface AcademicInfo {
  title: string;
  text: string;
  urlImg?: string;
  slugName?: string;
  createAt?: string;
  deleteAt?: string;
  public?: boolean;
  level?: string;
  order?: number;
}

export interface AcademicInfoDto {
  list: AcademicInfo[];
  total: number;
}

export interface AcademicInfoObj {
  [level: string]: AcademicInfo[];
}
