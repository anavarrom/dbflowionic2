export class LoadAppointments {
    static readonly type = '[Appointment] Load';
    constructor() {}
}

export class SelectAppointment {
    static readonly type = '[Appointment] Select';
    constructor(public id: number) {}
}