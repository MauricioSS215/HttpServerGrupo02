"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
class UserStore {
    constructor() {
        this.users = [
            { id: 1, nombre: "Yoni", email: "yoni@gmail.com" },
            { id: 2, nombre: "Walker", email: "walker@gmail.com" }
        ];
        this.currentMaxId = 2;
    }
    getUsers() {
        return this.users;
    }
    addUser(user) {
        const newUser = {
            id: ++this.currentMaxId,
            ...user
        };
        this.users.push(newUser);
        return newUser;
    }
    updateUser(id, user) {
        const idx = this.users.findIndex(u => u.id === id);
        if (idx === -1)
            return undefined;
        this.users[idx] = { ...this.users[idx], ...user };
        return this.users[idx];
    }
    deleteUser(id) {
        const idx = this.users.findIndex(u => u.id === id);
        if (idx === -1)
            return undefined;
        const [deletedUser] = this.users.splice(idx, 1);
        if (!deletedUser)
            return undefined;
        // Optionally update currentMaxId if the deleted user had the max id
        if (id === this.currentMaxId) {
            this.currentMaxId = this.users.length
                ? Math.max(...this.users.map(u => u.id))
                : 0;
        }
        return deletedUser;
    }
}
exports.UserStore = UserStore;
