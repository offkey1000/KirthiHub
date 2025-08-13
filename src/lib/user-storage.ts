
'use server';

import 'dotenv/config';
import { db } from './db';
import { users, NewUser, User } from './schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

async function seedInitialUser() {
  try {
    const allUsers = await db.select().from(users);
    const adminUserExists = allUsers.some(u => u.role === 'Admin');

    if (!adminUserExists) {
        console.log('Seeding initial admin user...');
        await db.insert(users).values({
            id: 'USR001',
            name: 'Admin User',
            role: 'Admin',
            status: 'Active',
            code: '4243',
        });
    }
  } catch (error) {
      // This might happen if the table doesn't exist yet during the first build.
      console.warn("Could not seed admin user, this might be okay on first run:", error)
  }
}

seedInitialUser();

export const getAllUsers = async (): Promise<User[]> => {
    try {
        return await db.select().from(users);
    } catch(e) {
        console.error("Failed to fetch users", e);
        return [];
    }
};

export const getUserById = async (id: string): Promise<User | null> => {
    try {
        const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return result[0] || null;
    } catch(e) {
        console.error(`Failed to fetch user ${id}`, e);
        return null;
    }
};

export const getUserByCode = async (code: string): Promise<User | null> => {
    try {
        const result = await db.select().from(users).where(eq(users.code, code)).limit(1);
        return result[0] || null;
    } catch (e) {
        console.error("Failed to fetch user by code", e);
        return null;
    }
}

export const addUser = async (newUser: NewUser) => {
    await db.insert(users).values(newUser);
    revalidatePath('/dashboard/users');
};

export const updateUser = async (updatedUser: User) => {
    if (!updatedUser.id) {
        throw new Error('User ID is required for updates');
    }
    await db.update(users).set(updatedUser).where(eq(users.id, updatedUser.id));
    revalidatePath('/dashboard/users');
    revalidatePath(`/dashboard/users/${updatedUser.id}`);
};

export const deleteUserById = async (id: string) => {
    await db.delete(users).where(eq(users.id, id));
    revalidatePath('/dashboard/users');
};
