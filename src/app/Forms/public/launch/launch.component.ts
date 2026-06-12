import { Component, HostListener, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
    selector: 'app-launch',
    templateUrl: './launch.component.html',
    styleUrl: './launch.component.css'
})
export class LaunchComponent implements AfterViewInit {


    ngAfterViewInit(): void {
        // Optional: Any initialization code for after the view has been initialized
    }

    launchConfetti(): void {

        var end = Date.now() + (15 * 1000);

        // go Buckeyes!
        var end = Date.now() + (15 * 1000);

// go Buckeyes!
var colors = ['#bb0000', '#fed403'];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());

    }


    animation: boolean | undefined;


    constructor(private Router: Router) { }
    public dragging: boolean | undefined;

    public handleDragStart(event: CdkDragStart): void {
        this.dragging = true;
        this.animation = false;
        //alert('dragged!');

    }

    public handleClick(event: MouseEvent): void {
        if (this.dragging) {
            this.dragging = false;
            return
        }
    }

    public dragEnd(event: CdkDragEnd) {
        this.animation = true;
    }
    // Running
    Run: boolean | undefined;
    finish: boolean | undefined;
    Running() {
        if (this.Run, this.finish) {
            this.Run = false;
            this.finish = false;
        }
        this.Run = true;

        setTimeout(() => {
            this.finish = true;
            this.launchConfetti();
        }, 2850)

        // setTimeout(() => {
        //   this.Router.navigate(['/home/index']);
        // }, 7000);

        return
    }


    Shoot: boolean | undefined;
    isVisible = false;
    Arrow() {
        if (this.Shoot) {
            this.Shoot = false;
            this.isVisible = false;

        }
        this.Shoot = true;
        setTimeout(() => {
            this.launchConfetti();
        }, 1000);

        setTimeout(() => {
            this.isVisible = true;
        }, 2000);
        //auto redirect
        setTimeout(() => {
            this.Router.navigate(['/home/indextwo']);
        }, 2000);

        return
    }

    // Hover

    // @HostListener('document:click', ['$event'])
    //   onclick(event:any) {
    //       if(event.target.matches('.editor-div')) {
    //           alert('click to editor div')
    //       }
    //   }

    //   @HostListener('document:mouseover', ['$event'])
    //   mouseover(event:any) {
    //       if(event.target.matches('.editor-div')) {
    //           alert('hover to editor div')
    //       }
    //   }

    //highlights
    about: OwlOptions = {
        nav: false,
        dots: false,
        navText: ['<i class="fa-solid fa-arrow-left-long"></i>', '<i class="fa-solid fa-arrow-right-long"></i>'],
        margin: 10,
        loop: true,
        autoplay: true,
        smartSpeed: 2000,
        responsive: {
            0: {
                items: 1,
            },
            375: {
                items: 1,
            },
            767: {
                items: 1,
            },
            991: {
                items: 1,
            },
            1199: {
                items: 1,
                nav: false
            }
        }
    }

}
