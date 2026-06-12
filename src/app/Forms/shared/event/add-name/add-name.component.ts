import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrivateService } from 'src/app/services/api_lyr/private/private.service';
import * as CryptoJS from 'crypto-js';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';

@Component({
  selector: 'app-add-name',
  // standalone: true,
  // imports: [],
  templateUrl: './add-name.component.html',
  styleUrl: './add-name.component.css'
})
export class AddNameComponent {
  
  secretKey: string = 'codetree123';
  decryptedData: any;

  constructor(private route: ActivatedRoute,
     private pscall: PrivateService,
     private alt: AlertsService,
      private spinner: NgxSpinnerService,
      private auth: AuthserService,
  ) {
    
  }

  decryptData(data: string): any {
    
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  applicationid:any;
  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      const encryptedData = params.get('data');
      if (encryptedData) {
        this.decryptedData = this.decryptData(encryptedData);
        this.applicationid=this.decryptedData;
        console.log(this.decryptedData); // Decrypted data will be logged
      }
    });
this.getdraft_details();
    
  }
 // document_list_array:any[]=[];

  document_list_array = [
    { STATE_CODE: 'AP', STATE_NAME: 'Andhra Pradesh' },
    { STATE_CODE: 'KA', STATE_NAME: 'Karnataka' },
    { STATE_CODE: 'TN', STATE_NAME: 'Tamil Nadu' },
    { STATE_CODE: 'TS', STATE_NAME: 'Telangana' }
  ];
  draft_details_array = {
    firstName:'',
    middleName:'',
    lastName:'',
    childfirstName:'',
    childmiddleName:'',
    childlastName:'',
    Remarks:'',
    addnewdocument:'',
    documenent_descrption:'',
    language: {
      primarylan: 'Telugu',
      secondarylan: 'English',
     // dateofreport: this.datepipe.transform(new Date(), 'dd-MM-yyyy'),
    },
    childinformation: {
      childnotnamed: false,
      dateofbirthmask: '',
      dateofbirth: '',
      confirmdateofbirth: '',
      birttime: '',
      selgender: '',
      selgender_val: '',
      aadhaarmask: '',
      aadhaar: ''
    },
    
    
     

    fatherInformation: {
      father_full_namer: '',
      father_full_namer_t: '',
      father_full_namer_val: '',
      father_surname: '',
      father_surname_t: '',
      father_middlename: '',
      father_middlename_t: '',
      father_surname_val: '',
      father_mobile_number: '',
      father_email_number: '',
      father_aadhhar_number_mask: '',
      father_aadhhar_number: '',
      fathername_value: '',
    },
    motherInformation: {
      mother_full_namer: '',
      mother_full_namer_t: '',
      mother_full_namer_val: '',
      mother_surname: '',
      mother_surname_t: '',
      mother_middle_name: '',
      mother_middle_name_t: '',
      mother_surname_val: '',
      mother_mobile_number: '',
      mother_email_number: '',
      mother_aadhhar_number: '',
      mother_aadhaar_number_mask: '',
      mothername_value: '',
    },
    addressof_parents: {
      addressof: '',
      address_parent_country: '',
      address_parent_country_val: '',
      address_parent_country_address: '',
      address_parent_country_address_t: '',
      address_parent_country_address_val: '',
      address_parent_state: '',
      address_parent_state_val: '',
      address_parent_district: '',
      address_parent_district_val: '',
      address_parent_rural_urabn: '',
      address_parent_rural_urabn_val: '',
      address_parent_mmc: '',
      address_parent_mmc_val: '',
      address_parent_Village_Town: '',
      address_parent_Village_Town_val: '',
      address_parent_pincode: '',
      address_parent_building_name: '',
      address_parent_building_name_t: '',
      address_parent_building_name_val: '',
      address_parent_house_no: '',
      address_parent_house_no_t: '',
      address_parent_house_no_val: '',
      address_parent_street_name: '',
      address_parent_street_name_t: '',
      address_parent_street_name_val: '',
      address_parent_locality: '',
      address_parent_locality_t: '',
      address_parent_postoff: '',
      address_parent_postoff_val: '',
      addressof_parents_value: '',
    },
    Permanent_addressof_parents: {
      address_parent_sameasaddress: '',
      address_parent_addressof: '',
      address_parent_permenent_country: '',
      address_parent_permenent_country_val: '',
      address_parent_permenent_country_address: '',
      address_parent_permenent_country_address_t: '',
      address_parent_permenent_country_address_val: '',
      address_parent_permenent_state: '',
      address_parent_permenent_state_val: '',
      address_parent_permenent_district: '',
      address_parent_permenent_district_val: '',
      address_parent_permenent_mmc: '',
      address_parent_permenent_mmc_val: '',
      address_parent_permenent_rural_urabn: '',
      address_parent_permenent_rural_urabn_val: '',
      address_parent_permenent_village: '',
      address_parent_permenent_village_val: '',
      address_parent_permenent_pincode: '',
      address_parent_permenent_building_no: '',
      address_parent_permenent_building_no_t: '',
      address_parent_permenent_building_no_val: '',
      address_parent_permenent_hose_no: '',
      address_parent_permenent_hose_no_t: '',
      address_parent_permenent_hose_no_val: '',
      address_parent_permenent_street_name: '',
      address_parent_permenent_street_name_t: '',
      address_parent_permenent_street_name_val: '',
      address_parent_permenent_locality: '',
      address_parent_permenent_locality_t: '',
      address_parent_permenent_locality_post_office_val: '',
      address_permenent_postoff: '',
      address_permenent_postoff_val: '',
    },
    placeofbirth: {
      place_of_birth: '',
      place_of_birth_hospital: '',
      place_of_birth_hospital_val: '',
      place_of_birth_state: '',
      place_of_birth_state_val: '',
      place_of_birth_district: '',
      place_of_birth_district_val: '',
      place_of_birth_mmc: '',
      place_of_birth_mmc_val: '',
      place_of_birth_rural_urabn: '',
      place_of_birth_rural_urabn_val: '',
      place_of_birth_village: '',
      place_of_birth_village_val: '',
      place_of_birth_pin_code: '',
      place_of_birth_building_no: '',
      place_of_birth_building_no_t: '',
      place_of_birth_building_no_val: '',
      place_of_birth_house_no: '',
      Place_of_birth_house_no_t: '',
      place_of_birth_house_no_val: '',
      place_of_birth_street_name: '',
      place_of_birth_street_name_t: '',
      place_of_birth_street_name_val: '',
      Place_of_birth_locality: '',
      Place_of_birth_locality_t: '',
      Place_of_birth_locality_val: '',
      Place_of_birth_postoff: '',
      Place_of_birth_postoff_val: '',
      placeofbirth_value: '',
    },
    information: {
      Informant_fullname: '',
      Informant_fullname_t: '',
      Informant_fullname_val: '',
      Informant_email_id: '',
      Informant_mobile_no: '',
      Informant_aadhhar_no_mask: '',
      Informant_aadhhar_no: '',
      Informant_address: '',
      Informant_address_t: '',
      Informant_address_val: '',
      information_value: '',
    }, 
     
  };

 

  dateOfBirth: string = '';
    sex: string = '';
    dateOfReporting: string = '';
    dateOfRegistration: string = '';
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';

    onFileSelected(event: any) {
        // Handle file upload logic here
    }
    suggestions: any;
    async Teluglanguageconvrt(inputkeyval: any, inputsource: any) {
      this.pscall.google_translate(inputkeyval).subscribe(
        (response: any) => {
         
          
          if (response[0] != '') // if (response[0] == 'SUCCESS')
          {
            this.suggestions = response[0][0];//response[0][0][0]
  
            if (inputsource == 'firstName') {
              this.draft_details_array.firstName =
                this.suggestions[0];
            }
            if (inputsource == 'middleName') {
              this.draft_details_array.middleName =
                this.suggestions[0];
            }
            if (inputsource == 'lastName') {
              this.draft_details_array.lastName =
                this.suggestions[0];
            }
            if (inputsource == 'childfirstName') {
              this.draft_details_array.childfirstName =
                this.suggestions[0];
            }
            if (inputsource == 'childmiddleName') {
              this.draft_details_array.childmiddleName =
                this.suggestions[0];
            }
            if (inputsource == 'childlastName') {
              this.draft_details_array.childlastName =
                this.suggestions[0];
            }
//document uploads
if (inputsource == 'addnewdocument') {
  this.draft_details_array.addnewdocument =
    this.suggestions[0];
}
if (inputsource == 'documenent_descrption') {
  this.draft_details_array.documenent_descrption =
    this.suggestions[0];
}

            if (inputsource == 'Remarks') {
              this.draft_details_array.Remarks =
                this.suggestions[0];
            }
          
            
          }
        },
        (error) => {
          console.error('Error transliterating text:', error);
          return '';
        }
      );
    }


    photoselectedFiles: File[] = [];
    fileupload(event: any) {
      
      const files: File[] = event.target.files;
      if (files.length > 1) {
        this.alt.toasterror('Upload Photo(png/jpg)');
        this.photoselectedFiles = [];
        return;
      }
      const checkfilesizetype = Array.from(files);
      const checkcondion = false;
      const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];
      const maxFileSizeMB = 8; // Maximum file size in megabytes
      for (let chc = 0; chc < checkfilesizetype.length; chc++) {
        let type = checkfilesizetype[chc].name;
  
        const fileExtension = checkfilesizetype[chc].name
          .toLowerCase()
          .substr(checkfilesizetype[chc].name.lastIndexOf('.'));
        if (allowedExtensions.indexOf(fileExtension) === -1) {
          this.photoselectedFiles = [];
          this.alt.toasterror('Only PNG and JPG files are allowed.)');
          return;
        }
  
        const fileSizeMB = checkfilesizetype[chc].size / (1024 * 1024);
        if (fileSizeMB > maxFileSizeMB) {
          this.photoselectedFiles = [];
          this.alt.toasterror('File size exceeds the maximum allowed limit.8MB)');
          return;
        }
      }
      const file = event.target.files?.[0];
  
      if (file) {
        this.readImage(file);
        
      }
      this.photoselectedFiles = Array.from(files);
     // this.draft_details.docfile.push(this.photoselectedFiles);
    }

    imageSrc: string | ArrayBuffer | null = null;
    readImage(file: File): void {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        if (e.target) {
          this.imageSrc = e.target.result;
        }
      };
  
      reader.readAsDataURL(file);
    }

    documentlist: any[] = [];
    // async Savephotoupload(obj: any) {
    //   if (
    //     this.photoselectedFiles.length == 0 &&
    //     this.notifyResolutionDocInput.nativeElement.value != ''
    //   ) {
    //     this.alt.toasterror(' Please Upload Documents');
    //     return;
    //   } else {
    //     this.spinner.show();
    //     if (this.photoselectedFiles.length != 0) {
    //       let filename = 'sample' + '_' + 'TP';
    //       if (this.photoselectedFiles.length > 0) {
    //         let maxlen = 0;
    //         let uploadcheck = 0;
    //         maxlen = this.photoselectedFiles.length;
    //         for (let ph = 0; ph < maxlen; ph++) {
    //           this.photofilepath = '';
    //           const phform = new FormData();
    //           phform.append('file', this.photoselectedFiles[ph]);
    //           phform.append('input01', 'Documents');
    //           phform.append('input02', 'Sample');
    //           phform.append('input03', 'PDF');
    //           phform.append('input04', filename);
    //           phform.append('userid', 'Sample');
    //           phform.append('type', 'InsertJson');
    //           await this.httpClient
    //             .post(this.contentuploadurl_img, phform)
    //             .subscribe((res) => {
    //               let rsdata: any = res;
    //               if (rsdata.code) {
    //                 uploadcheck++;
    //                 if (rsdata.code) {
    //                   
  
    //                   this.notifyResolutionDocInput.nativeElement.value = '';
    //                   let item = {
    //                     documenttype: 'Documentproof',
    //                     documentdescription: 'Document',
    //                     url:
    //                       this.mid.globalsetting.api_url_conent_show + rsdata.url,
    //                   };
    //                   this.documentlist.push(item);
    //                   this.spinner.hide();
    //                   /* this.documentlist = [
    //                                       {
    //                                         documentdescription: 'Sample Image',
    //                                         documenttype: 'Imageproof',
    //                                         url: 'https://via.placeholder.com/150',
    //                                       },
    //                                       {
    //                                         documentdescription: 'Sample PDF',
    //                                         documenttype: 'Documentproof',
    //                                         url: 'https://sportsapi.ap.gov.in/crsapi/contentpath/img/Documents/20241207/Sample/SamplePDF2024120709375068536_sample_TP.pdf',
    //                                       },
    //                                     ]; */
    //                   console.log(this.documentlist);
  
    //                   return;
    //                 } else if (rsdata.code && rsdata.Details[0].STATUS == '0') {
    //                   this.spinner.hide();
    //                   this.alt.toastinfo(rsdata.Details[0].STATUS_TEXT);
    //                   return;
    //                 } else {
    //                   this.spinner.hide();
    //                   this.alt.toasterror(rsdata.message);
    //                   return;
    //                 }
    //               } else {
    //                 this.spinner.hide();
    //                 this.alt.toasterror(rsdata.message);
    //                 return;
    //               }
    //             });
    //         }
    //       }
    //     }
    //   }
    // }

    async getdraft_details(): Promise<void> {
      try {
        
        let rsdata: any
        const req = new basemodel();
        this.spinner.show();
        req.type = '1002';
        req.param1 = this.applicationid;
        req.param2 = 'BIRTH';
        rsdata = await this.auth.auth_pkgcrsbirth_service(req);
        this.spinner.hide();
        if (rsdata.code) {
          if (rsdata.code && rsdata.Details[0].STATUS == '1') {
            
            this.draft_details_array = JSON.parse(rsdata.Details[0].JSON_RESULT);
          console.log(this.draft_details_array);
          }
          if (rsdata.code && rsdata.Details[0].STATUS == '0') {
            this.alt.toasterror(
              rsdata.Details[0].STATUS_TEXT +
                '<br>' +
                rsdata.Details[0].STATUS_TEXT_TEL
            );
          }
        } else {
          this.spinner.hide();
        }
      } catch (error) {
        this.spinner.hide();
       
      }
    }
    draft_details = {
      firstName:'',
      middleName:'',
      lastName:'',
      childfirstName:'',
      childmiddleName:'',
      childlastName:'',
      Remarks:'',
      addnewdocument:'',
      documenent_descrption:'',
      docfile:[]
    }
    btnApprove() {
      if(this.draft_details.firstName=='')
      {
        this.alt.warning("First Name / మొదటి పేరు is required");
        return;
      }
      else if(this.draft_details.middleName==''){
        this.alt.warning("Middle Name / మధ్య పేరు is required");
        return;
      }
      else if(this.draft_details.lastName==''){
        this.alt.warning("Last Name / చివరి పేరు is required");
        return;
      }
      else if(this.draft_details.childfirstName==''){
        this.alt.warning("First Name / మొదటి పేరు is required");
        return;
      }
      else if(this.draft_details.childmiddleName==''){
        this.alt.warning("Middle Name / మధ్య పేరు is required");        
        return;
      }
      else if(this.draft_details.childlastName==''){
        this.alt.warning("Last Name / చివరి పేరు is required");
        return;
      }      
      else if(this.draft_details.addnewdocument==''  || this.draft_details.addnewdocument==null || this.draft_details.addnewdocument==undefined){
        this.alt.warning("Documents / డాక్యుమెంట్లు is required");
        return;
      }
      else if(this.draft_details.documenent_descrption==''){
        this.alt.warning("Documenent Descrption / డాక్యుమెంట్ యొక్క వివరాలు is required");
        return;
      }
      else if(this.draft_details.documenent_descrption==''){
        this.alt.warning("Documenent Descrption / డాక్యుమెంట్ యొక్క వివరాలు is required");
        return;
      }
      // else if( this.photoselectedFiles==''){
      //   this.alt.warning("Documenent Descrption / డాక్యుమెంట్ యొక్క వివరాలు is required");
      //   return;
      // }
      else if(this.draft_details.Remarks==''){
        this.alt.warning("Remarks / వ్యాఖ్యలు is required");
        return;
      }
      else{
//this.getdraftinsert();
      }
       
    }
    applicationsubmittype="Legal";
    brapplicationid: any;
    RU_CODE: any;
    async getdraftinsert(): Promise<void> {
      try {
        const req = new basemodel();
        req.type = '1001';
        req.param1 = this.brapplicationid;
        req.param2 = 'NEW';
        req.param3 = this.RU_CODE;
        req.param5=this.applicationsubmittype;
        req.json2 = this.draft_details;
        this.spinner.show();
       
        let rsdata: any = await this.auth.auth_pkgcrsstillbirth_service(req);
        this.spinner.hide();
        if (rsdata.code) {
          if (rsdata.code && rsdata.Details[0].STATUS == '1') {
            this.getdraft_details();
             this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
          }
          if (rsdata.code && rsdata.Details[0].STATUS == '0') {
             this.alt.toasterror(rsdata.Details[0].STATUS_TEXT+rsdata.Details[0].STATUS_TEXT_TEL);
          }
        } else {
          this.alt.toasterror('Error: Draft could not be saved.');
  
          this.spinner.hide();
        }
      } catch (error) {
        this.spinner.hide();
       
      }
    }

 

    

}
