export interface PackageInfo {
  description: string;
  author: string;
}

export interface CustomizedInfo extends PackageInfo {
  name: string;
  repository: { type: string; url: string };
}
