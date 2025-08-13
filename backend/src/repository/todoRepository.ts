import Todo from '../schemas/todo-schema';

export const getTodos = async () => Todo.find();
export const getTodoById = async (id: string) => Todo.findById(id);
export const createTodo = async (data: any) => Todo.create(data);
export const updateTodo = async (id: string, data: any) => Todo.findByIdAndUpdate(id, data, { new: true });
export const deleteTodo = async (id: string) => Todo.findByIdAndDelete(id);
