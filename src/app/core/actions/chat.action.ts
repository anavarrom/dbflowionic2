import { ChatMessage } from '../models/message';
import { Chat } from '../models/chat';
import { DbFlowError } from '../models/error';
import { IAppointment } from 'src/app/data/interfaces/models';

export interface IDbFlowAction {

}

export interface IDbFlowFailureAction {
    error?: DbFlowError;
}


export class LoadChats {
    static readonly type = '[Chat] Load';
    constructor() {}
}

export class SelectChat {
    static readonly type = '[Chat] Select';
    constructor(public id: number) {}
}

export class NewMessage {
    static type = '[Chat] New message';
    constructor(public message: ChatMessage) {}
  }

export class GoToChatFromAppointmentAttempt {
    static type = '[Chat] Go to chat';
    constructor(public selectedAppointment: IAppointment) {}
}

export class GoToChatFromAppointmentSucces {
    static type = '[Chat] Go to chat Success';
    constructor(public chat: Chat) {}
}

export class GoToChatFromAppointmentFailure implements IDbFlowFailureAction {
    static type = '[Chat] Go to chat Failure';
    constructor(public error: DbFlowError) {}
}


// Internal actions
export class FoundChatToGoToChatFromAppointment implements IDbFlowAction {
    static type = '[Chat] XXXXXXXe';
    constructor(public selectedAppointment: IAppointment) {}
}
