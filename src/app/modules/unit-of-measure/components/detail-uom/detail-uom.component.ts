import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UnitOfMeasureService } from '../../services/unit-of-measure.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';

@Component({
  selector: 'app-detail-uom',
  templateUrl: './detail-uom.component.html',
  styleUrl: './detail-uom.component.scss'
})
export class DetailUomComponent  extends BaseComponent implements OnInit {
  uomForm: FormGroup;
  activeTab: number = 0;
  activeMenu: number = 0;
  unitOfMeasureTypes: any[] = [
    {code: 'NUMBER', name: 'Number'},
    {code: 'WEIGHT', name: 'Weight'},
    {code: 'VOLUME', name: 'Volume'},
    {code: 'LENGTH', name: 'Length'},
    {code: 'AREA', name: 'Area'},
    {code: 'CAPACITY', name: 'Capacity'},
    {code: 'TIME', name: 'Time'},
    {code: 'TEMPERATURE', name: 'Temperature'},
    {code: 'QUANTITY', name: 'Quantity'},
    {code: 'PACKAGING', name: 'Packaging'},
    {code: 'MEASUREMENT', name: 'Measurement'}
  ]
  code: string;
  descriptionText: string = "";
  constructor(spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private unitOfMeasureService:UnitOfMeasureService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {
    super(spinner);
    this.code = this.route.snapshot.params['code']
  }
  async ngOnInit(): Promise<void> {
    this.uomForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      unitOfMeasureType: new FormControl(null)
    });
    await this.getUnitOfMeasureByCode();
  }

  get formControls(){
    return this.uomForm.controls;
  }

  async getUnitOfMeasureByCode(){
    this.showSpinner();
    var result = await this.unitOfMeasureService.getUnitOfMeasureByCode(this.code, ()=> this.hideSpinner());
    this.uomForm.setValue(result);
    this.descriptionText = `Short: ${result.shortText ? result.shortText : "-"}, Long: ${result.longText ? result.longText : "-"}, Search: ${result.searchText ? result.searchText : "-"}`
  }

  save(value){
    if(this.uomForm.invalid){
      return;
    }
    this.confirmationService.confirm({
      key: 'save-uom',
      header: 'Transaction Confirmation',
      message: 'The unit of measurement is being recorded. Are you sure?',
      accept: async () => {
        var request = {
          id: value?.id,
          code: value.code,
          longText: value?.longText,
          shortText: value?.shortText,
          searchText: value?.searchText,
          unitOfMeasureType: value?.unitOfMeasureType
        }
        this.showSpinner();
        await this.unitOfMeasureService.saveUnitOfMeasure(request, ()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Unit of measure has been saved successfully.'});
        this.router.navigate(['/unit-of-measure-list'])
      }
  });
   
  }

  goBack(){
    this.router.navigate(['/unit-of-measure-list'])
  }
}
