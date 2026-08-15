// this is only for frontend userData (for safety) interface
export interface User extends Omit<IUser, 'password'> {
    id: string;
}

// this is for registration/updating interface
export interface RegisterUserInput {
    name: string,
    email: string,
    password: string,
    phone: string
}

// this is for login interface
export interface LoginUserInput {
    email: string;
    password: string;
}