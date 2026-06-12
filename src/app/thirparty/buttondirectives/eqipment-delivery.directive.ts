import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-button-renderer',
    template: `
    <button *ngIf="params.value==1" type="button" class="btn btn-success btn-sm" (click)="nextClick($event)">Dispatch</button>
    
    <span *ngIf="params.value==2" class="text-success">Dispatched</span>

    <span *ngIf="params.value==3" class="text-success">ACK Generated</span>
      `
})

export class eqipmentdeliverydirective implements ICellRendererAngularComp {

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