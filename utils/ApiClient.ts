import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface TokenResponse {
  access: string;
  refresh: string;
}

const getToken = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting ${key} from AsyncStorage`, error);
    return null;
  }
};

const saveTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.error('Error saving tokens to AsyncStorage', error);
  }
};

const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = await getToken('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response: AxiosResponse<TokenResponse> = await axios.post('/token/refresh/', {
      refresh: refreshToken,
    });
    const { access } = response.data;
    await saveTokens(access, refreshToken);
    return access;
  } catch (error) {
    console.error('Error refreshing access token', error);
    throw error;
  }
};

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = await getToken('accessToken');
    if (token && config.headers) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        if (originalRequest.headers) {
          originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Unable to refresh access token:', refreshError);
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
