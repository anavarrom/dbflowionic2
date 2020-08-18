import { IChatMessage } from '../../data/interfaces/models';
import { Moment } from 'moment';

export class ChatMessage implements IChatMessage {
    constructor(
      public id?: number,
      public from?: string,
      public to?: string,
      public body?: string,
      public order?: number,
      public emittedDate?: Moment,
      public receivedDate?: Moment,
      public readDate?: Moment,
      public latitude?: number,
      public longitud?: number,
      public chatId?: number
    ) {}
  }
  