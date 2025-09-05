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
    <div className="grid grid-cols-3 gap-6 mx-auto p-6">
      {/* Left Column (Main Content) */}
      <div className="col-span-2 bg-gray-50 dark:bg-zinc-900 rounded-lg shadow-md p-6">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-200 mb-3">
          {task.title}
        </h2>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mb-2">
            Description
          </h3>
          <p className="text-gray-700 dark:text-zinc-300">{task.description}</p>
        </div>

        {/* Comments */}
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

      {/* Right Column (Sidebar Details) */}
      <div className="col-span-1 bg-gray-50 dark:bg-zinc-900 rounded-lg shadow-md p-6 space-y-5">
        {/* Assignee */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
            Assignee
          </h4>
          <div className="flex items-center gap-2">
            <Image
              src={task.assignedTo?.avatar || '/images/avatar.png'}
              alt={task.assignedTo?.name || 'User'}
              width={32}
              height={32}
              className="rounded-full border border-gray-200 dark:border-zinc-700"
            />
            <span className="text-sm text-gray-800 dark:text-zinc-200">
              {task.assignedTo?.name || 'Unassigned'}
            </span>
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
            Status
          </h4>
          {editing.status ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={updatedFields.status}
                onChange={(e) =>
                  setUpdatedFields({ ...updatedFields, status: e.target.value })
                }
                className="px-2 py-1 text-sm rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200"
              />
              <button onClick={() => saveField('status')}>
                <CheckIcon className="h-5 w-5 text-green-600" />
              </button>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleEdit('status')}
            >
              <span className="text-sm">{task.status}</span>
              <PencilIcon className="h-4 w-4 text-gray-500" />
            </div>
          )}
        </div>

        {/* Priority */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
            Priority
          </h4>
          <div
            className={`text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1 w-fit cursor-pointer ${getPriorityColor(
              task.priority
            )}`}
            onClick={() => toggleEdit('priority')}
          >
            <ClipboardIcon className="h-4 w-4" />
            {task.priority}
          </div>
        </div>

        {/* Due Date */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
            Due Date
          </h4>
          <p className="text-sm text-gray-800 dark:text-zinc-200">
            {formatDate(task.dueDate)}
          </p>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 flex items-center gap-1">
            <TagIcon className="h-4 w-4" /> Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {task.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md text-gray-600 dark:text-zinc-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Views */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-300">
          <EyeIcon className="h-5 w-5" />
          {task.views || 0} views
        </div>
      </div>
    </div>
  );
}
