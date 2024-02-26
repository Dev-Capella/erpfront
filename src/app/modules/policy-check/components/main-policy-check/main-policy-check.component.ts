import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../core/components/base/base.component';
import { PolicyCheckService } from '../../services/policy-check.service';

@Component({
  selector: 'app-main-policy-check',
  templateUrl: './main-policy-check.component.html',
  styleUrl: './main-policy-check.component.scss'
})
export class MainPolicyCheckComponent extends BaseComponent implements OnInit {
  policyCheckList: any[] = []
  selectedItem: any;
  constructor(spinner: NgxSpinnerService,
    private policyCheckService: PolicyCheckService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    super(spinner);
  }

  async ngOnInit(): Promise<void> {
    await this.gePolicyCheckList();
  }

  async gePolicyCheckList() {
    this.showSpinner();
    this.policyCheckList = await this.policyCheckService.getPolicyChecks(() => this.hideSpinner());
  }

  async edit() {
    var code = this.selectedItem?.code;
    this.router.navigate(['/policy-check-list/',code])
  }

  async delete() {
    var code = this.selectedItem?.code;
    this.confirmationService.confirm({
      key: 'delete-policy-check',
      header: 'Transaction Confirmation',
      message: 'The policy check is being remove. Are you sure?',
      accept: async () => {
        this.showSpinner();
        await this.policyCheckService.deletePolicyCheckByCode(code,()=> this.hideSpinner());
        this.messageService.add({severity:'success', summary:'Transaction Result', detail:'Policy check has been removed successfully.'});
        await this.gePolicyCheckList();
      }
  });
   
  }

  new() {
    this.router.navigate(['/policy-check-list/new'])
  }
}
