import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserGenericGroupService } from '../../services/user-generic-group.service';

@Component({
  selector: 'app-data-user-generic-group',
  templateUrl: './data-user-generic-group.component.html',
  styleUrl: './data-user-generic-group.component.scss'
})
export class DataUserGenericGroupComponent implements OnInit {
  userGenericGroupForm: FormGroup;
  keepLeft: boolean = true;
  keepRight: boolean = true;

  types: any[] = [
    {code: 'ALPHA_NUMERIC', name: 'Alpha numeric'},
    {code: 'ALPHABETIC', name: 'Alphabetic'},
    {code: 'NUMERIC', name: 'Numeric'},
    {code: 'ANYTHING', name: 'Anything'},
  ]
  
  @Output() userGenericGroupFormGroupValue : EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder,private userGenericGroupService:UserGenericGroupService) {
    
  }
  ngOnInit(): void {
    
    this.userGenericGroupForm = this.formBuilder.group({
      id: new FormControl(null),
      code: new FormControl(null),
      shortText: new FormControl(null),
      longText: new FormControl(null),
      searchText: new FormControl(null),
      maxCodeLength: new FormControl(null),
      type: new FormControl(null)
    });

    this.userGenericGroupService.selectedData.subscribe(result=>{
      if(!!result){
        this.userGenericGroupForm.setValue(result);
      }else{
        this.userGenericGroupForm.reset();
      }
    });

    this.userGenericGroupFormGroupValue.emit(this.userGenericGroupForm);
    this.userGenericGroupForm.valueChanges.subscribe(value => {
      if(value)
        this.userGenericGroupFormGroupValue.emit(this.userGenericGroupForm);
    });

    this.userGenericGroupService.keepLeft.subscribe(value => {
      this.keepLeft=value
    });
    this.userGenericGroupService.keepRight.subscribe(value => {
      this.keepRight=value
    })
  }

  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.userGenericGroupService.keepLeft.next(this.keepLeft);
  }

  closeSplitter(){
    this.keepRight = false;
    this.userGenericGroupService.keepRight.next(this.keepRight);
    this.userGenericGroupService.selectedData.next(null);
  }
}
