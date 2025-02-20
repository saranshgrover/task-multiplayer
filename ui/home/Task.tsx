import React from 'react'
import { Box, Checkbox, Text, HStack, IconButton, Button } from '@chakra-ui/react'
import Link from 'next/link'

export type TaskProps = {
  id: string
  title: string
  completed: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function Task({ id, title, completed, onToggle, onDelete }: TaskProps) {
  return (
    <Link href={`/tasks/${id}`} style={{ textDecoration: 'none' }}>
      <Box 
        p={4} 
        borderWidth="1px" 
        borderRadius="lg" 
        mb={2}
        _hover={{ bg: 'gray.50' }}
        cursor="pointer"
      >
        <HStack justify="space-between">
          <HStack>
            <Checkbox 
              isChecked={completed} 
              onChange={() => onToggle(id)}
            />
            <Text textDecoration={completed ? 'line-through' : 'none'}>
              {title}
            </Text>
          </HStack>
          <Button onClick={() => onDelete(id)}>Delete</Button>
        </HStack>
      </Box>
    </Link>
  )
} 