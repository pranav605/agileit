'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProjectLayout({ children }) {
  const { projectId } = useParams();

  return (
    <div className="flex w-full">
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
