
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UpdateTask = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [task, setTask] = useState({
        title: new URLSearchParams(location.search).get('title') || '',
        description: '',
        dueDate: '',
        priority: '',
        status: ''
    });

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tasks/${id}`, {
                withCredentials: true
            });
            setTask(response.data);
        } catch (error) {
            console.error('Error fetching task:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/tasks/${id}`, task, {
                withCredentials: true
            });
            navigate('/home');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await axios.delete(`http://localhost:5000/${id}`, {
                    withCredentials: true
                });
                navigate('/home'); 
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    return (
        <div className="container mx-auto mt-8">
           
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-semibold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-semibold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        rows="4"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-semibold mb-2">
                        Due Date
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="priority" className="block text-sm font-semibold mb-2">
                        Priority
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-semibold mb-2">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
                    >
                        Update Task
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none ml-4"
                    >
                        Delete Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;
