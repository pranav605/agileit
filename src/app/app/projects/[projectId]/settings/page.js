'use client'
import React, { useState } from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
export default function settings() {
    const { projectId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const {data:session} = useSession();
    const router = useRouter();
    

    const deleteProject = async (projectId, currentUser) => {
        try {
            const res = await axios.delete('http://localhost:5000/api/projects', {
                data: { projectId, currentUser }
            });

            console.log('Project deleted:', res.data);
            router.push('/app');
            // Optionally, navigate or refresh the project list
        } catch (error) {
            console.error('Failed to delete project:', error.response?.data || error.message);
            // Show error message in UI
        }
        // console.log(projectId, currentUser);
        
    }
    return (
        <div className='w-full h-full'>
            <div className='flex flex-col'>
                <h1 className={`text-4xl font-extrabold mb-8 tracking-tight text-gray-900 dark:text-gray-100`}>Settings</h1>
                <div className=''>
                    <button onClick={(e) => setShowModal(true)} className='cursor-pointer bg-red-600 rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>Delete Project</button>
                </div>
            </div>
            {
                showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-200/50 dark:bg-black/50">
                        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-lg shadow-lg text-center relative">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                aria-label="Close"
                            >
                                <XMarkIcon className='h-6 w-6' />
                            </button>
                            <div className="mb-6">
                                Are you sure you want to delete the project
                            </div>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => {deleteProject(projectId, session?.user?.id)}}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-100 dark:hover:bg-zinc-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
