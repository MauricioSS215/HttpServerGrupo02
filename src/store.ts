import { User } from "./types";

export class UserStore {
  private users: User[] = [
    { id: 1, nombre: "Yoni", email: "yoni@gmail.com" },
    { id: 2, nombre: "Walker", email: "walker@gmail.com" }
  ];

  getUsers(): User[] {
    return this.users;
  }
}
