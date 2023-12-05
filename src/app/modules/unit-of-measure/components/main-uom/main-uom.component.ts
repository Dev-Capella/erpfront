import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main-uom',
  templateUrl: './main-uom.component.html',
  styleUrl: './main-uom.component.scss'
})
export class MainUomComponent extends BaseComponent implements OnInit {
/**
 *
 */
constructor(spinner: NgxSpinnerService) {
  super(spinner);
  
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
