import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from 'src/app/services/alert_lyr/alerts.service';
import { EncDecService } from 'src/app/services/enc_dec_lyr/enc-dec.service';
import { basemodel } from 'src/app/thirparty/model/apimodel';
import { AuthserService } from 'src/app/services/api_lyr/private/authser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrl: './draft.component.css'
})
export class DraftComponent {
constructor(
    private spinner: NgxSpinnerService,
    private auth: AuthserService,
    private alt: AlertsService,
    private encdc: EncDecService,
    private router: Router,
    private http: HttpClient
  ) {}

  RU_CODE: any;

  status:string = '2';

  ngOnInit() {
    if (sessionStorage.getItem('_Uenc') !== '') {
      let obj: any = this.encdc.Getuser();
      if (obj != '' && obj != undefined && obj != null) {
        this.RU_CODE = obj[0].RU_CODE;
        this.get_birth_depth_cards_counts();
        this.get_birth_depth_table('BIRTH');
      } else {
        this.encdc.Usersessionkill();
      }
    } else {
      this.encdc.Usersessionkill();
      this.router.navigate(['/Sessionexpired']);
    }
  }

  ischeckednodal() {
    throw new Error('Method not implemented.');
  }
  confirm_check_1() {
    throw new Error('Method not implemented.');
  }
  onGridReady($event: any) {
    throw new Error('Method not implemented.');
  }
  budget_modal_close() {
    throw new Error('Method not implemented.');
  }
  isspinnershow: any;
  // indox counts start
  birth_depth_counts_array: any[] = [];
  async get_birth_depth_cards_counts(): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '10001';
      let responce: any = await this.auth.auth_pkginbox_service(req);
      this.birth_depth_counts_array = [];
      this.spinner.show();
      
