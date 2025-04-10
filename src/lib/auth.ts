
import { User } from "@/types";

// Mock user database
const USERS_KEY = "crop-yield-users";
const CURRENT_USER_KEY = "crop-yield-current-user";

// Initialize users in localStorage if not exists
const initUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
};

// Retrieve users from localStorage
export const getUsers = (): User[] => {
  initUsers();
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Register a new user
export const registerUser = (email: string, password: string, name: string): User | null => {
  const users = getUsers();
  
  // Check if email already exists
  if (users.some(user => user.email === email)) {
    return null;
  }
  
  // Create new user
  const newUser: User = {
    id: crypto.randomUUID(),
    email,
    name
  };
  
  // Store user in localStorage
  const updatedUsers = [...users, { ...newUser, password }];
  saveUsers(updatedUsers);
  
  // Return user without password
  return newUser;
};

// Login user
export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  
  // Find user with matching email and password
  const user = users.find(user => user.email === email && (user as any).password === password);
  
  if (user) {
    // Store current user in localStorage
    const currentUser = { id: user.id, email: user.email, name: user.name };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    return currentUser;
  }
  
  return null;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Get current user
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};
