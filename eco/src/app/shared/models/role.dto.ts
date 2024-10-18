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
  