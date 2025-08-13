
'use server';

import 'dotenv/config';
import { db } from './db';
import { jobs, NewJob, Job } from './schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// This is a placeholder for a real seeding mechanism
async function seedInitialJobs() {
    try {
        const existingJobs = await db.select().from(jobs);
        if (existingJobs.length === 0) {
            console.log('Seeding initial jobs...');
            // Add any initial jobs you need for testing here
            // const initialJobsData: NewJob[] = [];
            // if (initialJobsData.length > 0) {
            //   await db.insert(jobs).values(initialJobsData);
            // }
        }
    } catch (error) {
        // This might happen if the table doesn't exist yet during the first build.
        console.warn('Could not seed jobs, this might be okay on first run:', error);
    }
}

seedInitialJobs();

export const getAllJobs = async (): Promise<Job[]> => {
    try {
        return await db.select().from(jobs);
    } catch (e) {
        console.error("Failed to fetch jobs", e);
        return [];
    }
};

export const getJobById = async (id: string): Promise<Job | null> => {
    try {
        const result = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
        return result[0] || null;
    } catch (e) {
        console.error(`Failed to fetch job ${id}`, e);
        return null;
    }
};

export const addJob = async (newJob: NewJob) => {
    await db.insert(jobs).values(newJob);
    revalidatePath('/dashboard/jobs');
    revalidatePath('/dashboard');
};

export const updateJob = async (updatedJob: Job) => {
    if (!updatedJob.id) {
        throw new Error('Job ID is required for updates');
    }
    await db.update(jobs).set(updatedJob).where(eq(jobs.id, updatedJob.id));
    revalidatePath(`/dashboard/jobs/${updatedJob.id}`);
    revalidatePath('/dashboard/jobs');
    revalidatePath('/dashboard/my-jobs');
    revalidatePath('/dashboard');
};
