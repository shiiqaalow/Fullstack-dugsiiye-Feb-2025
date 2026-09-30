// app/components/ToggleTodoButton.tsx
'use client'
import { useActionState } from 'react'
import { toggleTodoAction } from '@/app/actions/todo/toggle'

const initialState = { error: '' }

export default function ToggleTodoButton({ id, completed }: { id: string; completed: boolean }) {
    const boundAction = toggleTodoAction.bind(null, id)
    const [state, formAction, isPending] = useActionState(boundAction, initialState)

    return (
        <form action={formAction}>
            <button
                type="submit"
                disabled={isPending}
                className="cursor-pointer disabled:opacity-50"
                title={completed ? 'Mark as incomplete' : 'Mark as completed'}
            >
                {completed ? '✅' : '⬜'}
            </button>
            {state.error && (
                <p className="text-xs text-red-600 mt-1" role="alert">{state.error}</p>
            )}
        </form>
    )
}