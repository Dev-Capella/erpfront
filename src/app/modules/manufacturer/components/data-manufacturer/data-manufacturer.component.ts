import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ManufacturerService } from '../../services/manufacturer.service';

@Component({
  selector: 'app-data-manufacturer',
  templateUrl: './data-manufacturer.component.html',
  styleUrl: './data-manufacturer.component.scss'
})
export class DataManufacturerComponent implements OnInit {
  manufacturerForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;
  uploadedFiles: any[] = []
  medias: any[] = []
  selectedMedia: any;
  constructor(private formBuilder: FormBuilder,private manufacturerService:ManufacturerService) {
    
  }
  ngOnInit(): void {
    
    this.manufacturerForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      name: new FormControl(null)
    });

    this.manufacturerService.selectedData.subscribe(result=>{
      if(!!result){
        this.manufacturerForm.setValue(result);
      }else{
        this.manufacturerForm.reset();
      }
    });

    this.manufacturerFormGroupValue.emit(this.manufacturerForm);
    this.manufacturerForm.valueChanges.subscribe(value => {
      if(value)
        this.manufacturerFormGroupValue.emit(this.manufacturerForm);
    });

    this.manufacturerService.keepLeft.subscribe(value => {
      this.keepLeft=value
    });
    this.manufacturerService.keepRight.subscribe(value => {
      this.keepRight=value
    })
  }

  @Output() manufacturerFormGroupValue : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.manufacturerService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.manufacturerService.keepRight.next(this.keepRight);
    this.manufacturerService.selectedData.next(null);
  }

  onUpload(event){
    console.log(event)
  }
}
