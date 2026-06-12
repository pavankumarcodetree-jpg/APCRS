import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../data_lyr/data.service';
@Injectable({
  providedIn: 'root',
})
export class AuthserService {
  constructor(
    private spinner: NgxSpinnerService,
    private dataconnect: DataService
  ) { }

  async auth_utilities_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(
        req,
        'api/apcrsV1/pkgutilities'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_utilities_service02(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(
        req,
        'api/apcrsV1/pkgutilities_two'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }

  async auth_utilities_rtgs(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect_rtgs(
        req,
        'api/apcrsV1/dashboard'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_utilities_gsws(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect_rtgs(
        req,
        'api/apcrsV1/dashboard_Birth_Death'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgcrs_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgcrs');
    } catch (error) {
      this.spinner.hide();
    }
  }

  async auth_pkgcrsbirth_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgcrsbirth');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgcrsoldbirth_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgcrsoldbirth');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgcrsadoption_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(
        req,
        'api/apcrsV1/pkgcrsadoption'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgcrsdeath_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgcrsdeath');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgcrsolddeath_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgcrsolddeath');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgcrsstillbirth_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(
        req,
        'api/apcrsV1/pkgcrsstillbirth'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgcrsforeignbirth_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(
        req,
        'api/apcrsV1/pkgcrsforeign'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgdashboard_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(
        req,
        'api/apcrsV1/pkgdashboard'
      );
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgmasters_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgmasters');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkginbox_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkginbox');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async pdf_download(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_pdf_download(req, 'api/rpt/cert');

    }
    catch (error) {
      this.spinner.hide();
    }
  }

  async auth_pkgreports01_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgreports01');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgreports02_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgreports02');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgreports03_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgreports03');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgreports04_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgreports04');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgreports05_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgreports05');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_pkgreports06_service(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/pkgreports06');
    } catch (error) {
      this.spinner.hide();
    }
  }
  async auth_Autocompletelog(req: any): Promise<void> {
    try {
      return await this.dataconnect.api_connect(req, 'api/apcrsV1/Autocompletelog');
    } catch (error) {
      this.spinner.hide();
    }
  }

}
