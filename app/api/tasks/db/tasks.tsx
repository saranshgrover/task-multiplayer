import { Task } from "@/app/types/task";

export const tasks: Task[] = [
    {
      id: 'task-1',
      title: 'Complete project proposal',
      description: 'Draft and submit the Q2 project proposal for review',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-04-15T00:00:00.000Z',
      createdAt: '2024-03-01T00:00:00.000Z',
      assignedTo: 'john.doe@example.com',
    },
    {
      id: 'task-2',
      title: 'Update documentation',
      description: 'Review and update API documentation',
      priority: 'medium',
      status: 'todo',
      dueDate: '2024-04-10T00:00:00.000Z',
      createdAt: '2024-03-05T00:00:00.000Z',
      assignedTo: 'jane.smith@example.com',
    },
  ]
  