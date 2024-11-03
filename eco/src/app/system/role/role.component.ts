
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleDto } from '../../shared/models/role.dto';
import { RoleStore } from '../../shared/stores/identity/role.store';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from '../../shared/services/notification.service';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants } from '../../shared/constants/message.const';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { PermissionGrantComponent } from './permission-grant/permission-grant.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnInit, OnDestroy {
  //System variables
  private ngUnsubscribe = new Subject<void>();
  public blockedPanel: boolean = false;


  //Business variables
  public items: RoleDto[];
  public selectedItems: RoleDto[] = [];
  public keyword: string = '';

  constructor(
    private roleStore: RoleStore,
    public dialogService: DialogService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(selectionId = null) {
    this.toggleBlockUI(true);

    this.roleStore
    .getRoles()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          this.items = response;
          this.toggleBlockUI(false);
        },
        error: () => {
          this.toggleBlockUI(false);
        },
      });
  }

  showAddModal() {
    const ref = this.dialogService.open(RoleDetailComponent, {
      header: 'Thêm mới quyền',
      width: '70%',
    });

    ref.onClose.subscribe((data: RoleDto) => {
      if (data) {
        this.notificationService.showSuccess(MessageConstants.CREATED_OK_MSG);
        this.selectedItems = [];
        this.loadData();
      }
    });
  }

  showEditModal() {
    if (this.selectedItems.length == 0) {
      this.notificationService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD);
      return;
    }
    var id = this.selectedItems[0].id;
    
    const ref = this.dialogService.open(RoleDetailComponent, {
      data: {
        id: id,
      },
      header: 'Cập nhật quyền',
      width: '70%',
    });

    ref.onClose.subscribe((data: RoleDto) => {
      if (data) {
        this.notificationService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.selectedItems = [];
        this.loadData(data.id);
      }
    });
  }

  showPermissionModal(id: string, name: string) {
    const ref = this.dialogService.open(PermissionGrantComponent, {
      data: {
        id: id,
        name: name,
      },
      header: name,
      width: '70%',
    });

    ref.onClose.subscribe((data: RoleDto) => {
      if (data) {
        this.notificationService.showSuccess(MessageConstants.UPDATED_OK_MSG);
        this.selectedItems = [];
        this.loadData(data.id);
      }
    });
  }

  deleteItems() {
    if (this.selectedItems.length === 0) {
      this.notificationService.showError(MessageConstants.NOT_CHOOSE_ANY_RECORD);
      return;
    }
  
    this.confirmationService.confirm({
      message: MessageConstants.CONFIRM_DELETE_MSG,
      accept: () => {
        const ids = this.selectedItems.map(item => item.id); 
        this.deleteItemsConfirm(ids);
      },
    });
  }
  
  deleteItemsConfirm(ids: string[]) {
    this.toggleBlockUI(true);

    const deleteObservables = ids.map(id => this.roleStore.deleteRole(id));

    // Sử dụng forkJoin để thực hiện xóa đồng thời
    forkJoin(deleteObservables).subscribe({
        next: () => {
            this.notificationService.showSuccess(MessageConstants.DELETED_OK_MSG);
            this.loadData();
            this.selectedItems = [];
        },
        error: (err) => {
            this.notificationService.showError(`Xóa thất bại: ${err}`);
          },
        complete: () => {
            this.toggleBlockUI(false);
        }
    });
}
  private toggleBlockUI(enabled: boolean) {
    if (enabled == true) {
      this.blockedPanel = true;
    } else {
      setTimeout(() => {
        this.blockedPanel = false;
      }, 1000);
    }
  }
}
