import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleService } from '../../services/identity/role.service';
import { CreateOrUpdateRoleRequest, RoleDto, UpdateRolePermissionsRequest } from '../../models/role.dto';

@Injectable({
  providedIn: 'root',
})
export class RoleStore {
  private rolesSubject = new BehaviorSubject<RoleDto[]>([]);

  constructor(private roleService: RoleService) {}

  getRoleById(id: string): Observable<RoleDto> {
    return this.roleService.getByIdAsync(id); // Sửa tên phương thức cho khớp với RoleService
  }

  getRoleWithPermissions(id: string): Observable<RoleDto> {
    return this.roleService.getByIdWithPermissionsAsync(id); // Sửa tên phương thức cho khớp
  }

  updateRolePermissions(id: string, request: UpdateRolePermissionsRequest): Observable<string> {
    return this.roleService.updatePermissionsAsync(request); // Sửa tên phương thức cho khớp
  }

  createOrUpdateRole(request: CreateOrUpdateRoleRequest): Observable<string> {
    return this.roleService.createOrUpdateRoleAsync(request); // Sửa tên phương thức cho khớp
  }

  deleteRole(id: string): Observable<string> {
    return this.roleService.deleteAsync(id); // Sửa tên phương thức cho khớp
  }
}
