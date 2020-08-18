import { Moment } from 'moment';
import { ISafeKeepingProject } from 'src/app/data/interfaces/models';

export class SafeKeepingProject implements ISafeKeepingProject{
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public parent1?: string,
        public parent2?: string,
        public mediator?: string,
        public start?: Moment,
    ) {
    }
}
