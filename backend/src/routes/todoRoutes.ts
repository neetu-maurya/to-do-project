import { Router } from 'express';
import * as todoService from '../services/todoService';

const router = Router();

router.get('/', async (req, res) => {
  const todos = await todoService.getAllTodos();
  console.log('Fetched todos:', todos);
  res.json(todos);
});

router.get('/:id', async (req, res) => {
  const todo = await todoService.getTodo(req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

router.post('/', async (req, res) => {
  const todo = await todoService.addTodo(req.body);
  res.status(201).json(todo);
});

router.put('/:id', async (req, res) => {
  const todo = await todoService.editTodo(req.params.id, req.body);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  const result = await todoService.removeTodo(req.params.id);
  if (!result) return res.status(404).json({ message: 'Todo not found' });
  res.json({ message: 'Todo deleted' });
});

export default router;
