'use client';
import React, { useEffect, useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import {
  ClipboardIcon,
  ChatBubbleOvalLeftIcon,
  EyeIcon,
  TagIcon,
  PencilIcon,
  CheckIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import axios from 'axios';

export default function TaskDetail() {
  const { taskId } = useTask();
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState({});
  const [updatedFields, setUpdatedFields] = useState({});
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
        setTask(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (taskId) fetchTask();
  }, [taskId]);

  if (!task) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-500 dark:text-zinc-400">Loading task details...</p>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch ((priority || '').toLowerCase()) {
      case 'high':
        return 'bg-red-50 text-red-700';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700';
      case 'low':
        return 'bg-green-50 text-green-700';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const toggleEdit = (field) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    setUpdatedFields({ ...updatedFields, [field]: task[field] });
  };

  const saveField = async (field) => {
    try {
      await axios.post(`http://localhost:5000/api/tasks/update/${task._id}`, {
        [field]: updatedFields[field],
      });
      setTask({ ...task, [field]: updatedFields[field] });
      toggleEdit(field);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const comment = { text: newComment, author: 'You', createdAt: new Date() };

    try {
      await axios.post(`http://localhost:5000/api/tasks/${task._id}/comment`, comment);
      setTask({ ...task, comments: [...(task.comments || []), comment] });
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (

    <div className='flex flex-row gap-4 h-[calc(100vh-100px)]'>
      <div className='flex flex-col flex-2/3 text-gray-900 dark:text-zinc-200 overflow-y-auto pr-2'>
        <h1 className='text-2xl font-semibold mb-4'>{task.title}</h1>
        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold mb-2'>Description</h2>
          <p className='mb-4'>{task.description}</p>
          <div className='border border-gray-200 dark:border-zinc-700 w-full rounded h-32 flex items-center justify-center hover:bg-zinc-900 mb-4 cursor-pointer'>
            <span className='flex flex-row items-center justify-center gap-2'>Drag and drop supporting files or images <PhotoIcon className='h-5 w-5'/></span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mb-3 flex items-center gap-2">
              <ChatBubbleOvalLeftIcon className="h-5 w-5" />
              Comments
            </h3>
            <div className="space-y-4 mb-4">
              {task.comments?.length > 0 ? (
                task.comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 p-3 rounded-md"
                  >
                    <p className="text-sm text-gray-800 dark:text-zinc-200">{c.text}</p>
                    <span className="text-xs text-gray-500 dark:text-zinc-400">
                      — {c.author}, {formatDate(c.createdAt)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>

            {/* Add Comment */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-gray-800 dark:text-zinc-200 focus:outline-none"
              />
              <button
                onClick={handleAddComment}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 flex-1/3 border border-gray-200 dark:border-zinc-700 shadow-md rounded p-6 sticky top-0 self-start h-fit'>
        <div className='font-bold text-gray-700 dark:text-zinc-300 w-full'>
          <h1 className='text-lg'>Details</h1>
        </div>
        <div className='flex flex-row gap-2 w-full h-8 items-center'>
          <h4 className='text-sm font-semibold text-gray-700 dark:text-zinc-300 w-full'>Assignee</h4>
          <span className='text-xs px-2 py-1 w-full'>{task.assignedTo?.name}</span>
        </div>
        <div className='flex flex-row gap-2 w-full h-8 items-center'>
          <h4 className='text-sm font-semibold text-gray-700 dark:text-zinc-300 w-full'>Reporter</h4>
          <span className='text-xs px-2 py-1 w-full'>{task.createdBy?.name}</span>
        </div>
        <div className='flex flex-row gap-2 w-full h-8 items-center'>
          <h4 className='text-sm font-semibold text-gray-700 dark:text-zinc-300 w-full'>Priority</h4>
          <span className='text-xs px-2 py-1 w-full'>{task.priority}</span>
        </div>
        <div className='flex flex-row gap-2 w-full h-8 items-center'>
          <h4 className='text-sm font-semibold text-gray-700 dark:text-zinc-300 w-full'>Status</h4>
          <span className='text-xs px-2 py-1 w-full'>{task.status}</span>
        </div>
        <div className='flex flex-row gap-2 w-full h-8 items-center'>
          <h4 className='text-sm font-semibold text-gray-700 dark:text-zinc-300 w-full'>Tags</h4>
          <span className='text-xs px-2 py-1 w-full'>{task.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md text-gray-600 dark:text-zinc-200"
            >
              #{tag}
            </span>
          ))}</span>
        </div>
      </div>
    </div>
  );
}
