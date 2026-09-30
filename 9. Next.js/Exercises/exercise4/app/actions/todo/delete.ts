'use server'

import { deleteTodoById } from "@/app/lib/todo"
import { revalidatePath } from "next/cache"

type TodoActionState = {
    error: string
}

export const deleteTodoAction = async (id: string): Promise< TodoActionState > => {
    if(!id) return {
        error: 'Todo not found'
    }
    const success = await deleteTodoById(id)
    if(!success) return {
        error: 'Failed to delete todo'
    }
    revalidatePath('/')
    return {
        error: ''
    }
}