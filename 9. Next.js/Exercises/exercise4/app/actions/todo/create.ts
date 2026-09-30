'use server'
import { createTodo, fetchTodos } from "@/app/lib/todo"
import { Priority } from "@/app/types/todo"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type TodoActionState = {
    error: string
}

export const createTodoAction = async (
    prevState: TodoActionState,
    formData: FormData
): Promise<TodoActionState> => {

    const priorities: Priority[] = ['low','medium','high'] 

    const title = formData.get('title') as string
    const priority = formData.get('priority') as Priority 

    if (!title || title.trim().length === 0) {
        return { error: 'Title is required' }
    }

    if (!priority || !priorities.includes(priority)  ) {
        return { error: 'Invalid Priority' }
    }

    const todoId = await createTodo({
        title: title.trim(),
        priority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    })

    if (!todoId) {
        return { error: 'Failed to create todo' }
    }

    revalidatePath('/')
    redirect('/')
}