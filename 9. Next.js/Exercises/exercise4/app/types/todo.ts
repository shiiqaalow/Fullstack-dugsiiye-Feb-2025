export type Priority = 'low' | 'medium' | 'high'

export type Todo = {
    _id: string;
    title: string;
    priority: Priority
    completed: boolean;
    createdAt: string;
    updatedAt?: string;
}

export type CreateTodoInput = {
    title: string;
    priority: Priority;
    completed?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export type UpdateTodoInput = {
    title?: string;
    priority?: Priority;
    completed?: boolean;
}