      if (responce.code) {
        this.spinner.hide();
        this.birth_depth_counts_array = responce.Details;
        return;
      } else {
        this.spinner.hide();
        this.birth_depth_counts_array = [];
        return;
      }
    } catch (error) {
     
      this.birth_depth_counts_array = [];
      this.spinner.hide();
      return;
    }
  }

 
  application_flow_array:any[]=[];
  async applicationflow(col:any): Promise<void>{
   try {
     const req = new basemodel();
     req.type = '1024';
     req.param1=col.APPLICATION_ID;
     this.spinner.show();
     this.application_flow_array = [];
     let responce: any = await this.auth.auth_pkginbox_service(req);
     this.spinner.hide();
     if (responce.code) {
       this.application_flow_array = responce.Details;
     } else {
       this.application_flow_array = [];
       this.spinner.hide();
     }
   } catch (error) {
     this.spinner.hide();
    
   }
  }

  birth_depth_table_array: any[] = [];
  table_card_select = 'BIRTH';
  async get_birth_depth_table(type: any): Promise<void> {
    try {
      this.table_card_select = type;
      const req = new basemodel();
      req.type = '10011';
      req.param1=type;
      req.param2='DRAFT';
      let responce: any = await this.auth.auth_pkginbox_service(req);
      this.birth_depth_table_array = [];
      this.spinner.show();
      debugger
      if (responce.code) {
        this.spinner.hide();
        this.birth_depth_table_array = responce.Details;
        return;
      } else {
        this.spinner.hide();
        this.birth_depth_table_array = [];
        return;
      }
    } catch (error) {
     
      this.birth_depth_table_array = [];
      this.spinner.hide();
      return;
    }
  }
  viewmodel = 'INBOX';
  brapplicationid: any;
  preview_tittle = "";
  getproceed(obj: any) {

    if(obj!=null && obj.APPLICATION_ID!=null){
      this.brapplicationid="";
      this.brapplicationid = obj.APPLICATION_ID;
      if(this.table_card_select=='BIRTH'){
        this.preview_tittle = "Birth Registration Application Preview / జనన నమోదు దరఖాస్తు ప్రివ్యూ";
        this.viewmodel = this.table_card_select;
      }
      if(this.table_card_select=='DEATH'){
        this.preview_tittle = "Death Registration Application Preview / మరణ నమోదు దరఖాస్తు ప్రివ్యూ";
        this.viewmodel = this.table_card_select;
      }
      if(this.table_card_select=='STILLBIRTH'){
        this.preview_tittle = "Stillbirth Registration Application Preview / చనిపోయి పుట్టిన శిశువు నమోదు దరఖాస్తు ప్రివ్యూ";
        this.viewmodel = this.table_card_select;
      }
      if(this.table_card_select=='ADOPTION'){
        this.preview_tittle = "Adoption Registration Application Preview / దత్తత నమోదు దరఖాస్తు ప్రివ్యూ";
        this.viewmodel = this.table_card_select;
      }
    }
    else{
      this.alt.toasterror('invalid application');
    }
   
    
  }
  async viewHistory() {
    if(this.table_card_select=='BIRTH'){
      this.preview_tittle = "Birth Application History / జనన నమోదు దరఖాస్తు వివరాలు";
      this.viewmodel = "HISTORY"; 
    }
    if(this.table_card_select=='DEATH'){
      this.preview_tittle = "Death Application History / మరణ నమోదు దరఖాస్తు వివరాలు";
      this.viewmodel = "HISTORY"; 
    }
    if(this.table_card_select=='STILLBIRTH'){
      this.preview_tittle = "Stillbirth Application History / చనిపోయి దరఖాస్తు వివరాలు";
      this.viewmodel = "HISTORY"; 
    }
    if(this.table_card_select=='ADOPTION'){
      this.preview_tittle = "Adoption Application History / దత్తత దరఖాస్తు వివరాలు";
      this.viewmodel = "HISTORY"; 
    }
   
   }
   async showInfo() {
    if(this.table_card_select=='BIRTH'){
      this.preview_tittle = "Birth Application Information / జనన నమోదు దరఖాస్తు సమాచారం";
      this.viewmodel = "INFO"; 
    }
    if(this.table_card_select=='DEATH'){
      this.preview_tittle = "Death Application Information / మరణ నమోదు దరఖాస్తు సమాచారం";
      this.viewmodel = "INFO"; 
    }
    if(this.table_card_select=='STILLBIRTH'){
      this.preview_tittle = "Stillbirth Application Information / చనిపోయి దరఖాస్తు సమాచారం";
      this.viewmodel = "INFO"; 
    }
    if(this.table_card_select=='ADOPTION'){
      this.preview_tittle = "Adoption Application Information / దత్తత దరఖాస్తు సమాచారం";
      this.viewmodel = "INFO"; 
    }
   
   }
  
  async Backwindow() {
    this.viewmodel = 'INBOX';
   }
   drafttype='BIRTH';
   onEdit(obj:any){  
    if(obj!=null && obj.APPLICATION_ID!=null){
      this.brapplicationid="";
      this.brapplicationid = obj.APPLICATION_ID;
      if(this.table_card_select=='BIRTH'){
        this.preview_tittle = "Birth Registration Application Edit / జనన నమోదు దరఖాస్తు సవరణ";
        this.viewmodel = this.table_card_select;
        this.drafttype = 'BIRTHEDIT'; 

      if(obj.APPLICATION_TYPE == 'FOREIGNBIRTH'){
        this.preview_tittle = "Foreign Birth Registration Application Edit / జనన నమోదు దరఖాస్తు సవరణ";
        this.viewmodel = 'FOREIGNBIRTH';
        this.drafttype = 'FOREIGNBIRTHEDIT';
      }
      if(obj.APPLICATION_TYPE == 'ADOPTION'){
        this.preview_tittle = "Adoption Registration Application Edit / దత్తత నమోదు దరఖాస్తు సవరణ";
        this.viewmodel = 'ADOPTION';
        this.drafttype = 'ADOPTIONEDIT';
      }
      }
      if(this.table_card_select=='DEATH'){
        this.preview_tittle = "Death Registration Application Edit / మరణ నమోదు దరఖాస్తు సవరణ";
        this.viewmodel = this.table_card_select;
        this.drafttype = 'DEATHEDIT';
      }
      if(this.table_card_select=='STILLBIRTH'){
        this.preview_tittle = "Stillbirth Registration Application Edit / చనిపోయి పుట్టిన శిశువు నమోదు దరఖాస్తు సవరణ";
        this.viewmodel = this.table_card_select;
        this.drafttype = 'STILLBIRTHEDIT';
      }
      // if(this.table_card_select=='ADOPTION'){
      //   this.preview_tittle = "Adoption Registration Application Edit / దత్తత నమోదు దరఖాస్తు సవరణ";
      //   this.viewmodel = this.table_card_select;
      //   this.drafttype = 'ADOPTIONEDIT';

      // }
     
    }
    else{
      this.alt.toasterror('invalid application');
    }
   }

     draftdelteconfrimation(obj:any) {
       Swal.fire({
         title: 'Are You Sure Do You Want to Delete Draft?',
         text: 'Draft Delete!',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Yes',
         cancelButtonText: 'No',
       }).then((result: any) => {
         if (result.value) {
           this.draftdelte(obj);
         } else if (result.dismiss === Swal.DismissReason.cancel) {
           Swal.fire('Cancelled', 'Draft Delete Cancelled', 'info');
         }
       });
     }
   
     async draftdelte(obj:any): Promise<void> {
       try {
         const req = new basemodel();
         req.type = '1006';
         req.param1 = obj.APPLICATION_ID;
         this.spinner.show();let rsdata: any;
         if(this.table_card_select=='BIRTH'){
          rsdata = await this.auth.auth_pkgcrsbirth_service(req);
         }
         if(this.table_card_select=='DEATH'){
          rsdata= await this.auth.auth_pkgcrsdeath_service(req);
         }
         if(this.table_card_select=='STILLBIRTH'){
          rsdata= await this.auth.auth_pkgcrsstillbirth_service(req);
         }
         if(this.table_card_select=='ADOPTION'){
          rsdata= await this.auth.auth_pkgcrsadoption_service(req);
         }
         this.spinner.hide();
         if (rsdata.code) {
           if (rsdata.code && rsdata.Details[0].STATUS == '1') {
   
             setTimeout(() => {
               window.location.reload();
             }, 3000);
             this.alt.toastsuccess(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
           }
           if (rsdata.code && rsdata.Details[0].STATUS == '0') {
             this.alt.toasterror(rsdata.Details[0].STATUS_TEXT + rsdata.Details[0].STATUS_TEXT_TEL);
           }
         } else {
           this.alt.toasterror('draft delete fail.');
           this.spinner.hide();
         }
       } catch (error) {
         this.spinner.hide();
        
       }
     }
}
