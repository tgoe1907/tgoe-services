

export interface User {
    id?: number,
    membership_number?: number,
    first_name: string,
    last_name: string,
    birthdate: Date,
    email: string,
    date_joined?: Date,
}