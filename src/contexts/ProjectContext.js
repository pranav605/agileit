'use client';
import { createContext, useContext } from 'react';

export const ProjectContext = createContext({ projectId: '' });

export const useProject = () => useContext(ProjectContext);
