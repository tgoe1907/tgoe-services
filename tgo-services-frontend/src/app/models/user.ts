

export class User {
    id: number;
    membership_number?: number;
    first_name: string;
    last_name: string;
    birthdate: Date;
    email: string;
    date_joined?: Date;
    department_manager: Array<number>;
    admin: boolean;
    trainer_of: Array<number>;
    participate_at: Array<number>;
    constructor(id: number, first_name: string, last_name: string, birthdate: Date, 
        email: string, department_manager: Array<number>, admin: boolean, trainer_of: Array<number>, 
        participate_at: Array<number>, membership_number?: number, date_joined?: Date ) {
        this.id = id;
        this.membership_number = membership_number;
        this.first_name = first_name;
        this.last_name = last_name;
        this.birthdate = birthdate;
        this.date_joined = date_joined;
        this.email = email;
        this.department_manager = department_manager;
        this.admin = admin;
        this.trainer_of = trainer_of;
        this.participate_at = participate_at;
    }

    static fromJson(json: Record<string, any>) {
        return new User(json['id'], json['first_name'], json['last_name'], json['birthdate'], json['email'], 
            json['department_manager'], json['admin'], json['trainer_of'], json['participate_at']
        );
    }

}