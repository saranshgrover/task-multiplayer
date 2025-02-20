/* eslint-disable @typescript-eslint/no-explicit-any */
import TaskLanding from '@/ui/task/TaskLanding';
import React from 'react'

type Props = {
  params: any
}

export default async function Page({ params }: Props) {
    const { taskId } = await params;
    const task = await fetch(`https://task-multiplayer.vercel.app/api/tasks/${taskId}`);
    const taskData = await task.json();
  return (
    <TaskLanding task={taskData} />
  )
}