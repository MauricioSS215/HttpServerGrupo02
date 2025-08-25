import { User } from "./types";

export class UserStore {
  private users: User[] = [
    { id: 1, nombre: "Yoni", email: "yoni@gmail.com" },
    { id: 2, nombre: "Walker", email: "walker@gmail.com" }
  ];
  private currentMaxId: number = 2;

  getUsers(): User[] {
    return this.users;
  }
  
  addUser(user: Omit<User, "id">): User {
    const newUser: User = {
      id: ++this.currentMaxId,
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, user: Partial<Omit<User, "id">>): User | undefined {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    this.users[idx] = { ...this.users[idx], ...user };
    return this.users[idx];
  }

  deleteUser(id: number): User | undefined {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    const [deletedUser] = this.users.splice(idx, 1);
    if (!deletedUser) return undefined;
    if (id === this.currentMaxId) {
      this.currentMaxId = this.users.length
        ? Math.max(...this.users.map(u => u.id))
        : 0;
    }
    return deletedUser;
  }
}
