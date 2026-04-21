const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error;
  }
}
export interface FAQ {
  id: number;
  question: string;
  questionSi: string;
  answer: string;
  answerSi: string;
  category: string;
}
export const faqAPI = {
  getAll: async (): Promise<FAQ[]> => {
    const response = await fetchAPI<FAQ[]>('/faqs');
    return response.data;
  },
  search: async (query: string, language: 'en' | 'si' = 'en'): Promise<FAQ[]> => {
    const response = await fetchAPI<FAQ[]>(`/faqs/search?q=${encodeURIComponent(query)}&lang=${language}`);
    return response.data;
  },
  getByCategory: async (category: string): Promise<FAQ[]> => {
    const response = await fetchAPI<FAQ[]>(`/faqs/category/${encodeURIComponent(category)}`);
    return response.data;
  },
};
export interface ForumDiscussion {
  id: number;
  title: string;
  author: string;
  category: string;
  timeAgo: string;
  preview: string;
  replies: number;
  likes: number;
}
export const forumAPI = {
  getDiscussions: async (category?: string): Promise<ForumDiscussion[]> => {
    const url = category ? `/forum/discussions?category=${encodeURIComponent(category)}` : '/forum/discussions';
    const response = await fetchAPI<ForumDiscussion[]>(url);
    return response.data;
  },
  getDiscussion: async (id: number): Promise<ForumDiscussion> => {
    const response = await fetchAPI<ForumDiscussion>(`/forum/discussions/${id}`);
    return response.data;
  },
};
export interface Article {
  id: number;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  author?: string;
  publishedDate?: string;
  content?: string;
}
export const articlesAPI = {
  getAll: async (category?: string): Promise<Article[]> => {
    const url = category ? `/articles?category=${encodeURIComponent(category)}` : '/articles';
    const response = await fetchAPI<Article[]>(url);
    return response.data;
  },
  getById: async (id: number): Promise<Article> => {
    const response = await fetchAPI<Article>(`/articles/${id}`);
    return response.data;
  },
};
export interface Consultant {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  image: string;
  available: boolean;
  languages?: string[];
  rating?: number;
  consultationFee?: string;
}
export interface ConsultationBooking {
  name: string;
  email: string;
  phone: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  childAge: string;
  concern: string;
}
export const consultantsAPI = {
  getAll: async (availableOnly: boolean = false): Promise<Consultant[]> => {
    const url = availableOnly ? '/consultants?available=true' : '/consultants';
    const response = await fetchAPI<Consultant[]>(url);
    return response.data;
  },
  getById: async (id: number): Promise<Consultant> => {
    const response = await fetchAPI<Consultant>(`/consultants/${id}`);
    return response.data;
  },
  bookConsultation: async (booking: ConsultationBooking): Promise<any> => {
    return await fetchAPI('/consultations/book', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  },
};
export const learningAPI = {
  getCategories: async (): Promise<string[]> => {
    const response = await fetchAPI<string[]>('/learning/categories');
    return response.data;
  },
};
export interface Milestone {
  age: string;
  title: string;
  category: string;
  description?: string;
  achieved?: boolean;
}
export const trackerAPI = {
  getMilestones: async (): Promise<Milestone[]> => {
    const response = await fetchAPI<Milestone[]>('/tracker/milestones');
    return response.data;
  },
};
export const healthAPI = {
  check: async (): Promise<any> => {
    const response = await fetchAPI<any>('/health');
    return response.data;
  },
};
export default {
  faqs: faqAPI,
  forum: forumAPI,
  articles: articlesAPI,
  consultants: consultantsAPI,
  learning: learningAPI,
  tracker: trackerAPI,
  health: healthAPI,
};