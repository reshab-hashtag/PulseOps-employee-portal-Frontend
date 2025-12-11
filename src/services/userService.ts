import api from "./api";
import type { User, UserFilters } from "../types/user.types";

export const userService = {
  getAll: async (params?: UserFilters) => {
    const response = await api.get<User[]>("/users", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  create: async (data: Omit<User, "id">) => {
    const response = await api.post<User>("/users", data);
    return response.data;
  },

  update: async (id: string, data: Partial<User>) => {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
