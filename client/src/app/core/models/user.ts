export interface User {
    _id?: string
    user_id?: string
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    date?: string | Date
    roomId?: { [key: string]: string }
}
