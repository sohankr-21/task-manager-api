const express = require('express');
const router = express.Router();

let tasks = []; // in-memory storage

// Create task
router.post('/', (req, res) => {
  const task = { id: Date.now(), ...req.body, status: 'pending' };
  tasks.push(task);
  res.status(201).json(task);
});

// Get all tasks (with optional filter)
router.get('/', (req, res) => {
  const { status } = req.query;
  let result = tasks;

  if (status) {
    result = tasks.filter(t => t.status === status);
  }

  res.json(result);
});

// Update task
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.map(t => t.id === id ? { ...t, ...req.body } : t);
  res.json(tasks.find(t => t.id === id));
});

// Mark task as completed
router.patch('/:id/complete', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t);
  res.json(tasks.find(t => t.id === id));
});

// Delete task
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Task deleted' });
});

// Delete all completed tasks
router.delete('/completed', (req, res) => {
  tasks = tasks.filter(t => t.status !== 'completed');
  res.json({ message: 'All completed tasks deleted' });
});

module.exports = router;