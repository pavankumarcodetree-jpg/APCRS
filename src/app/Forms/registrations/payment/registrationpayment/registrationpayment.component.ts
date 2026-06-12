
import { Component, ElementRef, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { dE } from '@fullcalendar/core/internal-common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';

@Component({
    selector: 'app-registrationpayment',
    templateUrl: './registrationpayment.component.html',
    styleUrl: './registrationpayment.component.css'
})
export class RegistrationpaymentComponent {

    @Input() PaymentName: any;
    @Input() brapplicationid: any;
    @Input() regamount: any;
    @Input() transactionid: any;

    constructor(
        private spinner: NgxSpinnerService,
        private alt: AlertsService,
        private router: Router,
        private auth: AuthserService,
    ) { }
    paymentsuccesspage: boolean = false;
    paymentfailedpage: boolean = false; uniqueid: any;
    async application_payment_intiate(): Promise<void> {
        try {
            
            this.paymentsuccesspage = false;
            this.paymentfailedpage = false;
            const req = new basemodel();
            req.type = '10032';
            req.param1 = this.brapplicationid;
            this.spinner.show();
            let rsdata: any
            if (this.PaymentName == "Death") {
                rsdata = await this.auth.auth_pkgcrsdeath_service(req);
            }
            else if (this.PaymentName == "Birth") {
                rsdata = await this.auth.auth_pkgcrsbirth_service(req);
            }
            else if (this.PaymentName == "Adoption") {
                rsdata = await this.auth.auth_pkgcrsadoption_service(req);
            }
            else if (this.PaymentName == "Still Birth") {
                rsdata = await this.auth.auth_pkgcrsstillbirth_service(req);
            }

            this.spinner.hide();
            debugger
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    this.uniqueid = rsdata.Details[0].ROWUNIQUE_ID;
                    this.application_payment_intiate_Status_check();
                    this.paymentsuccesspage = true;
                    //this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT);
                    this.spinner.hide();
                } else {
                    this.paymentfailedpage = true;
                    //this.alt.toasterror(rsdata.Details[0].STATUS_TEXT);
                }
                this.spinner.hide();
            } else {
                this.alt.toasterror('The application processing has failed.');
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
    generateUniqueRandomNumberString(length: number): string {
        const digits = '0123456789'.split('');
        let result = '';

        while (result.length < length && digits.length > 0) {
            const index = Math.floor(Math.random() * digits.length);
            result += digits.splice(index, 1);
        }

        return result;
    }
    paymentorderid: any;
    async application_payment_intiate_Status_check(): Promise<void> {
        try {
            
            this.paymentorderid = this.generateUniqueRandomNumberString(10);
            const req = new basemodel();
            req.type = '10033';
            req.param1 = this.brapplicationid;
            req.param2 = this.uniqueid;
            req.param3 = "SUCCESS";
            this.spinner.show();
            let rsdata: any

            if (this.PaymentName === "Death") {
                rsdata = await this.auth.auth_pkgcrsdeath_service(req);
            }
            else if (this.PaymentName === "Birth") {
                rsdata = await this.auth.auth_pkgcrsbirth_service(req);
            }
            else if (this.PaymentName === "Adoption") {
                rsdata = await this.auth.auth_pkgcrsadoption_service(req);
            }
            else if (this.PaymentName === "Still Birth") {
                rsdata = await this.auth.auth_pkgcrsstillbirth_service(req);
            }
            this.spinner.hide();
            if (rsdata.code) {
                if (rsdata.code && rsdata.Details[0].STATUS == '1') {
                    //this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT);
                    this.router.navigate(['/shared/inbox']);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                    this.spinner.hide();
                } else {
                    this.alt.toasterror(rsdata.Details[0].STATUS_TEXT);
                }
                this.spinner.hide();
            } else {
                this.alt.toasterror('The application processing has failed.');
                this.spinner.hide();
            }
        } catch (error) {
            this.spinner.hide();

        }
    }
}
