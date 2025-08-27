import { User } from "./types";

/**
 * A store class for managing a collection of users in memory.
 * Provides methods to get, add, update, and delete users.
 */
export class UserStore {
  /**
   * An array to hold the user data.
   */
  private users: User[] = [
    { id: 1, nombre: "Yoni", email: "yoni@gmail.com" },
    { id: 2, nombre: "Walker", email: "walker@gmail.com" }
  ];
  private currentMaxId: number = 2;
  /**
   * Get all users.
   * @returns An array of users.
   */
  getUsers(): User[] {
    return this.users;
  }
  /**
   * Add a new user.
   * @param user - The user data to add.
   * @returns The newly created user.
   */
  addUser(user: Omit<User, "id">): User {
    const newUser: User = {
      id: ++this.currentMaxId,
      ...user
    };
    this.users.push(newUser);
    return newUser;
  }
  /**
   * Update an existing user.
   * @param id - The ID of the user to update.
   * @param user - The updated user data.
   * @returns The updated user or undefined if not found.
   */
  updateUser(id: number, user: Partial<Omit<User, "id">>): User | undefined {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    this.users[idx] = { ...this.users[idx], ...user };
    return this.users[idx];
  }
  /**
   * Delete a user.
   * @param id - The ID of the user to delete.
   * @returns The deleted user or undefined if not found.
   */
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
