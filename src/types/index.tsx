export interface User {
  name: string;
  email: string;
  avatar: string;
  age: number;
  gender: Gender;
  country: string;
  terms: boolean;
  password: string;
}

export enum Gender {
  M = 'Male',
  F = 'Female',
}
