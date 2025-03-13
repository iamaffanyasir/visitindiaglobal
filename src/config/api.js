// Get the base URL without /api suffix (for image paths)
export const getBaseUrl = () => {
  return process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
};

// Get the API URL (for API requests)
export const getApiUrl = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  return `${baseUrl}/api`;
};

// Get the full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  // imagePath already includes /uploads/ prefix from backend
  return `${getBaseUrl()}${imagePath}`;
};
