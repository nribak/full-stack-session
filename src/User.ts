export default class User {
    constructor(public id: string, public username: string, public password: string) {
    }
}

export const usersRepo: User[] = [];