import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-detail-uom',
  templateUrl: './detail-uom.component.html',
  styleUrl: './detail-uom.component.scss'
})
export class DetailUomComponent {
  keepLeft: boolean = true;
  keepRight: boolean = true;
  @Output() keepLeftEvent : EventEmitter<any> = new EventEmitter();
  @Output() keepRightEvent : EventEmitter<any> = new EventEmitter();
  changeKeepLeft(){
    this.keepLeft = !this.keepLeft;
    this.keepLeftEvent.emit(this.keepLeft)
  }

  closeSplitter(){
    this.keepRight = false;
    this.keepRightEvent.emit(this.keepRight)
  }
}
