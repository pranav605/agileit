'use client';
import React, { useEffect, useState } from 'react';
import {
    DndContext,
    closestCorners,
    useDraggable,
    useDroppable,
    DragOverlay,
} from '@dnd-kit/core';
import { ClipboardIcon, ChatBubbleOvalLeftIcon, EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useProject } from '@/contexts/ProjectContext';


const columns = [
    { id: 'todo', label: 'To Do' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'done', label: 'Done' },
];

// TaskCard (Professional Look)
function TaskCard({ task, dragOverlay = false }) {
    const draggable = useDraggable({ id: task.id, data: { task } });
    const { attributes, listeners, setNodeRef, transform, isDragging } = dragOverlay ? {} : draggable;

    const style = dragOverlay
        ? {}
        : transform
            ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
            : undefined;

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
        <div
            ref={dragOverlay ? null : setNodeRef}
            style={style}
            className={`bg-white dark:bg-zinc-900 p-5 mb-4 rounded-lg border border-gray-200 dark:border-zinc-700 shadow-md hover:shadow-lg transition-all ${isDragging ? 'opacity-60' : 'opacity-100'}`}
            {...(dragOverlay ? {} : listeners)}
            {...(dragOverlay ? {} : attributes)}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-300">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    <span>Due: {formatDate(task.dueDate)}</span>
                </div>
                <div className={`text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                    <ClipboardIcon className="h-4 w-4" />
                    {task.priority}
                </div>
            </div>

            {/* Title & Description */}
            <h3 className={`text-md font-semibold text-gray-900 dark:text-zinc-200 mb-1 ${task.status == "done" ? 'line-through' : ''}`}>{task.title}</h3>
            <p className="text-sm text-gray-600 dark:text-zinc-300 mb-3">{task.description}</p>

            {/* Tags */}
            {task.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {task.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md text-gray-600 dark:text-zinc-200">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-zinc-700 mt-2 text-sm text-gray-600 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                    <Image src="/images/avatar.png" alt={task.assignedTo?.name || "User"} width={28} height={28} className="rounded-full border border-gray-200 dark:border-zinc-700" />
                    {task.assignedTo?.name}
                </div>
                <div className="flex items-center gap-3">
                    <EyeIcon className="h-4 w-4" /> <span>0</span>
                    <ChatBubbleOvalLeftIcon className="h-4 w-4" /> <span>0</span>
                </div>
            </div>
        </div>
    );
}

// Column (Professional Look)
function Column({ column, tasks }) {
    const { setNodeRef } = useDroppable({ id: column.id });

    return (
        <div
            ref={setNodeRef}
            className="flex-1 flex flex-col bg-gray-100 dark:bg-zinc-900 rounded-lg p-0 mx-0"
        >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-gray-100 dark:bg-zinc-900 border-b border-gray-300 dark:border-zinc-700 p-3 text-center font-semibold text-gray-700 dark:text-zinc-200">
                {column.label}
            </div>

            {/* Scrollable Tasks */}
            <div className="flex-1 p-3 overflow-y-auto max-h-[70vh]">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}

export default function KanbanBoard() {
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);
    const { data: session, status } = useSession();
    const { projectId } = useProject();

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get('http://localhost:5000/api/tasks/project/' + projectId);
            const normalizedTasks = res.data.map(task => ({
                ...task,
                id: task._id, // <-- map _id to id
            }));
            setTasks(normalizedTasks);
            console.log(normalizedTasks);
        };

        if (session) fetchTasks();
    }, [session]);


    const handleDragStart = (event) => {
        const task = tasks.find(t => t.id === event.active.id);
        setActiveTask(task);
    };

    const updateStatus = (id, status) => {
        axios.post(`http://localhost:5000/api/tasks/update/${id}`,{status: status})
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleDragEnd = (event) => {
        const { over, active } = event;
        
        if (over && active.id !== over.id) {
            if(activeTask.status != over.id) updateStatus(active.id, over.id);
            setTasks(prev =>
                prev.map(task =>
                    task.id === active.id ? { ...task, status: over.id } : task
                )
            );
        }

        setActiveTask(null);
    };

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full h-[70vh] text-center">
        <Image
            src="/images/kanban.png" 
            alt="No tasks"
            width={200}
            height={200}
            priority={'height'}
            className="mb-6 opacity-80"
        />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-zinc-300">
            No tasks available
        </h2>
        <p className="text-gray-500 dark:text-zinc-400 mt-2">
            Start by creating a new task for this project.
        </p>
    </div>
            ) : (
                <div className="flex bg-gray-200 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded space-x-0">
                    {columns.map((col, index) => (
                        <Column
                            key={index}
                            column={col}
                            tasks={tasks.filter(t => t.status === col.id)}
                        >
                            {tasks
                                .filter(task => task.status === col.id)
                                .map((task, index) => (
                                    <TaskCard key={task.id || index} task={task} />
                                ))}
                        </Column>
                    ))}
                </div>
            )}

            <DragOverlay>
                {activeTask ? (
                    <TaskCard task={activeTask} dragOverlay />
                ) : null}
            </DragOverlay>
        </DndContext>

    );
}
