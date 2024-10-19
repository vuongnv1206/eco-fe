
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleDto } from '../../shared/models/role.dto';
import { RoleStore } from '../../shared/stores/identity/role.store';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from '../../shared/services/notification.service';
import { ConfirmationService } from 'primeng/api';
import { MessageConstants } from '../../shared/constants/message.const';

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
  
    // Thực hiện xóa tuần tự cho từng vai trò (nếu không muốn tuần tự có thể dùng switchMap hoặc concatMap)
    deleteObservables.forEach((observable, index) => {
      observable.subscribe({
        next: () => {
          this.notificationService.showSuccess(`${MessageConstants.DELETED_OK_MSG} (Vai trò ID: ${ids[index]})`);
          this.loadData();
          this.selectedItems = [];
        },
        error: () => {
          this.notificationService.showError(`Xóa thất bại cho vai trò ID: ${ids[index]}`);
        },
        complete: () => {
          if (index === deleteObservables.length - 1) {
            this.toggleBlockUI(false);
          }
        }
      });
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
