import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { MiddlewareService } from 'src/app/services/middleware_lyr/middleware.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { DOCUMENT, DatePipe } from '@angular/common';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as CryptoJS from 'crypto-js';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { Router } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputvalidaionService } from 'src/app/thirparty/validation/inputvalidaion.service';


@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css'
})
export class UserCreationComponent {

  constructor(
    private spinner: NgxSpinnerService,
    private alt: AlertsService,
    private pscall: PrivateService,
    private auth: AuthserService,
    private httpClient: HttpClient,
    private mid: MiddlewareService,
    private geolocationService: GeolocationService,
    private sanitizer: DomSanitizer,
    private encdc: EncDecService,
    private router: Router,
    private datepipe: DatePipe,
    private val: InputvalidaionService,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) {
    this.contentuploadurl_img = this.mid.globalsetting.api_url_conent_upload;
    this.contentshowurl = this.mid.globalsetting.api_url_conent_show;
    this.mindate = new Date();
  }
  bsConfig: Partial<BsDatepickerModule> = {
    dateInputFormat: 'DD-MM-YYYY',
    isDisabled: false,
    startView: 'day',
    showWeekNumbers: false,
    containerClass: 'theme-blue',
    showClearButton: true,
    adaptivePosition: true,
    minMode: 'day',
    maxMode: 'year',
    customTodayClass: 'custom-today',
  };
  mindate!: Date;
  contentuploadurl_img = '';
  contentshowurl = '';
  displausername = '';
  designationname = '';
  user_type = '';
  approve_status = '';
  user_role = '';
  u_id = '';
  user_reg_form = {
    locality: '', email: '', mobileno: '', name_of_functionary: '', gender: '', designation: '', departmentaldesignation: '', state_name: '', district: '', rural_urban: '', mandal: '', village: '',
    dateofposting: '', street_name: '', hsno: '', building_name: '', aadhaarno: '', aadhaarmask: '',
  }
  RU_CODE = '';obj:any;
  ngOnInit(): void {
    if (sessionStorage.getItem('_Uenc') !== '') {
      this.obj = this.encdc.Getuser();
      if (this.obj != '' && this.obj != undefined && this.obj != null) {
        debugger
        this.displausername = this.obj[0].UNAME;
        this.u_id = this.obj[0].UID;
        this.designationname = this.obj[0].UDPDESIGNATION;
        this.user_type = this.obj[0].UTYPE;
        this.user_role = this.obj[0].UROLE;
        
        this.RU_CODE = this.obj[0].RU_CODE;
        this.get_registrar_details();

      } else {
        this.encdc.Usersessionkill();
      }
    } else {
      this.router.navigate(['/Sessionexpired']);
    }
  }
  registrar_details_array: any[] = []; registration_unit_name = ''; registration_unit_name_tel = ''; RU_DEPT_CODE = '';
  async get_registrar_details(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1006';
      req.param1 = this.RU_CODE;
      this.spinner.show();
      this.registrar_details_array = [];
      let responce: any = await this.auth.auth_pkgmasters_service(req);
      this.spinner.hide();
      debugger
      if (responce.code) {
        this.registrar_details_array = responce.Details;
        this.RU_DEPT_CODE = responce.Details[0].RU_DEPT_CODE;
        this.registration_unit_name = responce.Details[0].RU_NAME;
        this.registration_unit_name_tel = responce.Details[0].RU_NAME_TEL;
        this.user_reg_form.rural_urban = responce.Details[0].RU_RURAL_URBAN;

        this.spinner.hide();
        return;
      } else {
        this.registrar_details_array = [];
        this.spinner.hide();
        return;
      }
    } catch (error) {
      this.spinner.hide();

      this.registrar_details_array = [];
      return;
    }
  }
  modal_open() {
    this.get_registrar_district();
    this.getdesignationdata();
  }
  registrar_district_array: any[] = [];
  async get_registrar_district(): Promise<void> {

    try {
      const req = new basemodel();
      req.type = '1002';
      req.param1 = '28';// this.user_reg_form.state_name;
      this.spinner.show();
      let responce: any = await this.auth.auth_utilities_service(req);
      this.spinner.hide();
      this.registrar_district_array = [];
      debugger
      if (responce.code) {
        this.user_reg_form.district = this.obj[0].DISTRICT_CODE;
        this.user_reg_form.rural_urban = this.obj[0].RURAL_URBAN;
        this.registrar_district_array = responce.Details;
        this.registrar_mandalmuncipality();
        this.spinner.hide();
        return;
      } else {
        this.registrar_district_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();

      this.registrar_district_array = [];
      return;
    }
    // }
  }

  async registrar_districtchange(): Promise<void> {
    this.user_reg_form.rural_urban = '';
    this.user_reg_form.mandal = '';
    this.user_reg_form.village = '';
  }
  registrar_MandalMuncipality_array: any[] = [];
  async registrar_mandalmuncipality(): Promise<void> {
    // if (
    //   this.user_reg_form.district == ''
    // ) {
    //   this.spinner.hide();
    //   this.alt.warning('select district');
    //   return;
    // } else if (
    //   this.user_reg_form.rural_urban == ''
    // ) {
    //   this.spinner.hide();
    //   this.alt.warning('select Rural / Urban');
    //   return;
    // } else {
      try {
        const req = new basemodel();
        req.type = '1003';
        req.param1 = '28'; //this.user_reg_form.state_name;
        req.param2 = this.user_reg_form.district;
        req.param3 = this.user_reg_form.rural_urban;
        this.spinner.show();
        let responce: any = await this.auth.auth_utilities_service(req);
        this.registrar_MandalMuncipality_array = [];
        if (responce.code) {
          this.spinner.hide();
          this.user_reg_form.mandal = this.obj[0].MMC_CODE;
          this.registrar_MandalMuncipality_array = responce.Details;
          this.registrar_villageward();
          return;
        } else {
          this.spinner.hide();
          this.registrar_MandalMuncipality_array = [];
          return;
        }
      } catch (error) {
        this.spinner.hide();

        this.registrar_MandalMuncipality_array = [];
        return;
      }
    //}
  }

  registrar_village_ward_array: any[] = [];
  async registrar_villageward(): Promise<void> {
    // if (
    //   this.user_reg_form.district == ''
    // ) {
    //   this.spinner.hide();
    //   this.alt.warning('select District');
    //   return;
    // }
    // if (
    //   this.user_reg_form.mandal == ''
    // ) {
    //   this.spinner.hide();
    //   this.alt.warning('select Mandal/Muncipality');
    //   return;
    // }
    // else {
      try {

        const req = new basemodel();
        req.type = '1004';
        req.param1 = '28';// this.user_reg_form.state_name;
        req.param2 = this.user_reg_form.district;
        req.param3 = this.user_reg_form.rural_urban;
        req.param4 = this.user_reg_form.mandal;
        this.spinner.show();
        let responce: any = await this.auth.auth_utilities_service(req);
        this.registrar_village_ward_array = []
        if (responce.code) {
          this.spinner.hide();
          this.user_reg_form.village = this.obj[0].VW_CODE;
          this.registrar_village_ward_array = responce.Details;
          return;
        } else {
          this.registrar_village_ward_array = [];
          this.spinner.hide();
        }
      } catch (error) {
        this.registrar_village_ward_array = [];
        this.spinner.hide();

      }
    //}
  }
  designation_array: any[] = [];
  async getdesignationdata(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '2008';
      req.param1 = this.user_role;
      this.spinner.show();
      this.designation_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);
      this.spinner.hide();
      debugger
      if (responce.code) {
        this.designation_array = responce.Details;
        this.spinner.hide();
        return;
      } else {
        this.designation_array = [];
        this.spinner.hide();
        return;
      }
    } catch (error) {
      this.spinner.hide();

      this.designation_array = [];
      return;
    }
  }
  department_designation_array: any[] = [];
  async get_depat_designationdata(): Promise<void> {

    try {
      const req = new basemodel();
      req.type = '2004';
      req.param1 = this.RU_DEPT_CODE;
      this.spinner.show();
      this.department_designation_array = [];
      let responce: any = await this.auth.auth_utilities_service(req);
      this.spinner.hide();
      if (responce.code) {
        this.department_designation_array = responce.Details;
        this.spinner.hide();
        return;
      } else {
        this.department_designation_array = [];
        this.spinner.hide();
        return;
      }
    } catch (error) {
      this.spinner.hide();

      this.department_designation_array = [];
      return;
    }
  }


  photoselectedFiles: File[] = [];
  @ViewChild('regunitlogo') regunitlogo: any;
  supportdoc: File[] = [];
  @ViewChild('supportdocelement') supportdocelement: any;
  fileupload(event: any, doc_type: any) {
    const files: File[] = event.target.files;
    if (files.length > 1) {
      this.alt.toasterror('Upload jpeg/jpg/png formate only');
      this.supportdoc = [];
      return;
    }
    const checkfilesizetype = Array.from(files);
    const checkcondion = false;
    const allowedExtensions = ['.pdf'];
    const maxFileSizeMB = 5; // Maximum file size in megabytes
    for (let chc = 0; chc < checkfilesizetype.length; chc++) {
      let type = checkfilesizetype[chc].name;

      const fileExtension = checkfilesizetype[chc].name
        .toLowerCase()
        .substr(checkfilesizetype[chc].name.lastIndexOf('.'));
      if (allowedExtensions.indexOf(fileExtension) === -1) {
        this.supportdoc = [];
        this.alt.toasterror('Only pdf files are allowed.)');
        return;
      }

      const fileSizeMB = checkfilesizetype[chc].size / (1024 * 1024);
      if (fileSizeMB > maxFileSizeMB) {
        this.supportdoc = [];
        this.alt.toasterror('File size exceeds the maximum allowed limit.5mb)');
        return;
      }
    }
    const file = event.target.files?.[0];

    if (file) {
      // this.readImage(file);
    }
    this.supportdoc = Array.from(files);

  }

  photofilepath = '';
  async Savephotoupload() {
    if (
      this.supportdoc.length == 0 &&
      this.supportdocelement.nativeElement.value != ''
    ) {
      this.alt.toasterror(' Please Upload Documents');
      return;
    } else {
      if (this.checkinputs()) {
        this.spinner.show();
        if (this.supportdoc.length != 0) {
          let filename = 'Supporting' + '_' + 'TP';
          if (this.supportdoc.length > 0) {
            let maxlen = 0;
            let uploadcheck = 0;
            maxlen = this.supportdoc.length;
            for (let ph = 0; ph < maxlen; ph++) {
              this.photofilepath = '';
              const phform = new FormData();
              phform.append('file', this.supportdoc[ph]);
              phform.append('input01', 'Documents');
              phform.append('input02', 'Supporting');
              phform.append('input03', 'PDF');
              phform.append('input04', filename);
              phform.append('userid', 'Sample');
              phform.append('type', 'InsertJson');
              await this.httpClient
                .post(this.contentuploadurl_img, phform)
                .subscribe((res) => {
                  let rsdata: any = res;
                  if (rsdata.code) {
                    uploadcheck++;
                    if (rsdata.code) {
                      this.supportdocelement.nativeElement.value = '';
                      this.spinner.hide();
                      this.photofilepath = rsdata.path;
                      this.submit_register_unit();
                      return;
                    } else if (rsdata.code && rsdata.Details[0].STATUS == '0') {
                      this.spinner.hide();
                      this.alt.toastinfo(rsdata.Details[0].STATUS_TEXT);
                      return;
                    } else {
                      this.spinner.hide();
                      this.alt.toasterror(rsdata.message);
                      return;
                    }
                  } else {
                    this.spinner.hide();
                    this.alt.toasterror(rsdata.message);
                    return;
                  }
                });
            }
          }
        }
        else {
          this.spinner.hide();
          this.alt.toasterror(' Please Upload Documents');
          return;
        }
      }
      else {
        return;
      }
    }
  }
  checkinputs(): boolean {
    if (this.user_reg_form.name_of_functionary == '') {
      this.alt.warning('Please enter Name of Functionary/పదవిదారుడి పేరు');
      return false;
    }
    else if (this.user_reg_form.gender == '') {
      this.alt.warning('Please select Gender/ లింగ బేధము');
      return false;
    }
    else if (this.user_reg_form.email == '') {
      this.alt.warning('Please enter Email ID/ ఇమెయిల్ ID');
      return false;
    }
    else if (this.user_reg_form.mobileno == '') {
      this.alt.warning('Please enter Mobile Number/ మొబైల్ నంబర్');
      return false;
    }
    else if (this.user_reg_form.designation == '') {
      this.alt.warning('Please enter Role/పాత్ర');
      return false;
    }
    else if (this.user_reg_form.dateofposting == '') {
      this.alt.warning('Please select Date of Posting/పోస్టింగ్ తేది');
      return false;
    }
    else if (this.user_reg_form.district == '') {
      this.alt.warning('Please select District/ జిల్లా');
      return false;
    }
    else if (this.user_reg_form.mandal == '') {
      this.alt.warning('Please select Mandal/Muncipality/ మండలం/మున్సిపాలిటీ');
      return false;
    }
    else if (this.user_reg_form.village == '') {
      this.alt.warning('Please select Village/Town /గ్రామం / పట్టణం పేరు');
      return false;
    }
    else {
      return true;
    }
  }
  async submit_register_unit(): Promise<void> {

    const desigsplit = this.user_reg_form.designation.split('^');
    try {
      if (this.photofilepath != '') {
        if (this.checkinputs()) {
          try {
            const req = new basemodel();
            req.type = '1013';
            req.param1 = this.RU_CODE;
            req.json2 = JSON.stringify({ RU_NAME: this.registration_unit_name, RU_NAME_TEL: this.registration_unit_name_tel, RUF_RU_CODE: this.RU_CODE, RUF_RU_ROLE: desigsplit[0], RUF_FULLNAME: this.user_reg_form.name_of_functionary, RUF_FULLNAME_TEL: '', RUF_GENDER: this.user_reg_form.gender, RUF_GENDER_TEL: '', RUF_UID: this.user_reg_form.aadhaarno, RUF_MOBILE_NO: this.user_reg_form.mobileno, RUF_EMAILID: this.user_reg_form.email, RUF_POSTING_DATE: this.datepipe.transform(this.user_reg_form.dateofposting, 'dd-MM-yyyy'), RUF_RU_DESIGNATION_CODE: desigsplit[0], RUF_RU_DESIGNATION_TEL: '', RUF_DEPT_DESIGNATION_CODE: this.user_reg_form.departmentaldesignation, RUF_DEPT_DESIGNATION_TEL: '', RUF_DEPT_CODE: this.RU_DEPT_CODE, RUF_DEPT: '', RUF_DEPT_TEL: '', RUF_STATE_CODE: '28', RUF_STATE_NAME: '', RUF_STATE_NAME_TEL: '', RUF_DISTRICT_CODE: this.user_reg_form.district, RUF_DISTRICT_NAME: '', RUF_DISTRICT_NAME_TEL: '', RUF_RURAL_URBAN: this.user_reg_form.rural_urban, RUF_RURAL_URBAN_TEL: '', RUF_MMC_CODE: this.user_reg_form.mandal, RUF_MMC_NAME: '', RUF_MMC_NAME_TEL: '', RUF_VW_CODE: this.user_reg_form.village, RUF_VW_NAME: '', RUF_VW_NAME_TEL: '', RUF_ADDRESS: this.user_reg_form.building_name + ',' + this.user_reg_form.hsno + ',' + this.user_reg_form.street_name + ',' + this.user_reg_form.locality, RUF_ADDRESS_TEL: '', RUF_DOC: this.photofilepath, RUF_PINCODE: '', RUF_SIGNATURE: '', });
            req.islogstore = 'YES';
            req.logfoldername = "registration_unit";
            req.refno = this.u_id;
            this.spinner.show();
            debugger
            let responce: any = await this.auth.auth_pkgmasters_service(req);
            if (responce.code) {
              if (responce.Details[0].STATUS == '1') {
                this.alt.success(responce.Details[0].STATUS_TEXT + "<br/>" + responce.Details[0].STATUS_TEXT_TEL);
                this.spinner.hide(); this.clear_inputs();
                setTimeout(() => {
                  window.location.reload();
                }, 2000)
                return;
              }
              else if (responce.Details[0].STATUS == '0') {
                this.alt.warning(responce.Details[0].STATUS_TEXT + "<br/>" + responce.Details[0].STATUS_TEXT_TEL);
                this.spinner.hide();
                return;
              }
              else {
                this.alt.warning(responce.message);
                this.spinner.hide();
                return;
              }
            }
            else {
              this.alt.warning(responce.message);
              this.spinner.hide();
              return;
            }
          } catch (error) {
            this.alt.warning("Something went wrong " + error);
            this.spinner.hide();
            return;
          }
        }
        else {
          return;
        }
      }
      else {
        this.alt.toasterror(' Please Upload Documents');
        return;
      }
    } catch (error) {
      this.alt.warning("Something went wrong " + error);
      this.spinner.hide();
      return;
    }
  }
  clear_inputs() {
    this.user_reg_form = {
      locality: '', email: '', mobileno: '', name_of_functionary: '', gender: '', designation: '', departmentaldesignation: '', state_name: '', district: '', rural_urban: '', mandal: '', village: '',
      dateofposting: '', street_name: '', hsno: '', building_name: '', aadhaarno: '', aadhaarmask: '',
    }

  }
