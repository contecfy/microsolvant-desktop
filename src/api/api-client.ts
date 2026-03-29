import axios from 'axios';

const baseURL = 'https://rucksplug-backend.onrender.com/api/v1';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token and active company ID to requests
apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('auth_token');
  const activeCompanyId = localStorage.getItem('active_company_id');

  if (token) {
    // Remove quotes if any (Zustand persist sometimes adds them)
    config.headers.Authorization = `Bearer ${token.replace(/^["']|["']$/g, "").trim()}`;
  }

  if (activeCompanyId) {
    config.headers['x-company-id'] = activeCompanyId.replace(/^["']|["']$/g, "").trim();
  }

  return config;
});

export default apiClient;
