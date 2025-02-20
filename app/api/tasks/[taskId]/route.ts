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

export async function PUT(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const task = tasks.find((task: Task) => task.id === params.taskId);
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  const body = await request.json()
  const updatedTask: Task = {
    ...task,
    ...body,
    id: params.taskId,
    updatedAt: new Date().toISOString(),
  }
  
  mockTasks[params.taskId] = updatedTask
  return NextResponse.json(updatedTask)
}

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const task = mockTasks[params.taskId]
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  delete mockTasks[params.taskId]
  return NextResponse.json({ deleted: params.taskId })
} 