'use client';
import React, { useEffect, useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { ClipboardIcon, ChatBubbleOvalLeftIcon, EyeIcon, TagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import axios from 'axios';

export default function TaskDetail() {
    const { taskId } = useTask(); // assume context provides current taskId
    const [task, setTask] = useState({});

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
            case 'high': return 'bg-red-50 text-red-700';
            case 'medium': return 'bg-yellow-50 text-yellow-700';
            case 'low': return 'bg-green-50 text-green-700';
            default: return 'bg-gray-50 text-gray-600';
        }
    };

    const formatDate = (dateStr) => {
        try {
            return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        } catch { return ''; }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-zinc-900 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-200 mb-1">{task.title}</h2>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-zinc-400">
                        <span>Status: <strong>{task.status}</strong></span>
                        <span>Due: <strong>{formatDate(task.dueDate)}</strong></span>
                        <div className={`px-2 py-1 rounded-md font-medium flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                            <ClipboardIcon className="h-4 w-4" /> {task.priority}
                        </div>
                    </div>
                </div>
                <Image 
                    src={task.assignedTo?.avatar || '/images/avatar.png'} 
                    alt={task.assignedTo?.name || "User"} 
                    width={48} 
                    height={48} 
                    className="rounded-full border border-gray-200 dark:border-zinc-700"
                />
            </div>

            {/* Description */}
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mb-2">Description</h3>
                <p className="text-gray-700 dark:text-zinc-300">{task.description}</p>
            </div>

            {/* Tags */}
            {task.tags?.length > 0 && (
                <div className="mb-5">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 mb-2 flex items-center gap-1">
                        <TagIcon className="h-5 w-5" /> Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md text-gray-600 dark:text-zinc-200">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Activity / Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-300">
                <div className="flex items-center gap-3">
                    <EyeIcon className="h-5 w-5" /> <span>{task.views || 0}</span>
                    <ChatBubbleOvalLeftIcon className="h-5 w-5" /> <span>{task.comments?.length || 0}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    Assigned to: <strong>{task.assignedTo?.name || "Unassigned"}</strong>
                </div>
            </div>
        </div>
    );
}
