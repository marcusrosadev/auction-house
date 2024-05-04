export const storage = {
  setItem(key, value) {
    if (value === undefined) {
      console.error(`Attempted to store 'undefined' for key: ${key}`);
      return; // Prevent storing 'undefined'
    }
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key) {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(`Error parsing JSON from localStorage for key: ${key}`, e);
      return null;
    }
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
