'use server'
import { Priority, Todo } from "../../types/todo"
import { searchTodos } from "../../lib/todo"


export const searchTodoAction = async (query: string, status: 'all' | 'completed' | 'incomplete', priority: Priority | ''): Promise<Todo[]> => {
    return searchTodos({query, status, priority})
}