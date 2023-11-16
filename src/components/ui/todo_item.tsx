"use client";

import { TodoTask, useTaskStore } from "@/lib/store/todo_store";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, Checkbox, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function TodoItem(props: TodoTask) {
  const taskStore = useTaskStore();
  const [bruh, setCompleted] = useState(props.completed);

  const changeCompleted = () => {
    setCompleted(!bruh);
    taskStore.updateTask(props.id, !bruh);
  };

  return (
    <>
      <Card marginRight={30} marginLeft={30} marginTop={5} boxShadow={"lg"}>
        <CardBody>
          <Flex alignItems={"center"}>
            <Text flex={1}>{props.title}</Text>

            <Button
              marginRight={5}
              size={"md"}
              onClick={() => taskStore.removeTask(props.id)}
            >
              <DeleteIcon />
            </Button>

            <Checkbox isChecked={bruh} onChange={changeCompleted} flex={0} />
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
