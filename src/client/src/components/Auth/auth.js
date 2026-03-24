// Mock Authentication system using localStorage
// Completely decoupled from Firebase

class MockAuth {
  constructor() {
    console.log('--- NEW MOCK AUTH SYSTEM ACTIVE (DECOUPLED FROM FIREBASE) ---');
    this.currentUser = JSON.parse(localStorage.getItem('mock_user')) || null;
    this.listeners = [];
  }

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    this.listeners.push(callback);
    // Initial call
    setTimeout(() => callback(this.currentUser), 0);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  // Notify all listeners of auth state changes
  _notify() {
    this.listeners.forEach(callback => callback(this.currentUser));
  }

  _setCurrentUser(user) {
    this.currentUser = user;
    if (user) {
        localStorage.setItem('mock_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('mock_user');
    }
    this._notify();
  }
}

const authInstance = new MockAuth();

export const auth = authInstance;

// Simple local store for users to simulate registration
const getLocalUsers = () => JSON.parse(localStorage.getItem('mock_registered_users')) || {};
const saveLocalUsers = (users) => localStorage.setItem('mock_registered_users', JSON.stringify(users));

// Mock Auth Functions
export const signIn = (auth, email, password) => {
  console.log('--- SIGN IN ---', email);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getLocalUsers();
      if (users[email] && users[email].password === password) {
        const user = { email, uid: users[email].uid };
        auth._setCurrentUser(user);
        resolve({ user });
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 500);
  });
};

export const signUp = (auth, email, password) => {
  console.log('--- SIGN UP ---', email);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getLocalUsers();
      if (users[email]) {
        reject(new Error('Email already in use.'));
      } else {
        const user = { email, uid: 'mock-user-id-' + Date.now() };
        users[email] = { password, uid: user.uid };
        saveLocalUsers(users);
        auth._setCurrentUser(user);
        resolve({ user });
      }
    }, 500);
  });
};

export const signOut = (auth) => {
  console.log('--- SIGN OUT ---');
  return new Promise((resolve) => {
    setTimeout(() => {
      auth._setCurrentUser(null);
      resolve();
    }, 500);
  });
};
