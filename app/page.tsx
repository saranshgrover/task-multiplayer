export const dynamic = 'force-dynamic'


import TasksView from "@/ui/home/TasksView";
export default async function Page() {
    const tasks = await fetch('http://localhost:3000/api/tasks', {next: {revalidate: 0}})
    const data = await tasks.json()
    console.log(data)
    return (
        <TasksView tasks={data.tasks} />
    );
}