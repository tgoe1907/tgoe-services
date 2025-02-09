import { SportsGroup } from "./sports-group";
import { User } from "./user";

export interface TrainHourInterface {
    id: number,
    date: Date,
    start_time: string,
    end_time: string,
    place: string,
    group: number,
    trained_by: number,
    participants?: number[]
}

export class TrainHour implements TrainHourInterface{
    constructor(
        public id: number,
        public date: Date,
        public start_time: string,
        public end_time: string,
        public place: string,
        public group: number,
        public trained_by: number,
        public participants?: number[]
    ) {}

    static fromJson(json: Record<string, any>) {
        return new TrainHour(json['id'], 
            json['date'], 
            json['start_time'], 
            json['end_time'], 
            json['place'],
            json['group'],
            json['trained_by'],
            json['participants']);
    }
}