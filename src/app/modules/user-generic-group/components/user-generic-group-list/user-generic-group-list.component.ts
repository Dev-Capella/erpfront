import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserGenericGroupService } from '../../services/user-generic-group.service';
import { BreadcrumbService } from '../../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-user-generic-group-list',
  templateUrl: './user-generic-group-list.component.html',
  styleUrl: './user-generic-group-list.component.scss'
})
export class UserGenericGroupListComponent extends BaseComponent implements OnInit {
  selectedUserGenericGroup: any = null;
  userGenericGroupList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private userGenericGroupService: UserGenericGroupService,
    private breadcrumbService: BreadcrumbService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {label: 'User Generic Group Listesi', routerLink: ['/user-generic-group-list']}
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getUserGenericGroupList();
    this.userGenericGroupService.isRefreshList.subscribe(async (result) =>{
      if(result){
        await this.getUserGenericGroupList();
        this.userGenericGroupService.isRefreshList.next(false);
      }
    });

    this.userGenericGroupService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedUserGenericGroup = null;
      }
    });
  }

  async getUserGenericGroupList(){
    this.showSpinner();
    this.userGenericGroupList = await this.userGenericGroupService.getUserGenericGroups(()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.userGenericGroupService.keepRight.next(true);
    this.showSpinner();
    var data = await this.userGenericGroupService.getUserGenericGroupByCode(event.data.code,()=>this.hideSpinner());
    this.userGenericGroupService.selectedData.next(data);
  }

  onRowUnselect(){
    this.userGenericGroupService.keepRight.next(false);
    this.userGenericGroupService.selectedData.next(null);
  }
}
