'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function ProjectLayout({ children }) {
  const { projectId } = useParams();
  const [projectObj, setProjectObj] = useState({});
  const { data:session, status} = useSession();

  useEffect(()=>{
    async function fetchProject(){
      const res = await axios.get('http://localhost:5000/api/projects/'+projectId);
      setProjectObj(res.data);
    }
    if(session)
    fetchProject();
  },[session])

  return (
    <ProjectContext.Provider value={{ projectId , projectObj}}>
      <div className="flex w-full">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </ProjectContext.Provider>
  );
}
