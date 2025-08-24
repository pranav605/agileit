'use client'
import ThemedButton from '@/components/ThemedButton';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import MemberSelector from '@/components/MemberSelector';
import axios from 'axios';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState([]);
  const { data: session, status } = useSession();
  const [deleteProject, setDeleteProject] = useState(null);

  const handleDeleteModal = (event, project) => {
    event.stopPropagation();
    setShowModal(false);
    setDeleteProject(project);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteProject) return;

    try {
      const res = await fetch(`http://localhost:5000/api/projects/delete/${deleteProject._id}?currentUser=${session?.user?.id}`, {
        method: 'DELETE',
      });
      if (res.status == 403) {
        const reason = await res.json();
        alert(reason.error);
      } else {
        setProjects(prev => prev.filter(p => p._id !== deleteProject._id));
      }
      setDeleteProject(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    createdBy: '',
    members: [],
    numberOfSprints: '',
  });

  useEffect(() => {
    setMounted(true);
    const fetchProjects = async () => {
      const projects = await axios.get('http://localhost:5000/api/projects/user/' + session.user.id);
      setProjects(projects.data);
    }
    if (session)
      fetchProjects();
  }, [session]);

  useEffect(() => {
    if (session) {
      setForm(prev => ({
        ...prev, createdBy: session?.user?.id, members: [{ user: session?.user?.id, role: 'admin' }]
      }))
    }
  }, [session]);

  if (!mounted) return null;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Failed to create project');
      }

      const newProject = await res.json();
      // Update projects state with new project
      setProjects(prev => [...prev, newProject]);
      // Reset form and close modal
      setShowModal(false);
      setForm({
        name: '',
        description: '',
        createdBy: '',
        members: [{ user: '', role: 'viewer' }],
        numberOfSprints: '',
      });
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Please try again.');
    }
  };


  return (
    <div className='w-full h-full'>
      <div className='flex flex-col'>
        <h1 className={`text-4xl font-extrabold mb-8 tracking-tight`}>Projects</h1>
        <form className='flex flex-row justify-around items-center mb-4'>
          <input
            type='text'
            name='search_term'
            id="search_term"
            placeholder='Search a project'
            className='px-4 py-2 flex-2/3 rounded-md border border-gray-200 dark:border-zinc-800'
          />
          <ThemedButton type={'submit'} label={'Search'} className={''} />
        </form>
        <div className='grid grid-cols-3 gap-2 mt-4'>
          <button
            className='cursor-pointer flex flex-col items-center justify-center h-24 w-full rounded-md border-2 border-dashed border-gray-300 dark:border-zinc-700  hover:border-blue-500 hover:text-blue-500 transition-colors'
            onClick={() => setShowModal(true)}
            type="button"
          >
            <span className="text-2xl font-bold">+</span>
            <span className="text-sm">Create Project</span>
          </button>
          {/* Project Cards */}
          {projects.map((project, idx) => (
            <div
              key={idx}
              className='cursor-pointer h-24 w-full rounded-md border border-gray-200 relative dark:border-zinc-800 flex flex-col items-center justify-center text-lg font-medium p-2 z-20'
            >
              <Link href={`/app/projects/${project._id}`} className='flex flex-col items-center justify-center text-lg w-full h-full font-medium p-2 z-20'>
                <div>{project.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                  {(project.description && project.description.length > 150)
                    ? project.description.slice(0, 150) + '...'
                    : (project.description || 'No description')}
                </div>
              </Link>
              <div className="absolute top-2 right-2 z-50">
                <TrashIcon height={16} width={16} className='hover:text-red-600' onClick={(e) => handleDeleteModal(e, project)} />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-200/50 dark:bg-black/50">
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
                <label className="hidden mb-1 font-medium">Created By (User ID) *</label>
                <input
                  type="text"
                  name="createdBy"
                  disabled
                  required
                  value={form.createdBy}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border hidden border-gray-200 dark:border-zinc-700 rounded-md disabled:text-zinc-600"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Members</label>
                {form.members.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">

                    {member.role == 'admin'
                      ?
                      <>
                        <MemberSelector
                          admin={true}
                          member={member}
                          currentEmail={session?.user?.email}
                          index={idx}
                          onChange={handleMemberChange}
                          onRemove={removeMember}
                        />
                        <select
                          disabled
                          value={member.role}
                          onChange={e => handleMemberChange(idx, 'role', e.target.value)}
                          className="px-2 py-1 border border-gray-200 dark:border-zinc-700 rounded-md"
                        >
                          <option value="admin">admin</option>
                          <option value="editor">editor</option>
                          <option value="viewer">viewer</option>
                        </select></>

                      :
                      <>
                        <MemberSelector
                          admin={false}
                          member={member}
                          currentEmail={session?.user?.email}
                          index={idx}
                          onChange={handleMemberChange}
                          onRemove={removeMember}
                        />
                        <select
                          value={member.role}
                          onChange={e => handleMemberChange(idx, 'role', e.target.value)}
                          className="px-2 py-1 border border-gray-200 dark:border-zinc-700 rounded-md"
                        >
                          <option value="admin">admin</option>
                          <option value="editor">editor</option>
                          <option value="viewer">viewer</option>
                        </select>
                        {form.members.length > 1 && (
                      <button type="button" onClick={() => removeMember(idx)} className="text-red-600">Remove</button>
                    )}</>

                    }
                    
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
                  className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-700 rounded-md"
                  min={0}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="cursor-pointer px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700">Cancel</button>
                <ThemedButton type="submit" label="Create" className="cursor-pointer" />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-200/50 dark:bg-black/50">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-lg shadow-lg">
            <p>Are you sure you want to delete <b>{deleteProject.name}</b>?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setDeleteProject(null)}
                className="cursor-pointer px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700"
              >
                Cancel
              </button>
              <ThemedButton
                type="button"
                label="Delete"
                className="cursor-pointer"
                onClick={handleDeleteConfirm}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
