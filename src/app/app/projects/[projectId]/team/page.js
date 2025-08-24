'use client';
import ThemedButton from '@/components/ThemedButton'
import { useProject } from '@/contexts/ProjectContext';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Team() {
    const {projectId} = useProject();
    const [team, setTeam] = useState([]);

    useEffect(()=>{
        async function fetchTeam(){
            const res = await axios.get('http://localhost:5000/api/projects/team/'+projectId);
            console.log(res);
            setTeam(res.data);
        }

        fetchTeam();
    },[])

  return (
     <div className='w-full h-full'>
                <div className='flex flex-col'>
                    <h1 className='text-4xl font-extrabold mb-8 tracking-tight text-gray-900 dark:text-gray-100'>Team</h1>
                    <div className='p-4 border border-zinc-200 dark:border-zinc-800 rounded min-h-14'>
                        <div className='flex flex-col justify-center items-end'>
                            <form className='flex flex-row justify-around items-center mb-4'>
                                <input
                                    type='text'
                                    name='search_term'
                                    id="search_term"
                                    placeholder='Looking for a member?'
                                    className='px-4 py-2 flex-2/3 rounded-md border border-gray-200 dark:border-zinc-800 text-sm'
                                />
                                <ThemedButton type={'submit'} label={'Search'} className={''} />
                            </form>
                        </div>
                        <div className='flex flex-col'>
                            <div className="overflow-x-auto">
                              <div className="max-h-[500px] overflow-y-auto">
                                <table className='min-w-full'>
                                    <thead className='h-10 bg-gray-100 dark:bg-zinc-800 sticky top-0'>
                                        <tr>
                                            <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase'>Name</th>
                                            <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase'>Email</th>
                                            <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase'>Role</th>
                                            <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase'>Action</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {team.length > 0 ? (
                                                team.map((team,index) => (
                                                    <tr key={index}>
                                                        <td className='px-4 py-2 text-gray-900 dark:text-gray-100'>{team.user.name}</td>
                                                        <td className='px-4 py-2 text-gray-700 dark:text-gray-300 '>{team.user.email}</td>
                                                        <td className='px-4 py-2 text-gray-700 dark:text-gray-300 capitalize'>{team.role}</td>
                                                        <td className='px-4 py-2 text-gray-700 dark:text-gray-300 flex gap-1'>
                                                          <div className='p-2 border-gray-200 dark:border-zinc-800 border rounded cursor-pointer'>
                                                            <PencilIcon height={16} width={16}/>  
                                                          </div>
                                                          <div className='p-2 border-gray-200 dark:border-zinc-800 border rounded hover:text-red-600 cursor-pointer'>
                                                            <TrashIcon height={16} width={16}/>
                                                          </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={6} className='px-4 py-8 text-center text-gray-500 dark:text-gray-400'>
                                                        No members found.
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
