'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { TaskContext } from '@/contexts/TaskContext';

export default function TaskDetailLayout({ children }) {
    const { taskId } = useParams();

    return (
        <TaskContext.Provider value={{ taskId }}>
            <div className="flex w-full">
                <main className="flex-1">{children}</main>
            </div>
        </TaskContext.Provider>
    );
}
