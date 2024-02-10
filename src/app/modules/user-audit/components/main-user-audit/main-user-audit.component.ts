import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuditService } from '../../services/user-audit.service';

@Component({
  selector: 'app-main-user-audit',
  templateUrl: './main-user-audit.component.html',
  styleUrl: './main-user-audit.component.scss'
})
export class MainUserAuditComponent extends BaseComponent implements OnInit {
  userAuditLogs: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private userAuditService: UserAuditService,) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.getUserAudits();
  }

  async getUserAudits() {
    this.showSpinner();
    this.userAuditLogs = await this.userAuditService.getUserAudits(() => this.hideSpinner());
  }

}
