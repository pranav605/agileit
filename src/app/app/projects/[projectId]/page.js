'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
        setProject(res.data); // If your backend returns an array, use res.data[0]
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) return <p className="p-4 text-gray-500">Loading project...</p>;
  if (!project) return <p className="p-4 text-red-500">Project not found.</p>;

  return (
    <div className="w-full h-full">
      <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
      <p className="text-lg text-gray-700">{project.description}</p>
      {/* Add more project fields here if needed */}
    </div>
  );
}
