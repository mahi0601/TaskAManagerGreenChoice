import React from 'react';
import Task from './Task';

function Column({ title, tasks, onDelete, onUpdate }) {
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="tasks-list">
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
