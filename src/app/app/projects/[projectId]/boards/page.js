'use client';
import React, { useState } from 'react';
import {
    DndContext,
    closestCorners,
    useDraggable,
    useDroppable,
    DragOverlay,
} from '@dnd-kit/core';
import { ClipboardIcon, ChatBubbleOvalLeftIcon, EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const initialTasks = [
    { id: '1', title: 'Design homepage', status: 'todo', priority: 'High' },
    { id: '2', title: 'Implement login', status: 'in-progress', priority: 'Medium' },
    { id: '3', title: 'Set up database', status: 'done', priority: 'Low' },
];

const columns = [
    { id: 'todo', label: 'To Do' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'done', label: 'Done' },
];

// Card component
function TaskCard({ task, dragOverlay = false }) {
    const draggable = useDraggable({
        id: task.id,
        data: { task },
    });

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging
    } = dragOverlay ? {} : draggable;

    const style = dragOverlay
        ? {}
        : transform
        ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
        : undefined;

    const getPriorityColor = (priority) => {
        switch ((priority || '').toLowerCase()) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div
            ref={dragOverlay ? null : setNodeRef}
            style={style}
            className={`bg-white dark:bg-black p-4 mb-4 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 transition-opacity ${
                isDragging ? 'opacity-50' : 'opacity-100'
            }`}
            {...(dragOverlay ? {} : listeners)}
            {...(dragOverlay ? {} : attributes)}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-200">
                    <span className="h-2 w-2 rounded-full bg-red-400"></span>
                    <span>UI Design</span>
                </div>
                <div className={`text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1  ${getPriorityColor(task.priority)}`}>
                    <ClipboardIcon className="h-4 w-4" />
                    {task.priority}
                </div>
            </div>

            {/* Title and Description */}
            <h3 className="text-md font-semibold text-gray-900 dark:text-zinc-200">{task.title}</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-200 mb-3">Create low-fidelity designs that outline the basic structure and layout of the product or service..</p>

            {/* Progress */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-200 mb-3">
                <ClipboardIcon className="h-4 w-4" />
                <span>0/8</span>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
                {/* Avatars */}
                <div className="flex -space-x-2">
                    <Image src="/images/avatar.png" alt="User 1" width={24} height={24} className="rounded-full border border-gray-200" />
                    <Image src="/images/avatar.png" alt="User 2" width={24} height={24} className="rounded-full border border-gray-200" />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3 text-gray-500 dark:text-zinc-200">
                    <EyeIcon className="h-4 w-4" />
                    <span className="text-xs">2</span>
                    <ChatBubbleOvalLeftIcon className="h-4 w-4" />
                    <span className="text-xs">19</span>
                </div>
            </div>
        </div>
    );
}

// Column component
function Column({ column, tasks, children }) {
    const { setNodeRef } = useDroppable({ id: column.id });

    return (
        <div
            ref={setNodeRef}
            className="flex-1 p-2 min-h-[400px] bg-gray-50 dark:bg-transparent rounded-lg mx-2"
        >
            <h2 className="text-center font-bold mb-2 text-lg">{column.label}</h2>
            {children}
        </div>
    );
}

export default function KanbanBoard() {
    const [tasks, setTasks] = useState(initialTasks);
    const [activeTask, setActiveTask] = useState(null);

    const handleDragStart = (event) => {
        const task = tasks.find(t => t.id === event.active.id);
        setActiveTask(task);
    };

    const handleDragEnd = (event) => {
        const { over, active } = event;

        if (over && active.id !== over.id) {
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
            <div className="flex p-4">
                {columns.map(col => (
                    <Column key={col.id} column={col} tasks={tasks.filter(t => t.status === col.id)}>
                        {tasks
                            .filter(task => task.status === col.id)
                            .map(task => <TaskCard key={task.id} task={task} />)}
                    </Column>
                ))}
            </div>

            <DragOverlay>
                {activeTask ? (
                    <TaskCard task={activeTask} dragOverlay />
                ) : null}
            </DragOverlay>

        </DndContext>
    );
}
