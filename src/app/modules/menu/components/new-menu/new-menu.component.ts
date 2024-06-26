import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { MenuService } from '../../services/menu.service';
import { IconService } from '../../../../shared/services/icon.service';
import { UserRoleService } from '../../../user-role/services/user-role.service';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrl: './new-menu.component.scss'
})
export class NewMenuComponent extends BaseComponent implements OnInit{
  menuForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  icons: any[] = []
  menus: any[] = []
  userRoles: any[] = []
  parentVisible: boolean = true;
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private menuService:MenuService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private iconService: IconService,
    private userRoleService: UserRoleService) {
    super(spinner);
    
  }
  async ngOnInit(): Promise<void> {
    this.menuForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      routerLink: new FormControl(null),
      queue: new FormControl(null),
      icon: new FormControl(null),
      root: new FormControl(null),
      parent: new FormControl(null),
      userRoles: new FormControl([])
    });
    await this.getMenusForTreeNode();
    await this.getUserRoles();
    await this.getIcons();
  }

  get formControls(){
    return this.menuForm.controls;
  }

  async getMenusForTreeNode(){
    this.showSpinner();
    this.menus = await this.menuService.getMenusForTreeNode(()=> this.hideSpinner());
  }

  async getUserRoles(){
    this.showSpinner();
    this.userRoles = await this.userRoleService.getUserRoles(()=> this.hideSpinner());
  }

  async getIcons(){
    this.showSpinner();
    this.icons = await this.iconService.getIcons(()=> this.hideSpinner())
  }

  save(value){
    if(this.menuForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-menu',
      header: 'Transaction Confirmation',
      message: 'The menu is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          routerLink: value?.routerLink,
          queue: value?.queue,
          icon: value.icon !=null ? value.icon.code : null,
          root: value?.root,
          parent: value.parent != null ? {code: value.parent.key} : null,
          userRoles: value.userRoles.length>0 ? value.userRoles.map(x=> {return {code: x.code}}) : []
        }
        this.showSpinner();
        await this.menuService.saveMenu(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Menu has been saved successfully.'});
        this.router.navigate(['/menu-list'])
      }
  });
   
  }

  changeRoot(checked){
    if (checked) {
      this.parentVisible = false;
      this.menuForm.get('parent').reset();
    } else {
      this.parentVisible = true;

    }
  }

  goBack(){
    this.router.navigate(['/menu-list'])
  }
}
