/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Task } from '@/app/types/task'
import { tasks  } from '@/app/api/tasks/db/tasks'

export async function GET(
  request: Request,
  { params }: any 
) {
  const task = tasks.find((task: Task) => task.id === params.taskId);
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }
  return NextResponse.json(task)
}
