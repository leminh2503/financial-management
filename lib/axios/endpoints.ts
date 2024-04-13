import http from './http';
import {
  DataResponse,
  SigninModel,
  UserModel,
  UserRegisterOrUpdateModel,
} from './model';

class ApiService {
  signup(data: UserRegisterOrUpdateModel) {
    return http.post<UserModel>('/v1/signup', data);
  }

  signin(data: SigninModel) {
    return http.post<DataResponse<{ token: string; user: UserModel }>>(
      '/api/Auth/login',
      data
    );
  }

  updateUser(data: UserRegisterOrUpdateModel) {
    return http.post<UserModel>('/v1/user/update', data);
  }

  getUsers() {
    return http.get<DataResponse<UserModel[]>>('/api/User');
  }

  deleteUser(id?: number) {
    return http.delete<DataResponse<UserModel>>(`/api/User/${id}`);
  }

  postUser(data: UserModel) {
    return http.post<DataResponse<UserModel>>('/api/User', data);
  }

  patchUser(data: UserModel) {
    return http.patch<DataResponse<UserModel>>(
      `/api/User/${data.userId}`,
      data
    );
  }

  getUserById(id?: number) {
    return http.get<DataResponse<UserModel[]>>(`/api/User/${id}`);
  }
}

export default new ApiService();
