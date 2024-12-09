import apiClient from './apiClient';

class ApiManager {
  static async login(username: string, password: string) {
    const response = await apiClient.post('/login/', { username: username, password: password });
    return response.data;
  }

  static async register(name: string, username: string, password: string) {
    const response = await apiClient.post('/register/', { name: name, username: username, password: password });
    return response.data;
  }

  static async getUserInfo() {
    const response = await apiClient.get('/user/info/');
    return response.data;
  }

  static async getUserFollows() {
    const response = await apiClient.get('/user/follows/');
    return response.data;
  }

  static async getUserNotifications() {
    const response = await apiClient.get('/user/notifications/');
    return response.data;
  }

  static async getUserCategories() {
    const response = await apiClient.get('/user/categories/');
    return response.data;
  }

  static async addFollow(targetUsername: string) {
    const response = await apiClient.post('/follow/add/', { username: targetUsername });
    return response.data;
  }

  static async delFollow(targetUsername: string) {
    const response = await apiClient.post('/follow/del/', { username: targetUsername });
    return response.data;
  }

  static async addCategory(name: string, content: string) {
    const response = await apiClient.post('/category/add/', { name: name, content: content });
    return response.data;
  }

  static async modCategory(id: number, name: string, content: string) {
    const response = await apiClient.post('/category/mod/', { id: id, name: name, content: content });
    return response.data;
  }
}

export default ApiManager;
