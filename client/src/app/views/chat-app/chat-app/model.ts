export enum STATUSES {
    AWAY = "away",
    BUSY = "busy",
    ONLINE = "online",
    OFFLINE = "offline"
}

export interface Message {
    type?: string
    message?: string
}

export interface User {
    ws?: WebSocket | null
    id?: number
    name?: string
    status?: STATUSES
    img?: string
    messages?: Message[]
}