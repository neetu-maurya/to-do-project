import * as todoRepo from '../repository/todoRepository';

export const getAllTodos = async () => todoRepo.getTodos();
export const getTodo = async (id: string) => todoRepo.getTodoById(id);
export const addTodo = async (data: any) => todoRepo.createTodo(data);
export const editTodo = async (id: string, data: any) => todoRepo.updateTodo(id, data);
export const removeTodo = async (id: string) => todoRepo.deleteTodo(id);
