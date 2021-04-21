export class User {
    _id: String;
    username: String;
    email: String;
    password: String;
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}