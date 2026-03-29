import axios from 'axios';

const baseURL = 'https://rucksplug-backend.onrender.com/api/v1';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token (to be integrated with Zustand later)
apiClient.interceptors.request.use((config) => {
  // Logic once Zustand store is ported
  return config;
});

export default apiClient;
