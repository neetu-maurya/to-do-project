import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Checkbox,
  useToast,
  Heading,
  Spinner,
} from "@chakra-ui/react";

interface Todo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
}

const API_URL = "http://localhost:5000/api/todos";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // for editing
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const toast = useToast();

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      toast({ title: "Error fetching todos", status: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!name || !description) {
      toast({ title: "Name and description required", status: "warning" });
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      if (res.ok) {
        setName("");
        setDescription("");
        fetchTodos();
        toast({ title: "Todo created", status: "success" });
      }
    } catch {
      toast({ title: "Error creating todo", status: "error" });
    }
  };

  const handleToggleStatus = async (id: string, status: boolean) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !status }),
      });
      if (res.ok) {
        fetchTodos();
        toast({ title: "Todo updated", status: "info" });
      }
    } catch {
      toast({ title: "Error updating todo", status: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchTodos();
        toast({ title: "Todo deleted", status: "error" });
      }
    } catch {
      toast({ title: "Error deleting todo", status: "error" });
    }
  };

  // start editing
  const startEdit = (todo: Todo) => {
    setEditId(todo._id);
    setEditName(todo.name);
    setEditDescription(todo.description);
  };

  // cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditDescription("");
  };

  // save edited todo
  const handleSaveEdit = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, description: editDescription }),
      });
      if (res.ok) {
        fetchTodos();
        cancelEdit();
        toast({ title: "Todo updated successfully", status: "success" });
      }
    } catch {
      toast({ title: "Error saving todo", status: "error" });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading mb={6} textAlign="center">
        To-Do App
      </Heading>
      <VStack spacing={4} mb={6}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </VStack>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <VStack spacing={3} align="stretch">
          {todos.length === 0 ? (
            <Text textAlign="center">No todos found.</Text>
          ) : (
            todos.map((todo) => (
              <HStack
                key={todo._id}
                justify="space-between"
                p={3}
                borderWidth={1}
                borderRadius="md"
                align="start"
              >
                {editId === todo._id ? (
                  // ✏️ Edit Mode
                  <VStack align="stretch" flex="1">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <Input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <HStack>
                      <Button
                        size="sm"
                        colorScheme="teal"
                        onClick={() => handleSaveEdit(todo._id)}
                      >
                        Save
                      </Button>
                      <Button size="sm" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </HStack>
                  </VStack>
                ) : (
                  // 📄 View Mode
                  <>
                    <Box flex="1">
                      <Checkbox
                        isChecked={todo.status}
                        onChange={() =>
                          handleToggleStatus(todo._id, todo.status)
                        }
                      >
                        <Text
                          as={todo.status ? "s" : undefined}
                          fontWeight="bold"
                        >
                          {todo.name}
                        </Text>
                      </Checkbox>
                      <Text fontSize="sm" color="gray.500">
                        {todo.description}
                      </Text>
                    </Box>
                    <HStack>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => startEdit(todo)}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDelete(todo._id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </>
                )}
              </HStack>
            ))
          )}
        </VStack>
      )}
    </Box>
  );
};

export default App;
