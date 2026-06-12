import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumericsOnlyEnterDirective } from 'src/app/thirparty/directives/numerics-only-enter.directive';
import { NumericOnlyDirectiveDirective } from 'src/app/thirparty/directives/numeric-only-directive.directive';
import { MobileFirstFiveNotAllowedDirectiveDirective } from 'src/app/thirparty/directives/mobile-first-five-not-allowed-directive.directive';
import { NumericDotOnlyDirective } from 'src/app/thirparty/directives/numeric-dot-only.directive';
import { DateFormatDirectiveDirective } from 'src/app/thirparty/directives/date-format-directive.directive';
import { EmailFormatValidatorDirective } from 'src/app/thirparty/directives/email-format.directive';
import { PanNumberDirective } from 'src/app/thirparty/directives/pan-number.directive';
import { AlphanumericOnlyDirective } from 'src/app/thirparty/directives/alphanumeric-only.directive';
import { AlphabetsonlyDirective } from 'src/app/thirparty/directives/alphabetsonly.directive';
import { PincodeValidatorDirective } from '../directives/pincodevalidation.directive';
import { UppercaseDirective } from '../directives/uppercase.directive';
import { DisableAutofillDirective } from '../directives/disable-autofill.directive';

@NgModule({
    declarations: [
        NumericOnlyDirectiveDirective,
        NumericsOnlyEnterDirective,
        DateFormatDirectiveDirective,
        MobileFirstFiveNotAllowedDirectiveDirective,
        EmailFormatValidatorDirective,
        PanNumberDirective,
        AlphanumericOnlyDirective,
        AlphabetsonlyDirective,
        NumericDotOnlyDirective,
        PincodeValidatorDirective,
        UppercaseDirective,
        DisableAutofillDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        NumericOnlyDirectiveDirective,
        NumericsOnlyEnterDirective,
        DateFormatDirectiveDirective,
        MobileFirstFiveNotAllowedDirectiveDirective,
        EmailFormatValidatorDirective,
        PanNumberDirective,
        AlphanumericOnlyDirective,
        AlphabetsonlyDirective,
        NumericDotOnlyDirective,
        PincodeValidatorDirective,
        UppercaseDirective,
        DisableAutofillDirective
    ]
})
export class ShareddirModule { }
