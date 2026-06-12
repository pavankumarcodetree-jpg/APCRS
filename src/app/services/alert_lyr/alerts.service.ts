import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  toastsuccess(message: string) {
    this.toastr.success(message, 'Success');

    
  }
  
  toastwarning(message: string) {
    this.toastr.warning(message, 'Alert!');
  }
  toasterror(message: string) {
    this.toastr.error(message, 'Alert!');
  }
  toastinfo(message: string) {
    this.toastr.info(message, 'Alert!');
  }
  info(message: string): void{
    Swal.fire('info', message, 'info');
  }

  error(message: string): void{
    Swal.fire('error', message, 'error');
  }

  success(message: string): void{
    Swal.fire('info', message, 'success');
  }

  warning(message: string): void{
    Swal.fire('info', message, 'warning');
  }
}