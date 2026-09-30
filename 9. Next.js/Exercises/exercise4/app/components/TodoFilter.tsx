'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Pencil, Search } from 'lucide-react'
import type { Priority, Todo } from '../types/todo'
import DeleteTodoButton from './DeleteButton'
import ToggleTodoButton from './ToggleButton'
import { searchTodoAction } from '../actions/todo/search'
import DeleteMultipleButton from './DeleteMultipleButton'
import MarkAsCompleted from './MarkAsCompleted'
import { timeAgo } from '../lib/timeAgo'

const TodoFilter = ({ todos }: { todos: Todo[] }) => {
  const [selected, setSelected] = useState<Priority | ''>('')
  const [searchTerm, setSearchTerm] = useState<string | ''>('')
  const [status, setStatus] = useState<'all' | 'completed' | 'incomplete'>('all')
  const [result, setResult] = useState<Todo[] | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isFiltering = searchTerm !== '' || selected !== '' || status !== 'all'

  useEffect(() => {
    if (!isFiltering) {
      setResult(null)
      return
    }

    let isAlreadyFetched = false

    const fetch = async () => {
      setIsLoading(true)
      const data = await searchTodoAction(searchTerm, status, selected)
      if (!isAlreadyFetched) {
        setResult(data)
        setIsLoading(false)
      }
    }

    const timer = setTimeout(fetch, 300)

    return () => {
      isAlreadyFetched = true
      clearTimeout(timer)
    }
  }, [searchTerm, status, selected, isFiltering])

  const filteredTodos = result ?? todos

  const allSelected = filteredTodos.length > 0 && selectedIds.length === filteredTodos.length

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : filteredTodos.map((t) => t._id))
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-full relative flex items-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Title or Priority..."
            className="flex-1 pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-3">
            <Search size={20} className="text-gray-400" />
          </span>
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'all' | 'incomplete' | 'completed')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
        >
          <option value="all">Status</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value as Priority | '')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex items-center justify-between mb-4 px-1">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleSelectAll}
            className="w-4 h-4 rounded border-gray-300 cursor-pointer"
          />
          {selectedIds.length > 0 ? `${selectedIds.length} selected` : 'Select all'}
        </label>

        <div className="flex items-center gap-2">
          <MarkAsCompleted ids={selectedIds} todos={filteredTodos} />
          <DeleteMultipleButton ids={selectedIds} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500">No todos found</p>
        ) : (
          filteredTodos.map((todo) => (

            <div key={todo._id} className="flex items-center justify-between gap-3 border-b pb-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(todo._id)}
                  onChange={() => toggleSelectOne(todo._id)}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <ToggleTodoButton id={todo._id} completed={todo.completed} />
                <span className={todo.completed ? "line-through text-gray-400" : ""}>
                  {todo.title}
                </span>
                <span className={`text-xs ${todo.priority === 'low' ? 'bg-red-200 px-3 rounded-md font-semibold text-red-500' : todo.priority === 'medium' ? 'bg-orange-200 px-3 rounded-md font-semibold text-orange-500' : 'bg-green-200 px-3 rounded-md font-semibold text-green-600'}`}>
                  {todo.priority}
                </span>
              </div>
              <p className="text-xs text-gray-500" suppressHydrationWarning>
                Created {timeAgo(todo.createdAt)}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={`/edit/${todo._id}`}
                  className="text-white bg-green-500 hover:bg-green-400 w-6 h-6 flex justify-center items-center rounded-md hover:text-green-800"
                  title="Edit todo"
                >
                  <Pencil size={18} />
                </Link>
                <DeleteTodoButton id={todo._id} />
              </div>
            </div>
          )

          ))
        }
      </div>
    </>
  )
}

export default TodoFilter