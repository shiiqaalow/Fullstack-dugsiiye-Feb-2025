'use client'
import { useActionState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteMultipleTodoActions, type DeleteState } from '../actions/todo/deleteMultiple'

const initialState: DeleteState = { error: null }

const DeleteMultipleButton = ({ ids }: { ids: string[] }) => {
  const boundAction = deleteMultipleTodoActions.bind(null, ids)
  const [state, formAction, isPending] = useActionState(boundAction, initialState)

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={ids.length === 0 || isPending}
        className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <Trash2 size={14} />
        Delete selected
      </button>
      {state.error && <p className="text-xs text-red-500 mt-1">{state.error}</p>}
    </form>
  )
}

export default DeleteMultipleButton