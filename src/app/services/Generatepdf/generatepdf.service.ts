import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Injectable({
    providedIn: 'root'
})
export class GeneratepdfService {

    private uploadUrl = 'https://aadudamandhra8.ap.gov.in/uploadapi/api/upload/content'; // replace with your endpoint
    constructor(private httpClient: HttpClient,) { }
    public generatePdf(elementId: string, fileName: string): void {
        const element = document.getElementById(elementId);
        if (element) {
            html2canvas(element).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('landscape'); // Specify landscape mode
                const imgWidth = 297;  // A4 width in mm for landscape
                const pageHeight = 210; // A4 height in mm for landscape
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                // pdf.save(fileName);
                const pdfBlob = pdf.output('blob');
                const phform = new FormData();
                phform.append('file', pdfBlob, fileName);
                phform.append('input01', "Test_DP");
                phform.append('input02', "12093@8899");
                phform.append('input03', 'PDF');
                phform.append('input04', "Ayyappa");
                phform.append('userid', "8899");
                this.httpClient.post(this.uploadUrl, phform).subscribe(response => {
                    // alert(JSON.stringify(response));

                    return
                }, error => {
                    // alert('Upload error' + error);
                    return;
                });
            });
        }
    }
}
