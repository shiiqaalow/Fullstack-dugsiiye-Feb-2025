"use server"
import { fetchTodoById, updateTodoById } from "@/app/lib/todo"
import { Priority } from "@/app/types/todo"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type TodoActionState = {
    error: string
}
export const updateTodoAction = async (prevData: TodoActionState,formData: FormData): Promise< TodoActionState > => {
        
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const priority = formData.get('priority') as Priority
    if( !id || !title || title.trim().length === 0 || !priority )  return {
        error: 'Title is required'
    }
    const existingTodo = await fetchTodoById(id)
    if(!existingTodo) return {
        error: 'Todo not found'
    }
    const success = await updateTodoById(id,{title: title.trim(),priority,})
    if(!success) return {
        error: 'Failed to update todo'
    }
    
        revalidatePath('/')
        redirect('/')
    
}