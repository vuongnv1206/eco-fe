export interface RoleDto {
    id: string; 
    name: string; 
    description?: string; 
    permissions?: string[]; 
  }
  
  export interface CreateOrUpdateRoleRequest {
    id?: string; 
    name: string; 
    description?: string; 
  }
  
  export interface UpdateRolePermissionsRequest {
    roleId: string; 
    permissions: string[]; 
  }
  
  export interface RolePermissionDto {
    roleId?: string | undefined;
    permissions?: PermissionDto[] | undefined;
}

  export interface PermissionDto {
    type?: string | undefined;
    value?: string | undefined;
    displayName?: string | undefined;
    selected?: boolean;
}
