import { SportsGroup } from "./sports-group";

export class TrainHour {
    constructor(
        public id: number,
        public group: SportsGroup,
        public date: Date,
        public start: string,
        public end: string,
    ) {}
}