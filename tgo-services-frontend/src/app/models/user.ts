

export class User {
    id: number;
    membership_number?: number;
    first_name: string;
    last_name: string;
    birthdate: Date;
    email: string;
    date_joined?: Date;
    constructor(id: number, first_name: string, last_name: string, birthdate: Date, 
        email: string, membership_number?: number, date_joined?: Date) {
        this.id = id;
        this.membership_number = membership_number;
        this.first_name = first_name;
        this.last_name = last_name;
        this.birthdate = birthdate;
        this.date_joined = date_joined;
        this.email = email;
    }

    static fromJson(json: Record<string, any>) {
        return new User(json['id'], json['first_name'], json['last_name'], json['birthdate'], json['email']);
    }

}