import { Component, ViewChild } from '@angular/core';
import type {
  FireworksDirective,
  FireworksOptions
} from '@fireworks-js/angular'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {

  constructor() { }
    enabled = true
    options: FireworksOptions = {
        opacity: 0.5
    }

    @ViewChild('fireworks') fireworks?: FireworksDirective
    toggleFireworks(): void {
        //this.enabled = !this.enabled
    }
    waitStop(): void {
        this.fireworks?.waitStop()
    }

    ngOnInit(): void {
 
  }

}
