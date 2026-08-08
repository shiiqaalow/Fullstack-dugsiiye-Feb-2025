import React, { useEffect, useState } from "react"
import "./index.css"

interface User {
  username: string
  email: string
}

interface Todo {
  id: number
  task: string
  done: boolean
}

function App() {
  const [count, setCount] = useState<number>(0)
  const [user, setUser] = useState<User>({ username: '', email: '' })
  const [userData, setUserData] = useState<User>({ username: '', email: '' })
  const [todo, setTodo] = useState<Todo[]>([])

  useEffect(() => {
    setTodo([{
      id: 1,
      task: 'task1',
      done: true
    }])
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user.username.trim() === '') {
      alert('Username is required..')
      return
    }
    if (user.email.trim() === '') {
      alert('Email is required..')
      return
    }
    setUserData(user)
  }

  const handleAddNewTodo = () => {
    const newId = todo.length > 0
      ? Math.max(...todo.map(t => t.id)) + 1
      : 1

    const newTodo: Todo = {
      id: newId,
      task: `task ${newId}`,
      done: false
    }

    setTodo(prev => [...prev, newTodo])
  }


  return (
    <div className="app">
      {/* Count */}
      <section className="card">
        <h2 className="card-title">Counter</h2>
        <div className="counter">
          <button className="btn btn-secondary" onClick={() => {
            if (count >= 1) setCount(count - 1)
          }}>
            −
          </button>
          <span className="counter-value">{count}</span>
          <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
            +
          </button>
        </div>
      </section>

      {/* User */}
      <section className="card">
        <h2 className="card-title">User Info</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            className="input"
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <button className="btn btn-primary" type="submit">
            Set Username and Email
          </button>
        </form>

        {(userData.username || userData.email) && (
          <div className="user-display">
            {userData.username && <p><strong>Username:</strong> {userData.username}</p>}
            {userData.email && <p><strong>Email:</strong> {userData.email}</p>}
          </div>
        )}
      </section>

      {/* Todo List */}
      <section className="card">
        <h2 className="card-title">Todo List</h2>
        <button className="btn btn-primary" onClick={handleAddNewTodo}>
          Add New Task
        </button>

        <div className="todo-list">
          {todo.length === 0 && <p className="empty-state">No tasks yet.</p>}
          {todo.map(t => (
            <div key={t.id} className={`todo-item ${t.done ? 'todo-done' : ''}`}>
              <div className="todo-info">
                <span className="todo-id">#{t.id}</span>
                <span className="todo-task">{t.task}</span>
                <span className={`todo-status ${t.done ? 'status-done' : 'status-pending'}`}>
                  {t.done ? 'Done' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App