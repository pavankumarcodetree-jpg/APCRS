import {
  Component,
  EventEmitter,
  Inject,
  Output,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { INavbarData } from './helper';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private cookieService: CookieService,
    private router: Router,
    private encdc: EncDecService,
    private spinner: NgxSpinnerService,
    private auth: AuthserService,
     private alt: AlertsService,
  ) {
    window.history.pushState(null, document.title, window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, document.title, window.location.href);
    };
  }

  displausername = '';
  designationname = '';
  displayUnitName = '';
  user_type = '';
  approve_status = '';
  user_role = '';
  last_login_time = '';
  OTPCODE = '';
  mobilenumber = '';
  Password = '';
  ConfirmPassword = '';
  isDisabled = false;
  OTPsend = '';
  OTP = '';
  user_id = '';
  ispassword_change = '';
  urole = '';
  navData: any = [];
  collapsed = true;
  screenWidth = 0;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  multiple: boolean = false;
  toggleTheme() {
    const htmlElement = this.document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-bs-theme', newTheme);
  }
  toggleMenu() {
    const htmlElement = this.document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-sidenav-size');
    const newTheme = currentTheme === 'default' ? 'condensed' : 'default';
    if (window.innerWidth <= 767.98) {
      htmlElement.setAttribute('data-sidenav-size', 'full');
    }
    htmlElement.setAttribute('data-sidenav-size', newTheme);

    const sidebarEnableClass = 'sidebar-enable';
    const menuitemActiveClass = 'menuitem-active';

    const hasSidebarEnableClass =
      htmlElement.classList.contains(sidebarEnableClass);
    const hasMenuItemActiveClass =
      htmlElement.classList.contains(menuitemActiveClass);

    if (hasSidebarEnableClass && hasMenuItemActiveClass) {
      this.renderer.removeClass(htmlElement, sidebarEnableClass);
      this.renderer.removeClass(htmlElement, menuitemActiveClass);
    } else {
      this.renderer.addClass(htmlElement, sidebarEnableClass);
      this.renderer.addClass(htmlElement, menuitemActiveClass);
    }
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  public signout(): void {
    Swal.fire({
      title: 'Are You Sure Do You Want to Sign Out?',
      text: 'Sign Out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result: any) => {
      if (result.value) {
        this.userclose();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Sign Out', 'error');
      }
    });
  }

  ngOnInit(): void {
    this.changeSidenavSize(); // Call the method to set the initial value
    // Listen for window resize events
    window.addEventListener('resize', () => {
      this.changeSidenavSize();
    });

    if (sessionStorage.getItem('_Uenc') !== '') {
      //this.collapsed = true;
      let obj: any = this.encdc.Getuser();
      if (obj != '' && obj != undefined && obj != null) {
        
        this.displausername = obj[0].UDPNAME;
        this.designationname = obj[0].UDPDESIGNATION;
        this.user_type = obj[0].UTYPE;
        this.user_role = obj[0].UROLE;
        this.urole = obj[0].UROLE;
       // console.log(this.urole);
        this.user_id = obj[0].USERID;
        this.last_login_time = obj[0].LAST_LOGIN_ON;
        this.ispassword_change = obj[0].UKEY_CHANGED;
        this.displayUnitName = obj[0].UNITNAME;
      } else {
        this.encdc.Usersessionkill();
      }
    } else {
      this.router.navigate(['/Sessionexpired']);
    }
  }
  displaymodal = 'none';
  ModalCLose() {
    this.displaymodal = 'none';
    this.passwordviewornot=false;
  }
  changepasswword() {
    this.displaymodal = 'block';
    this.passwordviewornot=true;
  }
 
  changebuttonClick() {
    this.ModalCLose();
    this.router.navigate(['/auth/login']);
  }
  passwordviewornot:boolean=false;
  changeSidenavSize(): void {
    const htmlElement = this.document.documentElement;
    if (window.innerWidth <= 767.98) {
      htmlElement.setAttribute('data-sidenav-size', 'full');
    } else {
      // Restore the attribute to its original value if screen size is greater than 767.98
      htmlElement.setAttribute('data-sidenav-size', 'default');
    }
  }

  public fieldTextTypeonelogin: boolean | undefined;
  toggleFieldTextTypeonelogin() {
    this.fieldTextTypeonelogin = !this.fieldTextTypeonelogin;
  }
  handleClick(item: INavbarData): void {
    item.expanded = !item.expanded;
  }
 

  async userclose(): Promise<void>{
    try {
      const req = new basemodel();
      req.type = '1000';
      this.spinner.show();
      let responce: any = await this.auth.auth_Autocompletelog(req);
      this.spinner.hide();
      
      if (responce.code) {
      sessionStorage.clear();
      this.cookieService.deleteAll();
      this.router.navigate(['/Logout']);
      this.spinner.hide();
      } else {
        sessionStorage.clear();
      this.cookieService.deleteAll();
      this.router.navigate(['/Logout']);
      this.spinner.hide();
      }
    } catch (error) {
      sessionStorage.clear();
        this.cookieService.deleteAll();
        this.router.navigate(['/Logout']);
        this.spinner.hide();
    }
   }
}
