// app/components/DeleteTodoButton.tsx
'use client'
import { useActionState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteTodoAction } from '@/app/actions/todo/delete'

const initialState = { error: '' }

export default function DeleteTodoButton({ id }: { id: string }) {
    const boundAction = deleteTodoAction.bind(null, id)
    const [state, formAction, isPending] = useActionState(boundAction, initialState)

    return (
        <form action={formAction}>
            <button
                type="submit"
                disabled={isPending}
                className="text-white hover:text-red-800 flex justify-center items-center w-6 h-6 bg-red-600 rounded-md cursor-pointer disabled:opacity-50"
                title="Delete todo"
            >
                <Trash2 size={18} />
            </button>
            {state.error && (
                <p className="text-xs text-red-600 mt-1" role="alert">{state.error}</p>
            )}
        </form>
    )
}