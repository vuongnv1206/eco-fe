import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleDto, CreateOrUpdateRoleRequest, UpdateRolePermissionsRequest } from '../../models/role.dto';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private basePath = '/roles'; // Đường dẫn cơ sở cho các API của vai trò

  constructor(private apiService: ApiService) {}

  // Lấy danh sách tất cả vai trò
  getListAsync(): Observable<RoleDto[]> {
    return this.apiService.get<RoleDto[]>(this.basePath);
  }

  // Lấy thông tin chi tiết vai trò theo ID
  getByIdAsync(id: string): Observable<RoleDto> {
    return this.apiService.get<RoleDto>(`${this.basePath}/${id}`);
  }

  // Lấy thông tin chi tiết vai trò với quyền theo ID
  getByIdWithPermissionsAsync(id: string): Observable<RoleDto> {
    return this.apiService.get<RoleDto>(`${this.basePath}/${id}/permissions`);
  }

  // Cập nhật quyền cho vai trò
  updatePermissionsAsync(request: UpdateRolePermissionsRequest): Observable<string> {
    return this.apiService.put<string>(`${this.basePath}/${request.roleId}/permissions`, request);
  }

  // Tạo hoặc cập nhật vai trò
  createOrUpdateRoleAsync(request: CreateOrUpdateRoleRequest): Observable<string> {
    return this.apiService.post<string>(`${this.basePath}/create/update`, request);
  }

  // Xóa vai trò
  deleteAsync(id: string): Observable<string> {
    return this.apiService.delete<string>(`${this.basePath}/role/${id}`);
  }
}
