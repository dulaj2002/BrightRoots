import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export interface User {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  role: 'parent' | 'consultant' | 'admin';
  status: string;
  specialization?: string;
  experience_years?: number;
  bio?: string;
  created_at?: string;
}
export interface Question {
  id: number;
  parent_id: number;
  parent_name?: string;
  parent_email?: string;
  consultant_id?: number;
  consultant_name?: string;
  title: string;
  question_text: string;
  category?: string;
  answer_text?: string;
  answered_at?: string;
  status: 'pending' | 'answered' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at?: string;
  updated_at?: string;
}
export const authAPI = {
  signup: async (userData: {
    email: string;
    password: string;
    full_name: string;
    role: string;
    phone?: string;
    specialization?: string;
    experience_years?: number;
    bio?: string;
  }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: async (): Promise<User> => {
    const response = await axios.get(`${API_BASE_URL}/auth/me`);
    return response.data.user;
  },
  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};
export const questionsAPI = {
  createQuestion: async (questionData: {
    title: string;
    question_text: string;
    category?: string;
    priority?: string;
  }): Promise<Question> => {
    const response = await axios.post(`${API_BASE_URL}/questions`, questionData);
    return response.data.question;
  },
  getMyQuestions: async (): Promise<Question[]> => {
    const response = await axios.get(`${API_BASE_URL}/questions/my-questions`);
    return response.data.data;
  },
  getPendingQuestions: async (): Promise<Question[]> => {
    const response = await axios.get(`${API_BASE_URL}/questions/pending`);
    return response.data.data;
  },
  getAllQuestions: async (status: string = 'all'): Promise<Question[]> => {
    const response = await axios.get(`${API_BASE_URL}/questions/all`, {
      params: { status },
    });
    return response.data.data;
  },
  getQuestion: async (id: number): Promise<Question> => {
    const response = await axios.get(`${API_BASE_URL}/questions/${id}`);
    return response.data.question;
  },
  answerQuestion: async (
    questionId: number,
    answerText: string
  ): Promise<Question> => {
    const response = await axios.post(
      `${API_BASE_URL}/questions/${questionId}/answer`,
      { answer_text: answerText }
    );
    return response.data.question;
  },
  updateQuestion: async (
    questionId: number,
    questionData: {
      title?: string;
      question_text?: string;
      category?: string;
      priority?: string;
    }
  ): Promise<Question> => {
    const response = await axios.put(
      `${API_BASE_URL}/questions/${questionId}`,
      questionData
    );
    return response.data.question;
  },
  deleteQuestion: async (questionId: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/questions/${questionId}`);
  },
  updateAnswer: async (
    questionId: number,
    answerText: string
  ): Promise<Question> => {
    const response = await axios.put(
      `${API_BASE_URL}/questions/${questionId}/answer`,
      { answer_text: answerText }
    );
    return response.data.question;
  },
};
export const adminAPI = {
  getAllUsers: async (role: string = 'all'): Promise<User[]> => {
    const response = await axios.get(`${API_BASE_URL}/admin/users`, {
      params: { role },
    });
    return response.data.data;
  },
  updateUserStatus: async (userId: number, status: string): Promise<User> => {
    const response = await axios.put(
      `${API_BASE_URL}/admin/users/${userId}/status`,
      { status }
    );
    return response.data.user;
  },
  deleteUser: async (userId: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/admin/users/${userId}`);
  },
  deleteQuestion: async (questionId: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/admin/questions/${questionId}`);
  },
  getStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/stats`);
    return response.data.stats;
  },
};