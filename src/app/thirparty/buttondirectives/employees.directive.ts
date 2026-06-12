import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-button-renderer',
    template: `
 <button  type="button" class="btn btn-success btn-sm" (click)="nextClick($event)">event.</button>
      `
})

export class EmployeesDirective implements ICellRendererAngularComp {

    params?: any;
    label: any;

    agInit(params?: any): void {
        this.params = params;
        this.label = this.params.label || null;
    }

    refresh(params?: any): boolean {
        return true;
    }

    nextClick($event?: any) {
        if (this.params.nextClick instanceof Function) {
            // put anything into params u want pass into parents component
            const params = {
                event: $event,
                rowData: this.params.node.data
                // ...something
            }
            this.params.nextClick(params);

        }
    }

}
