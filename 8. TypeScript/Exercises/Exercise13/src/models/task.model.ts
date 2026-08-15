import mongoose, { Schema } from "mongoose"
export enum TaskStatus {
    Pending = 'pending',
    InProgress = 'in-progress',
    Done = 'done'
}
export interface ITask extends Document {
    title: string,
    status: TaskStatus,
    content: string,
    author: mongoose.Types.ObjectId,
    createdAt: string,
    updatedAt: string
}

const taskSchema = new Schema<ITask> ({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.Pending
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{timestamps: true})

export const TaskModel = mongoose.model<ITask>('Task',taskSchema)