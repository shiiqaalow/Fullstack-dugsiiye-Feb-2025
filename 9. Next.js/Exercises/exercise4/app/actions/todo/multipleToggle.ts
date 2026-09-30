'use server'
import { fetchTodoByIds, updateTodoByIds } from "@/app/lib/todo"
import { revalidatePath } from "next/cache"

type multipleToggleStatus = {
    error: string
}
export const multipleToggleActions = async (ids: string[]): Promise<multipleToggleStatus> => {
    const todos = await fetchTodoByIds(ids)
    if(!todos) {
        return {
            error: 'todos not found'
        }
    }
    const isCompleted = todos.every((todo)=>todo.completed)
    const success = await updateTodoByIds(ids,{completed: !isCompleted})

    if(!success) {
        return {
            error: 'Failed to update todos'
        }
    }
    revalidatePath('/')
    return {
        error: ''
    }
}