import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './TaskForm';
import Column from './Column';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log('API URL:', API_URL);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to fetch tasks. Make sure backend is running on http://localhost:5000');
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task: ' + error.message);
    }
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      const updated = await response.json();
      setTasks(tasks.map(t => t.id === taskId ? updated : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
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
