'use client'
import Link from 'next/link'
import { updateTodoAction } from '@/app/actions/todo/update'
import { useActionState } from 'react'
import { ArrowRight, Loader } from 'lucide-react'
import { timeAgo } from '../lib/timeAgo'

const initialState = {
    error: ''
}

const EditButton = ({ todo }: { todo: { _id: string, title: string, createdAt: string, updatedAt: string } }) => {

    const [state, formAction, isPending] = useActionState(updateTodoAction, initialState)

     const wasUpdated = todo.updatedAt !== todo.createdAt

    return (


        <form action={formAction} className='mt-7'>
            <input type="hidden" name="id" value={todo?._id} />
            <div>
                <div className="flex justify-between items-center mb-3">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Todo Title
                    </label>
                    <p className="text-xs text-gray-500" suppressHydrationWarning>                        {wasUpdated && ` Updated ${timeAgo(todo.updatedAt)}`}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={todo?.title}
                        placeholder="Enter your todo..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        // required
                        maxLength={200}
                        autoFocus
                    />
                    <select
                        name="priority"
                        id="priority"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>


            </div>
            {state.error && (
                <p className="text-sm text-red-600 mt-2" role="alert">
                    {state.error}
                </p>
            )}
            <p className="text-xs text-gray-500 mt-1">Maximum 200 characters</p>

            <div className="flex gap-3 mt-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <div className="w-full flex items-center justify-center gap-3 cursor-pointer">
                            <Loader className='animate-spin' size={20} />
                            Updating Todo..
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-center gap-3 cursor-pointer">
                            Update Todo
                            <ArrowRight size={20} />
                        </div>
                    )}
                </button>

                <Link
                    href="/"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                    Cancel
                </Link>
            </div>
        </form>

    )
}

export default EditButton