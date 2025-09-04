'use client';
import { createContext, useContext } from 'react';

export const TaskContext = createContext({ taskId: '', taskObj: {} });

export const useTask = () => useContext(TaskContext);
