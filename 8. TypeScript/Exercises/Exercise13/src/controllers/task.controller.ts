import { Request,Response } from "express";
import { TaskType } from "../types/task";
import { TaskModel } from "../models/task.model";


interface TaskInput extends Omit<TaskType,'id'> {}

export const createTask = async (req: Request<{},{},TaskType>, res: Response) => {

    try {
        const taskTitle = req.body.title
        const taskAuthor = req.body.author
        const { title,content,status,author } = req.body
        const existingTask = await TaskModel.findOne({title: taskTitle, author: taskAuthor})

        if(existingTask) {
            return res.json({
                success: false,
                status: 400,
                message: 'Task already exists',
            })
        }

        const task = await TaskModel.create({title,content,status,author})

        if(!task) {
            return res.json({
                success: false,
                status: 400,
                message: 'Task not found',
            })
        }

        return res.json({
            success: true,
            status: 200,
            message: 'Task successfully created',
            task
        })

        
    } catch (error) {
        return res.json({
            success: false,
            status: 500,
            message: 'Something went wrong',
            error: error instanceof Error ? error.message : String(error)
        })
    }
}