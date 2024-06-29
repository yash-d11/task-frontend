import React from 'react';

const TaskDetails = ({ task, onClose}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <p className="text-gray-700 mb-2">{task.description}</p>
        <p className="text-gray-700 mb-2">Due Date: {task.dueDate}</p>
        <p className="text-gray-700 mb-2">Priority: {task.priority}</p>
        {/* <p className="text-gray-700 mb-4">Status: {task.status}</p> */}
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
