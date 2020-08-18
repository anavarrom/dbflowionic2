export class LoadNotifications {
    static readonly type = '[Notification] Load';
    constructor() {}
}

export class SelectNotification {
    static readonly type = '[Notification] Select';
    constructor(public id: number) {}
}