async update_active_status(obj: any): Promise<void> {
        try {
            Swal.fire({
                title: 'Confirm Status Update',
                text: 'Are you sure you want to update the current status of this Registrar? ' + obj.RUF_FULLNAME,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Update Status',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.update_current_status(obj);
                    Swal.fire({
                        title: 'Updated!',
                        text: 'The Registrar status has been successfully updated.',
                        icon: 'success',
                    });
                } else if (result.isDismissed) {
                    Swal.fire({
                        title: 'Action Cancelled',
                        text: 'No changes were made to the hospital status.',
                        icon: 'info',
                    });
                    obj.ISACTIVE = 1;
                }
            });
        } catch (error) {

        }
    }
    async update_current_status(obj: any): Promise<void> {
        try {
            const req = new basemodel();
            req.type = '1012';
            req.param1 = obj.RUF_CODE;
            this.spinner.show();
            let responce: any = await this.auth.auth_pkgmasters_service(req);
            if (responce.code) {
                if (responce.Details[0].STATUS == '1') {
                    this.alt.success(responce.Details[0].STATUS_TEXT);
                    this.get_registrar_details();
                    this.spinner.hide();
                    return;
                }
                else if (responce.Details[0].STATUS == '0') {
                    this.alt.warning(responce.Details[0].STATUS_TEXT);
                    this.spinner.hide();
                    obj.ISACTIVE = 1;
                    return;
                }
                else {
                    this.alt.warning(responce.message);
                    this.spinner.hide();
                    obj.ISACTIVE = 1;
                    return;
                }

            }
            else {
                this.alt.warning(responce.message);
                this.spinner.hide();
                obj.ISACTIVE = 1;
                return;
            }
        } catch (error) {
            this.spinner.hide();
            obj.ISACTIVE = 1;
           
        }
    }

}
