'use client';

// This file manages job data, acting as a mock database.
// It uses localStorage to persist data across browser sessions.

const JOBS_STORAGE_KEY = 'jewelflow-jobs';

const initialJobs: any[] = [];

type Job = {
  id: string;
  title: string;
  orderType: string;
  customerOrderNumber?: string;
  urgency: 'High' | 'Medium' | 'Low';
  budget: number;
  ornamentType: string;
  goldWeight: number;
  diamondWeight: number;
  stoneWeight: number;
  description: string;
  images: string[];
  status: string;
  stage: 'Pending' | 'WIP' | 'Completed';
  history: { user: string; action: string; timestamp: string }[];
  assignedTo: string | null;
};

// Initialize jobs in localStorage if it's the first time
const initializeJobs = () => {
    if (typeof window !== 'undefined') {
        const storedJobs = localStorage.getItem(JOBS_STORAGE_KEY);
        if (!storedJobs) {
            localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(initialJobs));
        }
    }
};

// Call initialization when the module is loaded
initializeJobs();


export const getAllJobs = (): Job[] => {
    if (typeof window === 'undefined') return [];
    const storedJobs = localStorage.getItem(JOBS_STORAGE_KEY);
    return storedJobs ? JSON.parse(storedJobs) : [];
};

export const getJobById = (id: string): Job | null => {
    const jobs = getAllJobs();
    return jobs.find(j => j.id === id) || null;
};

export const saveAllJobs = (jobs: Job[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    }
};

export const addJob = (newJob: Job) => {
    const jobs = getAllJobs();
    saveAllJobs([...jobs, newJob]);
};

export const updateJob = (updatedJob: Job) => {
    const jobs = getAllJobs();
    const updatedJobs = jobs.map(j => j.id === updatedJob.id ? updatedJob : j);
    saveAllJobs(updatedJobs);
};
