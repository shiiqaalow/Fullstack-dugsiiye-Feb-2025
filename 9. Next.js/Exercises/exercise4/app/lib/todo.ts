import { Document, Filter, ObjectId } from "mongodb";
import { CreateTodoInput, Priority, Todo, UpdateTodoInput } from "../types/todo";
import { getTodoCollection } from "./db";

export const fetchTodos = async (): Promise<Todo[]> => {
    try {     
        const collection = await getTodoCollection();
        const todos = await collection.find({}).sort({createdAt: - 1}).toArray();
        return todos.map((todo)=> ({
            _id: todo._id.toString(),
            title: todo.title,
            priority: todo.priority,
            completed: todo.completed,
            createdAt: todo.createdAt || new Date().toISOString(),
            updatedAt: todo.updatedAt || new Date().toISOString() 
        }))
    } catch (error) {
        console.log('Failed to fetch todos:', error);
        return [];
    }
}

export const fetchTodoById = async (id: string): Promise<Todo | null> => {
    try {
        const collection = await getTodoCollection();
        const todo = await collection.findOne({_id: new ObjectId(id)})

        if(!todo) return null

        return {
            _id: todo._id.toString(),
            title: todo.title,
            priority: todo.priority,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt
        }

    } catch (error) {
        console.log('Failed to fetch todo by id:', error);
        return null;
    }
}


export const createTodo = async (todo: CreateTodoInput): Promise<string | null> => {
    try {
        const collection = await getTodoCollection();
        const createTodo = await collection.insertOne(todo)
        return createTodo.insertedId.toString();
    } catch (error) {
        console.log('Failed to update todo by id:', error);
        return null;
    }
}

export const updateTodoById = async (id: string, todo: UpdateTodoInput): Promise<boolean> => {
    try {
        const collection = await getTodoCollection();
        const updateTodo = await collection.updateOne({_id: new ObjectId(id)},{$set: {...todo,updatedAt:new Date().toISOString()}})
        return updateTodo.modifiedCount > 0;
    } catch (error) {
        console.log('Failed to update todo by id:', error);
        return false;
    }
}

export const deleteTodoById = async (id: string): Promise<boolean> => {
    try {
        const collection = await getTodoCollection();
        const deleteTodo = await collection.deleteOne({_id: new ObjectId(id)})
        return deleteTodo.deletedCount > 0;
    } catch (error) {
        console.log('Failed to update todo by id:', error);
        return false;
    }
}

export const searchTodos = async ({query,status,priority} : {query: string,status: 'all' | 'completed' | 'incomplete', priority: Priority | ''}): Promise<Todo[]> => {
    try {
        const collection = await getTodoCollection()
        const filter: Filter<Document> = {}
        const searchQuery = query.trim().toLocaleLowerCase()

        if(searchQuery) {
            // filter.title = {
            //     $regex: searchQuery, $options: 'i'
            // }
            filter.$or = [
                {title :{ $regex: searchQuery, $options: 'i'}},
                {priority :{ $regex: searchQuery, $options: 'i'}},
            ]
        }

        if(status === 'completed') {
            filter.completed = true
        }else if(status === 'incomplete') {
            filter.completed = false
        }

        if(priority) {
            filter.priority = priority
        }

        const todos = await collection.find(filter).toArray()

        return todos.map((todo) => ({
            _id: todo._id.toString(),
            title: todo.title,
            priority: todo.priority,
            completed: todo.completed,
            createdAt: todo.createdAt || new Date().toISOString(),
            updatedAt: todo.updatedAt || new Date().toISOString(),
        }))

    } catch (error) {
        console.error('Failed to search todos:', error)
        return []
    }
}

export const deleteMultipleTodos = async (ids: string[]): Promise<boolean> => {
    try {       
        const collection = await getTodoCollection()
        const objectIds = ids.map((id) => new ObjectId(id) )
        const deleteTodos = await collection.deleteMany({_id: { $in: objectIds } })   
        return deleteTodos.deletedCount > 0 
    } catch (error) {
        console.log('Failed to update todos by ids:', error);
        return false;
    }
}

export const fetchTodoByIds = async (ids: string[]): Promise<Todo[]> => {
    try{
        const collection = await getTodoCollection()
        const objectIds = ids.map((id)=>new ObjectId(id))
        const todos = await collection.find({_id: {$in: objectIds} }).toArray()
        
        if(!todos) return []
        
        return todos.map((todo) => ({
            _id: todo._id.toString(),
            title: todo.title,
            priority: todo.priority,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt
        }))
    } catch (error) {
        console.log('Failed to fetch todos by ids:', error);
        return [];
    }
}

export const updateTodoByIds = async (ids: string[], todos: UpdateTodoInput): Promise<boolean> => {
    try {
        const collection = await getTodoCollection();
        const objectIds = ids.map((id)=>new ObjectId(id))
        const updateTodos = await collection.updateMany({_id: { $in: objectIds}},{$set: todos})
        return updateTodos.modifiedCount > 0;
    } catch (error) {
        console.log('Failed to update todo by id:', error);
        return false;
    }
}