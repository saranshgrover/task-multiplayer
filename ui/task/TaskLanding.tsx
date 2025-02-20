"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  VStack,
  Avatar,
  AvatarGroup,
  Flex,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

type Props = {
  task: {
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate?: string;
    assignee?: string;
    id: string;
  };
};

export default function TaskLanding({ task }: Props) {
  const searchParams = useSearchParams();
  const user = searchParams?.get("user");
  const [usersViewing, setUsersViewing] = useState<string[]>([]);

  useEffect(() => {
    // Function to fetch viewers
    const fetchViewers = () => {
      fetch(`http://localhost:3000/api/telemetry`, {
        method: "POST",
        body: JSON.stringify({
          user,
          taskId: task.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUsersViewing(data.viewers);
        })
        .catch((error) => console.error("Error fetching viewers:", error));
    };

    // Initial fetch
    fetchViewers();

    // Set up polling interval (every 1 seconds)
    const intervalId = setInterval(fetchViewers, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user, task.id]);

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      shadow="sm"
      position="relative"
    >
      <Flex justify="space-between" align="flex-start">
        <VStack align="stretch" spacing={4} flex="1">
          <Heading size="md">{task.title}</Heading>

          <Stack direction="row" spacing={2}>
            <Badge colorScheme={task.status === "Completed" ? "green" : "blue"}>
              {task.status}
            </Badge>
            <Badge colorScheme={task.priority === "High" ? "red" : "orange"}>
              {task.priority}
            </Badge>
          </Stack>

          <Text>{task.description}</Text>

          {task.dueDate && (
            <Text fontSize="sm" color="gray.600">
              Due: {task.dueDate}
            </Text>
          )}

          {task.assignee && (
            <Text fontSize="sm" color="gray.600">
              Assigned to: {task.assignee}
            </Text>
          )}
        </VStack>

        <AvatarGroup size="sm" max={3} spacing="-0.75rem">
          {usersViewing.map((user, index) => (
            <Avatar key={index} name={user} />
          ))}
        </AvatarGroup>
      </Flex>
    </Box>
  );
}
