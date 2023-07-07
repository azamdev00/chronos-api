export interface User {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  region: string | null;
  province: string | null;
}

export interface DbUser extends User {
  id: number;
}
