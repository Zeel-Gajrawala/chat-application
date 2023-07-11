export interface User {
    _id?: string
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    date?: string | Date
    messages?: { type: string, message: string }[]
}
