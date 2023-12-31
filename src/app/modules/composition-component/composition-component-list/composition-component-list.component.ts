import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionComponentService } from '../services/composition-component.service';
import { BreadcrumbService } from '../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-composition-component-list',
  templateUrl: './composition-component-list.component.html',
  styleUrl: './composition-component-list.component.scss'
})
export class CompositionComponentListComponent extends BaseComponent implements OnInit {
  selectedCompositionComponent: any = null;
  compositionComponentList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private compositionComponentService: CompositionComponentService,
    private breadcrumbService: BreadcrumbService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {label: 'Composition Component Listesi', routerLink: ['/cost-level-list']}
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getCompositionComponentList();
    this.compositionComponentService.isRefreshList.subscribe(async (result) =>{
      if(result){
        await this.getCompositionComponentList();
        this.compositionComponentService.isRefreshList.next(false);
      }
    });

    this.compositionComponentService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedCompositionComponent = null;
      }
    });
  }

  async getCompositionComponentList(){
    this.showSpinner();
    this.compositionComponentList = await this.compositionComponentService.getCompositionComponents(()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.compositionComponentService.keepRight.next(true);
    this.showSpinner();
    var data = await this.compositionComponentService.getCompositionComponentByCode(event.data.code,()=>this.hideSpinner());
    this.compositionComponentService.selectedData.next(data);
  }

  onRowUnselect(){
    this.compositionComponentService.keepRight.next(false);
    this.compositionComponentService.selectedData.next(null);
  }

}
