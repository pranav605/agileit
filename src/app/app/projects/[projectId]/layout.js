'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ProjectContext } from '@/contexts/ProjectContext';

export default function ProjectLayout({ children }) {
  const { projectId } = useParams();

  return (
    <ProjectContext.Provider value={{ projectId }}>
      <div className="flex w-full">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </ProjectContext.Provider>
  );
}
