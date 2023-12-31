import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompositionService } from '../services/composition.service';
import { BreadcrumbService } from '../../layout/breadcrumb/services/app.breadcrumb.service';

@Component({
  selector: 'app-composition-list',
  templateUrl: './composition-list.component.html',
  styleUrl: './composition-list.component.scss'
})
export class CompositionListComponent extends BaseComponent implements OnInit {
  selectedComposition: any = null;
  compositionList: any[] = []
  constructor(spinner: NgxSpinnerService,
    private compositionService: CompositionService,
    private breadcrumbService: BreadcrumbService) {
    super(spinner);
    this.breadcrumbService.setItems([
      {label: 'Composition Listesi', routerLink: ['/composition-list']}
    ])
  }

  async ngOnInit(): Promise<void> {
    await this.getCompositionList();
    this.compositionService.isRefreshList.subscribe(async (result) =>{
      if(result){
        await this.getCompositionList();
        this.compositionService.isRefreshList.next(false);
      }
    });

    this.compositionService.selectedData$.subscribe((result) =>{
      if(result == null){
        this.selectedComposition = null;
      }
    });
  }

  async getCompositionList(){
    this.showSpinner();
    this.compositionList = await this.compositionService.getCompositions(()=> this.hideSpinner());
  }

  async onRowSelect(event){
    this.compositionService.keepRight.next(true);
    this.showSpinner();
    var data = await this.compositionService.getCompositionByCode(event.data.code,()=>this.hideSpinner());
    this.compositionService.selectedData.next(data);
  }

  onRowUnselect(){
    this.compositionService.keepRight.next(false);
    this.compositionService.selectedData.next(null);
  }
}
