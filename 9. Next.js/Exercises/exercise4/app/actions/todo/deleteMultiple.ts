"use server"

import { revalidatePath } from "next/cache"
import { deleteMultipleTodos } from "@/app/lib/todo"

export type DeleteState = { error: string | null }

export const deleteMultipleTodoActions = async (
  ids: string[],
  _prevState: DeleteState,
  _formData: FormData
): Promise<DeleteState> => {
  const success = await deleteMultipleTodos(ids)
  if (!success) return { error: "Failed to delete todos" }

  revalidatePath("/")
  return { error: null }
}