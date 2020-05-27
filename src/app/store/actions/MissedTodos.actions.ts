export const load = '[todos Component] load'
export const success = '[todos Component] success'
export const failed = '[todos Component] failed'

export class LoadTodosAction {
    type: string = load
}

export class SuccessAction {
    type: string = success
    payload: any

    constructor(payload: any) {
        this.payload = payload
    }
}

export class FailedAction {
    type: string = failed
    payload: any

    constructor(payload: any) {
        this.payload = payload
    }
}