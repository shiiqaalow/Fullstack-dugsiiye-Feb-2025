'use server'

import { fetchTodoById,updateTodoById } from "@/app/lib/todo"
import { revalidatePath } from "next/cache"

type TodoActionState = {
    error: string
}

export const toggleTodoAction = async (id: string): Promise< TodoActionState > => {
    const todo = await fetchTodoById(id)
    if(!todo) {
        return {
            error:'todo not found'
        };
    }
    const success = await updateTodoById(id,{completed: !todo.completed})
    if(!success) {
        return {
            error:'failed to update todo'
        };
    }
    revalidatePath('/')
    return {
        error: ''
    }
}