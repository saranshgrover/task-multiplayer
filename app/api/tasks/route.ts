export const dynamic = 'force-dynamic'

import { faker } from '@faker-js/faker'
import { Task } from '@/app/types/task'
import { NextResponse } from 'next/server'
import { tasks } from './db/tasks'
import { taskViewers } from '../telemetry/route'

export async function GET() {
    console.log(taskViewers)
    const tasksWithViewers = tasks.map(task => ({
        ...task,
        viewers: taskViewers[task.id] || []
    }))
  return NextResponse.json({
    tasks: tasksWithViewers
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const newTask: Task = {
    ...body,
    id: faker.string.uuid(),
    createdAt: new Date().toISOString(),
  }
  return NextResponse.json(newTask)
} 