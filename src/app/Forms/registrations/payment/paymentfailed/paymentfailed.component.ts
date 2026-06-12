import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentfailed',
  templateUrl: './paymentfailed.component.html',
  styleUrl: './paymentfailed.component.css'
})
export class PaymentfailedComponent {
    @Input() brapplicationid: any;
    @Input() regamount: any;
    @Input() transactionid: any;
    @Input () orderid:any;
      constructor(
        private router: Router,
      ) { }
  retryPayment(){
    //this.router.navigate(['/shared/inbox']);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }
}
