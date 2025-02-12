import { Department } from "./department";

export class SportsGroup{
    id: number;
    name: string;
    department: number;
    constructor(
        id: number, 
        name: string,
        department: number
    ) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    static fromJson(json: Record<string, any>) {
        return new SportsGroup(json['id'], json['name'], json['department']);
    }
} 