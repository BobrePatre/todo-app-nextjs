"use client";

import { Button, Center, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import TodoItem from "@/components/ui/todo_item";
import { ChangeEvent, useEffect, useState } from "react";
import { useTaskStore } from "@/lib/store/todo_store";

export default function HomePage() {
  const taskStore = useTaskStore();
  const [inputValue, setInputValue] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    useTaskStore.persist.rehydrate();
    setIsClient(true);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addTask = () => {
    if (inputValue == "" || inputValue == null) {
      return;
    }
    taskStore.addTask(inputValue);
    setInputValue("");
  };

  return (
    <main>
      <Stack>
        <Input
          placeholder="Todo"
          width={"auto"}
          size={"lg"}
          value={inputValue}
          onChange={handleChange}
          marginTop={30}
          marginLeft={30}
          marginRight={30}
        />

        <Button
          marginLeft={30}
          marginRight={30}
          marginTop={0}
          onClick={addTask}
        >
          Add
        </Button>
        {isClient ? (
          taskStore.tasks.length == 0 ? (
            <Center>
              <Text color={"grey"}>Empty ...</Text>
            </Center>
          ) : (
            taskStore.tasks.map((task) => (
              <TodoItem
                key={task.id}
                title={task.title}
                completed={task.completed}
                id={task.id}
              />
            ))
          )
        ) : (
          <Center>
            <Spinner marginTop={30} />
          </Center>
        )}
      </Stack>
    </main>
  );
}
