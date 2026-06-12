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
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css',
})
export class InboxComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private auth: AuthserService,
    private alt: AlertsService,
    private encdc: EncDecService,
    private router: Router,
    private http: HttpClient
  ) {}

  RU_CODE: any;
  UROLE: any;

  status:string = '2';

  ngOnInit() {
    if (sessionStorage.getItem('_Uenc') !== '') {
      let obj: any = this.encdc.Getuser();
      if (obj != '' && obj != undefined && obj != null) {
        this.RU_CODE = obj[0].RU_CODE;
        this.UROLE = obj[0].UROLE;
        this.statuses = [
          { label: "BIRTH", value: "BIRTH" },
          { label: "FOREIGNBIRTH", value: "FOREIGNBIRTH" },
          { label: "ADOPTION", value: "ADOPTION" },
          { label: "OLDBIRTH", value: "OLDBIRTH" },
      ];
        this.get_birth_depth_cards_counts();
        this.get_registration_counts('BIRTH');
        this.getsubcounts('BIRTH','NEWEVENT');
      //  this.getsubcounts('BIRTH','HISTORY');
        //this.get_birth_depth_table('BIRTH');
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
      req.type = '1000';
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

  registration_counts_array: any[] = [];
  async get_registration_counts(type: any): Promise<void> {
    try {
      const req = new basemodel();
      req.type = '1001';
      req.param1 = type;
      let responce: any = await this.auth.auth_pkginbox_service(req);
      this.registration_counts_array = [];
      this.spinner.show();
      
      if (responce.code) {
        this.spinner.hide();
        this.registration_counts_array = responce.Details;
        return;
      } else {
        this.spinner.hide();
        this.registration_counts_array = [];
        return;
      }
    } catch (error) {
     
      this.registration_counts_array = [];
      this.spinner.hide();
      return;
    }
  }

  birth_depth_table_array: any[] = [];
  table_card_select = 'BIRTH';
  async get_birth_depth_table(type: any): Promise<void> {
    try {
      this.table_card_select = type;
      const req = new basemodel();
      req.type = '2001';
      req.param1 = type;
      let responce: any = await this.auth.auth_pkginbox_service(req);
      this.birth_depth_table_array = [];
      this.spinner.show();
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
  applicationid: any;
  NAC_application_Id: any;
  preview_tittle = "";
  getproceed(obj: any) {

    if(obj!=null && obj.APPLICATION_ID!=null){
      this.applicationid="";
      this.applicationid = obj.APPLICATION_ID;
      this.NAC_application_Id = obj.NAC_APPLICATION_ID;
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
  typeofcorrection:any;applicationregid:any;applicationtype:any="NEW";drafttype='BIRTH'; applicationregnumber:any;
  oldbirthview:any;  olddeathview:any;
  getCorrection(obj:any,type:any,subtype:any){   
    
    if(obj!=null && obj.APPLICATION_ID!=null){
      this.applicationid="";
      this.applicationid = obj.APPLICATION_ID;
      this.applicationregid=obj.REGISTRATION_ID;
      this.applicationregnumber=obj.REGISTRATION_ID;
      this.applicationtype=obj.APPLICATION_TYPE;
      this.NAC_application_Id = obj.NAC_APPLICATION_ID;
      if(type=='BIRTH'){
        this.preview_tittle = "Birth Correction / జనన దిద్దుబాటు";
        this.viewmodel="BIRTHClarification";
        if(subtype=='CLARIFICATION'){
          this.preview_tittle = "Birth Clarification / జనన వివరణలు";
          this.typeofcorrection="Clarification";
        }
        if(subtype=='CORRECTION'){
          this.typeofcorrection="Correction";
        }
        if(obj.APPLICATION_TYPE=='BIRTH' && subtype=='CANCELLATION' && this.UROLE != 101){
          this.preview_tittle = "Cancel Birth / జననాన్ని రద్దు చేయండి";
          this.viewmodel = "BirthCancellation";
          this.typeofcorrection = "Cancellation"; 
        } 

        if(obj.APPLICATION_TYPE=='BIRTH' && subtype=='CANCELLATION' && this.UROLE == 101){
          this.preview_tittle = "Cancel Birth / జననాన్ని రద్దు చేయండి";
          this.viewmodel = "BirthSeekClarification";
          this.typeofcorrection = "Cancellation";

        }
        if(obj.APPLICATION_TYPE=='OLDBIRTH' && subtype=='CANCELLATION'){
          this.preview_tittle = "Cancel Birth / జననాన్ని రద్దు చేయండి";
          this.viewmodel = "OldBirthCancellation";
          this.typeofcorrection = "Cancellation";
          this.oldbirthview = "cancellationView";

        }
        if(obj.APPLICATION_TYPE=='BIRTH' && subtype=='DRAFT'){
          this.preview_tittle = "Birth Registration Application Edit / జనన నమోదు దరఖాస్తు సవరణ";
          this.viewmodel = "BIRTHEDIT";
          this.typeofcorrection = "Draft";
          this.drafttype = 'BIRTHEDIT'; 
        }
        if(obj.APPLICATION_TYPE=='ADOPTION' && subtype=='CANCELLATION'){
          this.preview_tittle = "Cancel Adoption / దత్తత రద్దు చేయండి";
          this.viewmodel = "AdoptionCancellation";
          this.typeofcorrection = "Cancellation";

        }
        if(obj.APPLICATION_TYPE=='ADOPTION' && subtype=='DRAFT'){
          this.preview_tittle = "Adoption Registration Application Edit / దత్తత నమోదు దరఖాస్తు సవరణ";
          this.viewmodel = "ADOPTIONEDIT";
          this.typeofcorrection = "Draft";
          this.drafttype = 'ADOPTIONEDIT'; 
        }
        if(obj.APPLICATION_TYPE=='FOREIGNBIRTH' && subtype=='CANCELLATION'){
          this.preview_tittle = "Cancel Foreign Birth / విదేశీ జనన రద్దు చేయండి";
          this.viewmodel = "AdoptionCancellation";
          this.typeofcorrection = "Cancellation";

        }
        if(obj.APPLICATION_TYPE=='FOREIGNBIRTH' && subtype=='DRAFT'){
          this.preview_tittle = "Foreign Birth Registration Application Edit / విదేశీ జనన నమోదు దరఖాస్తు సవరణ";
          this.viewmodel = "FOREIGNBIRTHEDIT";
          this.typeofcorrection = "Draft";
          this.drafttype = 'FOREIGNBIRTHEDIT'; 
        }
        if(obj.APPLICATION_TYPE=='OLDBIRTH' && subtype=='DRAFT'){
          this.preview_tittle = "Old Birth Registration Application Edit / పాత జనన నమోదు దరఖాస్తు సవరణ";
          this.viewmodel = "OLDBIRTHEDIT";
          this.typeofcorrection = "Draft";
          this.drafttype = 'OLDBIRTHEDIT'; 
        }
      }
      if(type=='STILLBIRTH'){
        this.preview_tittle = "Still Birth Correction / చనిపోయి పుట్టిన శిశువు దిద్దుబాటు";
        this.viewmodel="STILLBIRTHClarification";
        if(subtype=='CLARIFICATION'){
          this.preview_tittle = "Still Birth Clarification / చనిపోయి పుట్టిన శిశువు వివరణలు";
          this.typeofcorrection="Clarification";
        }
        if(subtype=='CORRECTION'){
          this.typeofcorrection="Correction";
        }
        if(subtype=='CANCELLATION'){
          this.preview_tittle = "Cancel Still Birth / చనిపోయి పుట్టిన శిశువు రద్దు చేయండి";
          this.viewmodel = "StillbirthCancellation";
          this.typeofcorrection = "Cancellation";
          
        }
        if(subtype=='DRAFT'){
          this.preview_tittle = "Stillbirth Registration Application Edit / చనిపోయి పుట్టిన శిశువు నమోదు దరఖాస్తు సవరణ";
          this.viewmodel = "STILLBIRTHEDIT";
          this.typeofcorrection = "Draft";
          this.drafttype = 'STILLBIRTHEDIT'; 
        }
      }
      if(type=='DEATH'){
        this.preview_tittle = "Death Correction / చనిపోయి దిద్దుబాటు";
        this.viewmodel="DEATHClarification";
        if(subtype=='CLARIFICATION'){
          this.preview_tittle = "Death Clarification / మరణ వివరణలు";
          this.typeofcorrection="Clarification";
        }
        if(subtype=='CORRECTION'){
          this.typeofcorrection="Correction";
        }
        if(obj.APPLICATION_TYPE=='DEATH' && subtype=='CANCELLATION' && this.UROLE != 101){
          this.preview_tittle = "Cancel Death / మరణాన్ని రద్దు చేయండి";
          this.viewmodel = "DeathCancellation";
          this.typeofcorrection = "Cancellation"; 
        } 

        if(obj.APPLICATION_TYPE=='DEATH' && subtype=='CANCELLATION' && this.UROLE == 101){
          this.preview_tittle = "Cancel Death / మరణాన్ని రద్దు చేయండి";
          this.viewmodel = "DeathSeekClarification";
          this.typeofcorrection = "Cancellation";

        }
        // if(subtype=='CANCELLATION'){
        //   this.preview_tittle = "Cancel Death / మరణాన్ని రద్దు చేయండి";
        //   this.viewmodel = "DeathCancellation";
        //   this.typeofcorrection = "Cancellation";

        // }
        if(obj.APPLICATION_TYPE=='OLDDEATH' && subtype=='CANCELLATION'){
          this.preview_tittle =  "Cancel Death / మరణాన్ని రద్దు చేయండి";
          this.viewmodel = "OldDeathCancellation";
          this.typeofcorrection = "Cancellation";
          this.olddeathview = "cancellationView";

        }
        if(obj.APPLICATION_TYPE=='DEATH' && subtype=='DRAFT'){
          this.preview_tittle = "Death Registration Application Edit / మరణ నమోదు దరఖాస్తు సవరణ";
          this.viewmodel = "DEATHEDIT";
          this.typeofcorrection = "Draft";
          this.drafttype = 'DEATHEDIT'; 
        }
        if(obj.APPLICATION_TYPE=='OLDDEATH' && subtype=='DRAFT'){
          this.preview_tittle = "Old Death Registration Application Edit / పాత మరణ నమోదు దరఖాస్తు సవరణ";
          this.viewmodel = "OLDDEATHEDIT";
          this.typeofcorrection = "Draft";
          this.drafttype = 'OLDDEATHEDIT'; 
        }
      }
      // if(type=='ADOPTION'){
      //   if(subtype=='CANCELLATION'){
      //     this.preview_tittle = "Cancel Adoption / దత్తత రద్దు చేయండి";
      //     this.viewmodel = "AdoptionCancellation";
      //     this.typeofcorrection = "Cancellation";

      //   }
      //   if(subtype=='DRAFT'){
      //     this.preview_tittle = "Adoption Registration Application Edit / దత్తత నమోదు దరఖాస్తు సవరణ";
      //     this.viewmodel = "ADOPTIONEDIT";
      //     this.typeofcorrection = "Draft";
      //     this.drafttype = 'ADOPTIONEDIT'; 
      //   }
      // }
      
        
    }
    else{
      this.alt.toasterror('invalid application');
    }
  }
  documentlist: any[] = [];isdocModalVisible: boolean = false;
  async get_document_details(obj:any): Promise<void> {
    try {
      this.applicationid = obj.APPLICATION_ID;
      this.applicationregid=obj.REGISTRATION_ID;
      this.applicationtype=obj.APPLICATION_TYPE;
      this.NAC_application_Id = obj.NAC_APPLICATION_ID;
      const req = new basemodel();
      req.type = '1016';
      req.param1 = this.applicationregid;
      req.param2 = this.applicationid;
      this.spinner.show();
      this.documentlist = [];
      let rsdata: any = await this.auth.auth_pkgcrsbirth_service(req);
      this.spinner.hide();
      
      if (rsdata.code) {
        this.isdocModalVisible = true;
        this.documentlist = rsdata.Details;
      } else {
        this.documentlist = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();

    }
  }
  DocModalCLose() {
    this.isdocModalVisible = false;
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
        console.log('application_flow_array',this.application_flow_array)
      } else {
        this.application_flow_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
   }
   statuses: any[] = [];
  async Backwindow() {
    this.viewmodel = 'INBOX';
   }
   subcounts_array:any[]=[];
   table_card_sub_select:any;
   async getsubcounts(col:any,type:any): Promise<void>{
    try {
      this.table_card_select = col;
      this.table_card_sub_select = type;
      this.statuses = [];
      if(col=='BIRTH'){
        this.statuses = [
          { label: "BIRTH", value: "BIRTH" },
          { label: "FOREIGNBIRTH", value: "FOREIGNBIRTH" },
          { label: "ADOPTION", value: "ADOPTION" },
          { label: "OLDBIRTH", value: "OLDBIRTH" },
      ];
      }
      else if(col=='DEATH'){
        this.statuses = [
          { label: "DEATH", value: "DEATH" },
          { label: "OLDDEATH", value: "OLDDEATH" },
      ];
      }else{
        this.statuses = [
          { label: col, value: col },
      ];
      }
      const req = new basemodel();
      req.type = '10011';
      req.param1=col;
      req.param2=type;
      this.spinner.show();
      this.birth_depth_table_array = [];  
      let responce: any = await this.auth.auth_pkginbox_service(req);
      this.spinner.hide();
      debugger
      if (responce.code) {
        this.birth_depth_table_array = responce.Details;
      
      } else {
        this.birth_depth_table_array = [];
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
     
    }
   }
   draftDeleteConfirmation(obj:any) {
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
            if(obj.APPLICATION_TYPE=='BIRTH'){
             rsdata = await this.auth.auth_pkgcrsbirth_service(req);
            }
            if(obj.APPLICATION_TYPE=='DEATH'){
             rsdata= await this.auth.auth_pkgcrsdeath_service(req);
            }
            if(obj.APPLICATION_TYPE=='STILLBIRTH'){
             rsdata= await this.auth.auth_pkgcrsstillbirth_service(req);
            }
            if(obj.APPLICATION_TYPE=='ADOPTION'){
             rsdata= await this.auth.auth_pkgcrsadoption_service(req);
            }
            if(obj.APPLICATION_TYPE=='FOREIGNBIRTH'){
              rsdata= await this.auth.auth_pkgcrsforeignbirth_service(req);
             }
             if(obj.APPLICATION_TYPE=='OLDBIRTH'){
              rsdata= await this.auth.auth_pkgcrsoldbirth_service(req);
             }
             if(obj.APPLICATION_TYPE=='OLDDEATH'){
              rsdata= await this.auth.auth_pkgcrsolddeath_service(req);
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
