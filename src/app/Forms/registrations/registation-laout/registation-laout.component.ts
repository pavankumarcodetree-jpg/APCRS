import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { DOCUMENT, DatePipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';

@Component({
  selector: 'app-registation-laout',
  templateUrl: './registation-laout.component.html',
  styleUrl: './registation-laout.component.css',
})
export class RegistationLaoutComponent implements OnInit {
  isClassToggled = false;
  toggleClass() {
    this.isClassToggled = !this.isClassToggled;
  }
  Deviceid: any;
  hash: any;
  U_CODE = '';
  U_ID = '';
  U_TYPE = '';
  isadddata: boolean = false;
  langarray: any[] = [];
  gotitile1: any = '';
  gotitile: any = '';
  gotitile2: any = '';
  gotitile3: any = '';
  ngOnInit(): void {
    // this.Defaultvalueseeion();
    this.initializeMobileMenu();
    setTimeout(() => {
      this.initializeMobileMenu();
    }, 500);

    // this.httpClient
    //   .get('https://api.ipify.org/?format=json')
    //   .subscribe((res: any) => {
    //     this.ipadd = res.ip;
    //   });
  }
  constructor(
    private alt: AlertsService,
    private spinner: NgxSpinnerService,
    private pscall: PrivateService,
    private encdc: EncDecService,
    private httpClient: HttpClient,
    private deviceService: DeviceDetectorService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) {}
  initializeMobileMenu() {
    const mainMenuContent = document.querySelector(
      '.main-header .main-menu .navigation'
    )?.innerHTML;
    if (mainMenuContent) {
      const mobileMenuNavigation = document.querySelector(
        '.mobile-menu .navigation'
      );
      const stickyHeaderNavigation = document.querySelector(
        '.sticky-header .navigation'
      );
      if (mobileMenuNavigation) {
        mobileMenuNavigation.innerHTML = mainMenuContent;
      }
      if (stickyHeaderNavigation) {
        stickyHeaderNavigation.innerHTML = mainMenuContent;
      }
    }
    const dropdowns = this.el.nativeElement.querySelectorAll(
      '.main-header li.dropdown ul'
    );
    if (dropdowns.length > 0) {
      const navigationItems = this.el.nativeElement.querySelectorAll(
        '.main-header ul li.dropdown'
      );
      navigationItems.forEach((item: HTMLElement) => {
        const dropdownBtn = this.renderer.createElement('div');
        dropdownBtn.classList.add('dropdown-btn');
        dropdownBtn.innerHTML = '<i class="fa fa-angle-down"></i>';
        this.renderer.appendChild(item, dropdownBtn);
        this.renderer.listen(dropdownBtn, 'click', (event) =>
          this.toggleDropdown(event, item)
        );
        this.renderer.appendChild(item, dropdownBtn);
      });
    }
  }
  toggleDropdown(event: Event, item: HTMLElement) {
    const dropdownContent = item.querySelector('ul');
    if (dropdownContent) {
      dropdownContent.classList.toggle('active');
      const isActive = dropdownContent.classList.contains('active');
      dropdownContent.style.display = isActive ? 'block' : 'none';
    }
    const dropdownBtn = event.target as HTMLElement;
    dropdownBtn.classList.toggle('active');
  }
  isBodyClassActive: boolean = false;
  toggleBodyClass() {
    this.isBodyClassActive = !this.isBodyClassActive;
    if (this.isBodyClassActive) {
      this.renderer.addClass(this.document.body, 'mobile-menu-visible');
    } else {
      this.renderer.removeClass(this.document.body, 'mobile-menu-visible');
    }
  }
  lantype: any = 'En';
  ChangingValue(obj1: any) {
    if (obj1.target.value == 'English') {
      this.lantype = 'En';
    } else {
      this.lantype = 'Te';
    }
    sessionStorage.setItem('lantype', this.lantype);
    location.reload();
  }

  Defaultvalueseeion() {
    let date = new Date();
    const datePipe = new DatePipe('en-US');
    let clintkey: any = datePipe.transform(date, 'ddMMyyyyHHmmssss');
    this.hash = CryptoJS.SHA256(this.Deviceid + '^' + clintkey).toString();
    let resultuser = this.encdc.enccall(
      JSON.stringify(this.Deviceid + '^' + clintkey + '^' + '_s3_a2psgoud')
    );
    sessionStorage.setItem('devid', this.Deviceid);
    sessionStorage.setItem('appid', clintkey);
    sessionStorage.setItem('_Uenc', resultuser ?? '');
    sessionStorage.setItem('_sltkn', this.hash ?? '');
    sessionStorage.setItem('_cltkn', this.hash ?? '');
  }
  contactus: any;

  about: any;
  ipadd: any;
  vcount: any;
}
