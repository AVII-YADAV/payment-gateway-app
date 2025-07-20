import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
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

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post('/api/v1/auth/refresh-token', {
            refreshToken,
          });
          
          const { accessToken } = response.data.data;
          localStorage.setItem('token', accessToken);
          
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.data?.error?.message) {
      toast.error(error.response.data.error.message);
    } else if (error.message) {
      toast.error(error.message);
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role?: string;
  }) => api.post('/auth/register', userData),
  
  logout: () => api.post('/auth/logout'),
  
  getProfile: () => api.get('/auth/profile'),
  
  updateProfile: (data: any) => api.put('/users/profile', data),
  
  refreshToken: () => api.post('/auth/refresh-token'),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
  
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { currentPassword, newPassword }),
  
  verifyEmail: (token: string) =>
    api.post('/auth/verify-email', { token }),
  
  resendVerification: () => api.post('/auth/resend-verification'),
};

// Payments API
export const paymentsAPI = {
  createPayment: (data: any) => api.post('/payments/create', data),
  
  processPayment: (data: any) => api.post('/payments/process', data),
  
  getPaymentStatus: (orderId: string) =>
    api.get(`/payments/status/${orderId}`),
  
  createRefund: (data: any) => api.post('/payments/refund', data),
  
  getRefundStatus: (refundId: string) =>
    api.get(`/payments/refund/${refundId}`),
  
  createPaymentLink: (data: any) => api.post('/payments/link', data),
  
  getPaymentLink: (linkId: string) =>
    api.get(`/payments/link/${linkId}`),
  
  createQRCode: (data: any) => api.post('/payments/qr', data),
  
  getQRCode: (qrId: string) => api.get(`/payments/qr/${qrId}`),
  
  getMerchantPayments: (merchantId: string, params?: any) =>
    api.get(`/payments/merchant/${merchantId}`, { params }),
  
  simulatePayment: (data: any) => api.post('/payments/simulate', data),
};

// Transactions API
export const transactionsAPI = {
  getTransactions: (params?: any) =>
    api.get('/transactions', { params }),
  
  getTransaction: (transactionId: string) =>
    api.get(`/transactions/${transactionId}`),
};

// Merchants API
export const merchantsAPI = {
  register: (data: any) => api.post('/merchants/register', data),
  
  getProfile: () => api.get('/merchants/profile'),
  
  updateProfile: (data: any) => api.put('/merchants/profile', data),
  
  submitKYC: (data: any) => api.post('/merchants/kyc', data),
  
  getKYCStatus: () => api.get('/merchants/kyc/status'),
  
  getStats: () => api.get('/merchants/stats'),
};

// Webhooks API
export const webhooksAPI = {
  createWebhook: (data: any) => api.post('/webhooks', data),
  
  getWebhooks: () => api.get('/webhooks'),
  
  updateWebhook: (webhookId: string, data: any) =>
    api.put(`/webhooks/${webhookId}`, data),
  
  deleteWebhook: (webhookId: string) =>
    api.delete(`/webhooks/${webhookId}`),
  
  testWebhook: (webhookId: string) =>
    api.post(`/webhooks/test/${webhookId}`),
};

// Analytics API
export const analyticsAPI = {
  getOverview: () => api.get('/analytics/overview'),
  
  getTransactionAnalytics: (params?: any) =>
    api.get('/analytics/transactions', { params }),
  
  getRevenueAnalytics: (params?: any) =>
    api.get('/analytics/revenue', { params }),
  
  getPaymentMethodAnalytics: (params?: any) =>
    api.get('/analytics/payment-methods', { params }),
  
  getRefundAnalytics: (params?: any) =>
    api.get('/analytics/refunds', { params }),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  
  getUsers: (params?: any) => api.get('/admin/users', { params }),
  
  updateUser: (userId: string, data: any) =>
    api.put(`/admin/users/${userId}`, data),
  
  getMerchants: (params?: any) => api.get('/admin/merchants', { params }),
  
  updateKYCStatus: (merchantId: string, data: any) =>
    api.put(`/admin/kyc/${merchantId}`, data),
  
  getDisputes: (params?: any) => api.get('/admin/disputes', { params }),
  
  updateDisputeStatus: (disputeId: string, data: any) =>
    api.put(`/admin/disputes/${disputeId}`, data),
  
  getAuditLogs: (params?: any) => api.get('/admin/logs', { params }),
};

// Users API
export const usersAPI = {
  getSettings: () => api.get('/users/settings'),
  
  updateSettings: (data: any) => api.put('/users/settings', data),
  
  getNotifications: () => api.get('/users/notifications'),
  
  markNotificationRead: (notificationId: string) =>
    api.put(`/users/notifications/${notificationId}/read`),
  
  markAllNotificationsRead: () =>
    api.put('/users/notifications/read-all'),
  
  getUserTransactions: () => api.get('/users/transactions'),
};

export default api; 