"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
class UserStore {
    constructor() {
        this.users = [
            { id: 1, nombre: "Yoni", email: "yoni@gmail.com" },
            { id: 2, nombre: "Walker", email: "walker@gmail.com" }
        ];
    }
    getUsers() {
        return this.users;
    }
}
exports.UserStore = UserStore;
