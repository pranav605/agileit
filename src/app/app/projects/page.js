'use client'
import ThemedButton from '@/components/ThemedButton';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

export default function Projects() {
  const { theme } = useTheme();
  const headingText = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-900';
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    createdBy: '',
    members: [{ user: '', role: 'viewer' }],
    numberOfSprints: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(()=>{
    if(session){
      setForm(prev=>({
        ...prev, createdBy: session?.user?.id
      }))
    }
  },[session]);

  if (!mounted) return null;

  // Dummy projects array
  const projects = [
    { id: 1, name: 'Project Alpha', description: 'A project about alpha testing.' },
    { id: 2, name: 'Project Beta', description: 'Beta phase project for new features.' },
    { id: 3, name: 'Project Gamma', description: 'Gamma release management tool.' },
    { id: 4, name: 'Project Delta', description: 'Delta process improvement initiative.' },
    { id: 5, name: 'Project Epsilon', description: 'Epsilon analytics dashboard.' },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMemberChange = (idx, field, value) => {
    setForm(prev => {
      const members = [...prev.members];
      members[idx][field] = value;
      return { ...prev, members };
    });
  };

  const addMember = () => {
    setForm(prev => ({
      ...prev,
      members: [...prev.members, { user: '', role: 'viewer' }]
    }));
  };

  const removeMember = (idx) => {
    setForm(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to backend
    setShowModal(false);
    setForm({
      name: '',
      description: '',
      createdBy: '',
      members: [{ user: '', role: 'viewer' }],
      numberOfSprints: '',
    });
  };

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col'>
        <h1 className={`text-4xl font-extrabold mb-8 tracking-tight ${headingText}`}>Projects</h1>
        <form className='flex flex-row justify-around items-center mb-4'>
          <input
            type='text'
            name='search_term'
            id="search_term"
            placeholder='Search a project'
            className='px-4 py-2 flex-2/3 rounded-md border border-gray-200 dark:border-zinc-800'
          />
          <ThemedButton type={'submit'} label={'Search'} className={''}/>
        </form>
        <div className='grid grid-cols-3 gap-2 mt-4'>
          <button
            className='cursor-pointer flex flex-col items-center justify-center h-24 w-full rounded-md border-2 border-dashed border-gray-300 dark:border-zinc-700 text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors'
            onClick={() => setShowModal(true)}
            type="button"
          >
            <span className="text-2xl font-bold">+</span>
            <span className="text-sm">Create Project</span>
          </button>
          {/* Project Cards */}
          {projects.map(project => (
            <div
              key={project.id}
              className='cursor-pointer h-24 w-full rounded-md border border-gray-200 dark:border-zinc-800 flex flex-col items-center justify-center text-lg font-medium bg-white dark:bg-zinc-900 p-2'
            >
              <div>{project.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {project.description || 'No description'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-800 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-800 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Created By (User ID) *</label>
                <input
                  type="text"
                  name="createdBy"
                  disabled
                  required
                  value={form.createdBy}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-800 rounded-md disabled:text-zinc-600"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Members</label>
                {form.members.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="User ID"
                      value={member.user}
                      onChange={e => handleMemberChange(idx, 'user', e.target.value)}
                      className="px-2 py-1 border border-gray-200 dark:border-zinc-800 rounded-md"
                    />
                    <select
                      value={member.role}
                      onChange={e => handleMemberChange(idx, 'role', e.target.value)}
                      className="px-2 py-1 border border-gray-200 dark:border-zinc-800 rounded-md"
                    >
                      <option value="admin">admin</option>
                      <option value="editor">editor</option>
                      <option value="viewer">viewer</option>
                    </select>
                    {form.members.length > 1 && (
                      <button type="button" onClick={() => removeMember(idx)} className="text-red-500">Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addMember} className="text-blue-500 mt-1">+ Add Member</button>
              </div>
              <div>
                <label className="block mb-1 font-medium">Number of Sprints</label>
                <input
                  type="number"
                  name="numberOfSprints"
                  value={form.numberOfSprints}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-800 rounded-md"
                  min={0}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700">Cancel</button>
                <ThemedButton type="submit" label="Create" className="" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
