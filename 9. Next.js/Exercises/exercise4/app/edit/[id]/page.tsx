import Link from 'next/link'
import { fetchTodoById } from '@/app/lib/todo'
import EditButton from '@/app/components/EditButton'

const EditTodo = async ({ params }: { params: { id: string } }) => {



    const { id } = await params
    const todo = await fetchTodoById(id)

    if (!todo) {
        return <p className="text-center mt-10 text-gray-500">Todo not found</p>
    }

    return (
        <main className="max-w-2xl mx-auto mt-10 p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Add New Todo</h1>
                    <Link
                        href="/"
                        className="text-rose-600 hover:text-rose-800 transition-colors"
                    >
                        ← Back to Todos
                    </Link>
                </div>
                <EditButton 
                    todo={todo}
                />
            </div>
        </main>
    )
}

export default EditTodo