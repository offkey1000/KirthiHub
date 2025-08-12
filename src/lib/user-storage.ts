'use client';

// This file manages user data, acting as a mock database.
// It uses localStorage to persist data across browser sessions.

const USERS_STORAGE_KEY = 'jewelflow-users';

const initialUsers = [
  {
    id: 'USR001',
    name: 'Admin User',
    role: 'Admin',
    status: 'Active',
    code: '4243',
  },
];

type User = typeof initialUsers[0];

// Initialize users in localStorage if it's the first time
const initializeUsers = () => {
    if (typeof window !== 'undefined') {
        const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
        if (!storedUsers) {
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
        }
    }
};

// Call initialization when the module is loaded
initializeUsers();

export const getAllUsers = (): User[] => {
    if (typeof window === 'undefined') return initialUsers;
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
};

export const getUserById = (id: string): User | null => {
    const users = getAllUsers();
    return users.find(u => u.id === id) || null;
};

export const saveAllUsers = (users: User[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
};

export const addUser = (newUser: User) => {
    const users = getAllUsers();
    saveAllUsers([...users, newUser]);
};

export const updateUser = (updatedUser: User) => {
    const users = getAllUsers();
    const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    saveAllUsers(updatedUsers);
};

export const deleteUserById = (id: string) => {
    const users = getAllUsers();
    const updatedUsers = users.filter(u => u.id !== id);
    saveAllUsers(updatedUsers);
};
