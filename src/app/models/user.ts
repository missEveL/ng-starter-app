export class User {
    _id: String;
    username: String;
    email: String;
    password: String;
    constructor(username: string, password: string, email?: string) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}