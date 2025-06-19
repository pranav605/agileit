'use client'
import ThemedButton from '@/components/ThemedButton'
import React from 'react'

// Updated mockTasks based on the provided schema
const mockTasks = [
    {
        id: 1,
        title: 'Design homepage',
        description: 'Create the main landing page design',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-07-01',
        createdBy: { name: 'Alice' },
        assignedTo: { name: 'Bob' },
        project: 'AgileIT',
        sprint: 1,
        tags: ['UI', 'Frontend'],
        createdAt: '2024-06-01'
    },
    {
        id: 2,
        title: 'Implement login',
        description: 'Develop login functionality',
        status: 'done',
        priority: 'medium',
        dueDate: '2024-06-15',
        createdBy: { name: 'Bob' },
        assignedTo: { name: 'Charlie' },
        project: 'AgileIT',
        sprint: 1,
        tags: ['Backend', 'Auth'],
        createdAt: '2024-05-25'
    },
    {
        id: 3,
        title: 'Set up database',
        description: 'Initialize MongoDB and connect',
        status: 'todo',
        priority: 'low',
        dueDate: '2024-07-10',
        createdBy: { name: 'Charlie' },
        assignedTo: { name: 'Alice' },
        project: 'AgileIT',
        sprint: 2,
        tags: ['Database'],
        createdAt: '2024-06-10'
    },
]

export default function Tasks() {
    return (
        <div className='w-full h-full'>
            <div className='flex flex-col'>
                <h1 className='text-4xl font-extrabold mb-8 tracking-tight text-gray-900 dark:text-gray-100'>Tasks</h1>
                <div className='p-4 border border-zinc-200 dark:border-zinc-800 rounded min-h-14'>
                    <div className='flex flex-col justify-center items-end'>
                        <form className='flex flex-row justify-around items-center mb-4'>
                            <input
                                type='text'
                                name='search_term'
                                id="search_term"
                                placeholder='Search a task'
                                className='px-4 py-2 flex-2/3 rounded-md border border-gray-200 dark:border-zinc-800'
                            />
                            <ThemedButton type={'submit'} label={'Search'} className={''} />
                        </form>
                    </div>
                    <div className='flex flex-col'>
                        <div className="overflow-x-auto">
                            <table className='min-w-full'>
                                <thead className='h-10 bg-gray-100 dark:bg-zinc-800'>
                                    <tr>
                                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase'>Title</th>
                                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase'>Status</th>
                                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase'>Priority</th>
                                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase'>Due Date</th>
                                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase'>Assignee</th>
                                        <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase'>Tags</th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="max-h-[500px] overflow-y-auto">
                                <table className='min-w-full'>
                                    <tbody>
                                        {mockTasks.length > 0 ? (
                                            mockTasks.map(task => (
                                                <tr key={task.id}>
                                                    <td className='px-4 py-2 text-gray-900 dark:text-gray-100'>{task.title}</td>
                                                    <td className='px-4 py-2 text-gray-700 dark:text-gray-300 capitalize'>{task.status.replace('-', ' ')}</td>
                                                    <td className='px-4 py-2 text-gray-700 dark:text-gray-300 capitalize'>{task.priority}</td>
                                                    <td className='px-4 py-2 text-gray-700 dark:text-gray-300'>{task.dueDate}</td>
                                                    <td className='px-4 py-2 text-gray-700 dark:text-gray-300'>{task.assignedTo?.name || '-'}</td>
                                                    <td className='px-4 py-2 text-gray-700 dark:text-gray-300'>
                                                        {task.tags && task.tags.length > 0 ? task.tags.join(', ') : '-'}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className='px-4 py-8 text-center text-gray-500 dark:text-gray-400'>
                                                    No tasks found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
