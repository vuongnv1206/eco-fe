import { Component, OnDestroy,EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { RoleStore } from '../../../shared/stores/identity/role.store';
import { PermissionDto, RoleDto, RolePermissionDto, UpdateRolePermissionsRequest } from '../../../shared/models/role.dto';

@Component({
  selector: 'app-permission-grant',
  templateUrl: './permission-grant.component.html',
})
export class PermissionGrantComponent implements OnInit, OnDestroy{
  private ngUnsubscribe = new Subject<void>();

  // Default
  public blockedPanelDetail: boolean = false;
  public form: FormGroup;
  public title: string;
  public btnDisabled = false;
  public saveBtnName: string;
  public closeBtnName: string;
  public rolePermission: RolePermissionDto;
  public permissions: PermissionDto[] = [];
  public selectedPermissions: string[] = [];
  formSavedEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private roleStore: RoleStore,
    private fb: FormBuilder
  ) {}

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.buildForm();
    this.loadDetail(this.config.data.id);
    this.saveBtnName = 'Cập nhật';
    this.closeBtnName = 'Hủy';
  }

  loadDetail(roleId: string) {
    this.toggleBlockUI(true);
    this.roleStore
      .getRoleWithPermissions(roleId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response: RolePermissionDto) => {
          this.rolePermission = response;
          this.permissions = response.permissions;

          this.buildForm();
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }
  saveChange() {
    this.toggleBlockUI(true);
    this.saveData();
  }

  private saveData() {
    var permissionUpdates: PermissionDto[] = [];
    for (let index = 0; index < this.permissions.length; index++) {
      const selected =
        this.selectedPermissions.filter(x => x == this.permissions[index].displayName).length > 0;
      if (selected) {
        permissionUpdates.push({
          displayName : this.permissions[index].displayName,
          selected : selected,
          type : this.permissions[index].type,
          value : this.permissions[index].value
        });
      }
    };
    var updateValues: UpdateRolePermissionsRequest = {
      roleId: this.rolePermission.roleId,
      permissions: permissionUpdates.map(p => p.value) // Chỉ lấy value (danh sách các string)
    };
    this.roleStore
      .updateRolePermissions(this.rolePermission.roleId,updateValues)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.toggleBlockUI(false);
        this.ref.close(this.form.value);
      });
  }

  buildForm() {
    this.form = this.fb.group({});
    //Fill value
    this.permissions.forEach(element => {
      if (element.selected) {
        this.selectedPermissions.push(element.displayName);
      }
    });
  }

  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.btnDisabled = true;
      this.blockedPanelDetail = true;
    } else {
      setTimeout(() => {
        this.btnDisabled = false;
        this.blockedPanelDetail = false;
      }, 1000);
    }
  }
}
