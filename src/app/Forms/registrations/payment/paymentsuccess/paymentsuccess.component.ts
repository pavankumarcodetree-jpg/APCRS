import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrl: './paymentsuccess.component.css'
})
export class PaymentsuccessComponent {
  @Input() brapplicationid: any;
  @Input() regamount: any;
  @Input() transactionid: any;
  @Input () orderid:any;
}
