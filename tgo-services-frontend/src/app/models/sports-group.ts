import { Department } from "./department";

export class SportsGroup{
    constructor(
        public id: number, 
        public name: string,
        public department: Department
    ) {
        
    }
} 