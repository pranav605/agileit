'use client'
import ThemedButton from '@/components/ThemedButton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

// Updated mockTasks based on the provided schema
const mockTasks = [

]

export default function Tasks() {
    const [createModal, setCreateModal] = useState(false);

    const [form, setForm] = useState({
        tags: ['a','b']
    });

    const handleFormChange = (e)=>{

    }

    const handleSubmit = (e)=>{
        
    }

    const handleTagsChange = (e) => {

    }
    return (
        <div className='w-full h-full'>
            <div className='flex flex-col text-gray-500 dark:text-gray-300'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-4xl font-extrabold mb-8 tracking-tight text-gray-900 dark:text-gray-100'>Tasks</h1>
                    <ThemedButton type={'button'} label={'Create new task'} className={'h-12'} onClick={(e)=>setCreateModal(true)}/>
                </div>
                <div className='p-4 border border-zinc-200 dark:border-zinc-800 rounded min-h-14'>
                    <div className='flex flex-row justify-between items-center mb-4'>
                        <div className='flex divide-x text-sm divide-gray-200 h-10 dark:divide-zinc-800 rounded border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-gray-300' >
                            <div className='px-4 py-2 flex justify-center items-center cursor-pointer hover:bg-gray-100'>
                                <span>View all</span>
                            </div>
                            <div className='px-2 py-4 flex justify-center items-center cursor-pointer hover:bg-gray-100'>
                                <span>New</span>
                            </div>
                            <div className='px-2 py-4 flex justify-center items-center cursor-pointer hover:bg-gray-100'>
                                <span>In Progress</span>
                            </div>
                            <div className='px-2 py-4 flex justify-center items-center cursor-pointer hover:bg-gray-100'>
                                <span>Done</span>
                            </div>
                            <div className='px-2 py-4 flex justify-center items-center cursor-pointer hover:bg-gray-100'>
                                <span>Assigned to you</span>
                            </div>
                        </div>
                        <form className='flex flex-row justify-around items-center'>
                            <input
                                type='text'
                                name='search_term'
                                id="search_term"
                                placeholder='Search a task'
                                className='px-4 py-2 flex-2/3 rounded-md border border-gray-200 dark:border-zinc-800 '
                            />
                            <button type='submit' className='p-3 ml-2 text-sm rounded-md border border-gray-200 dark:border-zinc-800 cursor-pointer'><MagnifyingGlassIcon height={16} width={16}/></button>
                        </form>
                    </div>
                    <div className='flex flex-col'>
                        <div className="overflow-x-auto">
                            <div className="max-h-[500px] overflow-y-auto">
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
            {/*Create task modal*/}
            {createModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-200/50 dark:bg-black/50">
                    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-lg max-h-2/3 overflow-y-auto shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Create Task</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={form.title}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-md max-h-16"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Status</label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-md"
                                >
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Priority</label>
                                <select
                                    name="priority"
                                    value={form.priority}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-md"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Due Date</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={form.dueDate}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Assigned To (User ID)</label>
                                <input
                                    type="text"
                                    name="assignedTo"
                                    value={form.assignedTo}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Project (Project ID) *</label>
                                <input
                                    type="text"
                                    name="project"
                                    required
                                    value={form.project}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Sprint</label>
                                <input
                                    type="number"
                                    name="sprint"
                                    value={form.sprint}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-md"
                                    min={0}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={form.tags.join(', ')}
                                    onChange={handleTagsChange}
                                    className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-md"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" onClick={() => setCreateModal(false)} className="cursor-pointer px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700">Cancel</button>
                                <ThemedButton type="submit" label="Create" className="cursor-pointer" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
