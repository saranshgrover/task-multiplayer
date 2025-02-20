"use client";

import React, { useState } from "react";
import {
  VStack,
  Heading,
  Input,
  Button,
  HStack,
  Box,
  useToast,
} from "@chakra-ui/react";
import Task from "./Task";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TasksView({ tasks: allTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const toast = useToast();

  const addTask = () => {
    if (!newTaskTitle.trim()) {
      toast({
        title: "Please enter a task title",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Tasks</Heading>

        <HStack>
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task"
            onKeyPress={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />
          <Button onClick={addTask} colorScheme="blue">
            Add
          </Button>
        </HStack>

        <VStack align="stretch" spacing={2}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
