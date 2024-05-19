import createFeedbackPopup from '../functions/feedback';

export const storage = {
  setItem(key, value) {
    if (value === undefined) {
      createFeedbackPopup(
        `Attempted to store 'undefined' for key: ${key}`,
        'error',
      );

      return; // Prevent storing 'undefined'
    }
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key) {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      createFeedbackPopup(
        `Error parsing JSON from localStorage for key: ${key} -> ${error}`,
        'error',
      );
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
