export const dynamic = "force-dynamic";

import { faker } from "@faker-js/faker";
import { Task } from "@/app/types/task";
import { NextResponse } from "next/server";
import { tasks } from "./db/tasks";

export async function GET() {
  const tasksWithViewers = tasks.map((task) => ({
    ...task,
  }));
  return NextResponse.json({
    tasks: tasksWithViewers,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTask: Task = {
    ...body,
    id: faker.string.uuid(),
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json(newTask);
}
