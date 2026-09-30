'use client'
import { CheckCheck, RotateCcw } from 'lucide-react'
import React, { useActionState, useState } from 'react'
import { multipleToggleActions } from '../actions/todo/multipleToggle'
import { Todo } from '../types/todo'

const initialState = {
  error: ''
}

type Props = {
  ids: string[],
  todos: Todo[]
}


const MarkAsCompleted = ({ids,todos}: Props) => {
  const boundAction = multipleToggleActions.bind(null, ids)

  const [state,formAction] = useActionState(boundAction,initialState)
  const isCompleted = todos.every((todo)=>todo.completed)

  const Icon = isCompleted ? RotateCcw :  CheckCheck

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={ids.length === 0} 
        className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <Icon size={14} />
        {isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
      </button>
      {state.error && <p className="text-xs text-red-500 mt-1">{state.error}</p>}
    </form>
  )
}

export default MarkAsCompleted