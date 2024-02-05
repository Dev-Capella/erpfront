import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { MenuService } from '../../services/menu.service';
import { IconService } from '../../../../shared/services/icon.service';
import { UserRoleService } from '../../../user-role/services/user-role.service';

@Component({
  selector: 'app-detail-menu',
  templateUrl: './detail-menu.component.html',
  styleUrl: './detail-menu.component.scss'
})
export class DetailMenuComponent extends BaseComponent implements OnInit {
  menuForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  icons: any[] = []
  menus: any[] = []
  userRoles: any[] = []
  parentVisible: boolean = true;
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private menuService:MenuService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private iconService: IconService,
    private userRoleService: UserRoleService,
    private route: ActivatedRoute) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
    
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
    await this.getMenuByCode();
  }

  get formControls(){
    return this.menuForm.controls;
  }

  async getMenuByCode(){
    this.showSpinner();
    var result = await this.menuService.getMenuByCode(this.code, ()=> this.hideSpinner());
    this.menuForm.patchValue({
      id: result.id,
      code: result.code,
      shortText: result.shortText,
      longText: result.longText,
      searchText: result.searchText,
      routerLink: result.routerLink,
      queue: result.queue,
      icon: this.icons.find(x=> x.code==result.icon),
      root: result.root,
      parent: result.parent ? this.findItemByCode(this.menus, result.parent.code) : null,
      userRoles: this.userRoles.filter(userRole => result.userRoles?.map(userRole => userRole.code).includes(userRole.code))
    })
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
    this.changeRoot(result.root)
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
          id: value?.id,
          code: value?.code,
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

  findItemByCode(items: any[], targetCode: string): any | null {
    for (const item of items) {
      if (item.key === targetCode) {
        return item;
      } else if (item.children && item.children.length > 0) {
        const result = this.findItemByCode(item.children, targetCode);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }
}
