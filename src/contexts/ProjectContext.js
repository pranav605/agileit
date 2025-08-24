'use client';
import { createContext, useContext } from 'react';

export const ProjectContext = createContext({ projectId: '', projectObj: {} });

export const useProject = () => useContext(ProjectContext);
