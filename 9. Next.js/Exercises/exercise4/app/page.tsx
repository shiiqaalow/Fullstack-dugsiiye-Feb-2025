import Link from "next/link";
import { fetchTodos } from "./lib/todo";
import TodoFilter from "./components/TodoFilter";

export default async function Home() {
  const todos = await fetchTodos();
  const lastUpdated = todos.length
    ? new Date(
      Math.max(...todos.map((todo) => new Date(todo.createdAt).getTime()))
    ).toLocaleString()
    : null;

  return (
    <main className="max-w-2xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
          <span className="text-sm text-gray-500">
            {todos.length} {todos.length === 1 ? "item" : "items"}
          </span>
        </div>
        <div className="flex flex-col gap-3 mb-5">
          <p className="text-xs">Last updated {lastUpdated}</p>
          <Link href={'/new'}
            className=" w-50 bg-rose-600 text-white text-center px-4 py-2 rounded text-sm hover:bg-rose-700"
            title='Add new todo'
          >
            + Add
          </Link>
        </div>
       <TodoFilter todos ={todos}/>
      </div>
    </main>
  );
}