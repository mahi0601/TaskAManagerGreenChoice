import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './TaskForm';
import Column from './Column';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      const updated = await response.json();
      setTasks(tasks.map(t => t.id === taskId ? updated : t));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      <main className="app-main">
        <TaskForm onSubmit={handleCreateTask} />
        <div className="columns-container">
          <Column
            title="To Do"
            tasks={getTasksByStatus('todo')}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
          <Column
            title="In Progress"
            tasks={getTasksByStatus('in-progress')}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
          <Column
            title="Done"
            tasks={getTasksByStatus('done')}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
