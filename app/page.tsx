export const dynamic = 'force-dynamic'


import TasksView from "@/ui/home/TasksView";
export default async function Page() {
    const tasks = await fetch('https://task-multiplayer.vercel.app/api/tasks', {next: {revalidate: 0}})
    const data = await tasks.json()
    console.log(data)
    return (
        <TasksView tasks={data.tasks} />
    );
}