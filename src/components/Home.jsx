import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskDetails from './TaskDetails';


const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks', {
        withCredentials: true
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, updates, {
        withCredentials: true
      });
      setTasks((prevTasks) => prevTasks.map(task => task._id === id ? response.data : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const priorities = ['High', 'Medium', 'Low'];
  const colors = {
    High: 'bg-red-400',
    Medium: 'bg-yellow-200',
    Low: 'bg-green-200'
  };
  const handleTaskClick = (task) => {
    setSelectedTask(task); 
  };

  return (
    <div className="container mx-auto bg-gray-50 min-h-screen p-6">
      
      <div className="flex justify-between">
        {priorities.map((priority) => (
          <div key={priority} className={`w-full p-2 ${colors[priority]} mx-2 rounded`}>
            <h2 className="text-2xl font-bold text-center mb-4">{priority} Priority</h2>
            <div className="flex flex-col space-y-4">
              {currentTasks
                .filter(task => task.priority === priority)
                .map((task) => (
                  <div key={task._id} className="bg-white shadow-lg rounded-lg p-4 group transition-transform hover:-translate-y-2 hover:shadow-2xl">
                    <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                    
                    
                    <div className="mt-2">
                      <label className="block mb-1 text-sm font-semibold">Change Priority:</label>
                      <select
                        className="w-full p-1 border border-gray-300 rounded"
                        value={task.priority}
                        onChange={(e) => updateTask(task._id, { priority: e.target.value })}
                      >
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectedTask && ( 
        <TaskDetails  task={selectedTask}
        onClose={() => setSelectedTask(null)} 
        onUpdate={(updates) => updateTask(selectedTask._id, updates)} 
       />
      )}
                    <div className="mt-2">
                      <button
                        className={`w-full p-2 text-white rounded ${task.status === 'completed' ? 'bg-gray-500' : 'bg-blue-500'} hover:bg-blue-600`}
                        onClick={() => updateTask(task._id, { status: task.status === 'completed' ? 'incomplete' : 'completed' })}
                      >
                        Mark as {task.status === 'completed' ? 'Incomplete' : 'Completed'}
                      </button>
                      <div className='w-full flex justify-between'><button
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleTaskClick(task)} 
                    >
                      View Details
                    </button>
                    
                    <div className="mt-3">
                            <Link to={`/update/${task._id}?title=${encodeURIComponent(task.title)}`} className="bg-blue-500 hover:bg-blue-600 text-white  py-1 px-3 rounded mr-2">Update/delete</Link>
                        </div>
                        </div>
                        </div>
                  </div>
                  
                ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
          <li key={index} className="mx-1">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
<button className="bg-blue-500 hover:bg-blue-600 text-center ml-[39%] text-4xl text-white mt-10 py-2 px-4 rounded">
      <Link to="/create" >
                Create Task
            </Link>
            </button>
    </div>
  );
};

export default Home;
