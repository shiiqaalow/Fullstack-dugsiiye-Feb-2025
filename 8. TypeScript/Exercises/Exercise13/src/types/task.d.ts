import mongoose from "mongoose";
import { TaskStatus } from "../models/task.model";

export interface TaskType {
    id: string,
    title: string,
    content: string
    status: TaskStatus ,
    author: mongoose.Types.ObjectId
}