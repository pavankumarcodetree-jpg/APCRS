import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
declare var $: any;
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (options: any, options2: any) => void; // Adjust 'any' to the actual options type if available
    }
}
@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class SharedvalidationModule {


    num: any;
    validateVerhoeff(num: any): boolean {
        if (num.length !== 12) {
            return false;
        }
        if (
            num === '333333333333' ||
            num === '666666666666' ||
            num === '999999999999'
        ) {
            return false;
        }

        const d = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        ];

        // The permutation table
        const p = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
        ];

        // The inverse table
        const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

        let cc;
        let c = 0;
        const myArray = this.StringToReversedIntArray(num);
        for (let i = 0; i < myArray.length; i++) {
            c = d[c][p[i % 8][myArray[i]]];
        }
        cc = c;
        if (cc === 0) {
            return true;
        } else {
            return false;
        }
    }
    StringToReversedIntArray(num: any): any {
        let myArray = [num.length];
        for (let i = 0; i < num.length; i++) {
            myArray[i] = num.substring(i, i + 1);
        }
        myArray = this.Reverse(myArray);
        return myArray;
    }
    Reverse(myArray: any): any {
        const reversed = [myArray.length];
        for (let i = 0; i < myArray.length; i++) {
            reversed[i] = myArray[myArray.length - (i + 1)];
        }
        return reversed;
    }

    exportPdf(exportColumns: any, exceldata: any, filename: any) {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then((x) => {
                const doc = new jsPDF.default('l', 'mm', 'a4');
                doc.autoTable(exportColumns, exceldata);
                doc.save(filename + '.pdf');
            });
        });
    }
    exportExcel(exceldata: any, filename: any) {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(exceldata);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            this.saveAsExcelFile(excelBuffer, filename);
        });
    }
    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }
    clear(table: any) {
        table.clear();
    }

    public exportTableToExcel(tableId: string, fileName: string): void {
        const table = document.getElementById(tableId);
        const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }
    public exportTableToPDF(tableId: string, fileName: string): void {
        const doc = new jsPDF('p', 'pt');
        doc.setFontSize(10);                       
        const table = document.getElementById(tableId);
        if (table) {
            // Extract headers, rows, and footers from the table
            const headers = this.getTableHeaders(table);
            const rows = this.getTableRows(table);
            const footers = this.getTableFooters(table);

            // Use jsPDF's autoTable plugin to generate the PDF
            autoTable(doc, {
                head: headers,
                body: rows,
                foot: footers,
                theme: 'grid',
                styles: { halign: 'center' },
                headStyles: {
                    fillColor: [0, 150, 136],   // PrimeNG theme color
                    textColor: [255, 255, 255], // White text
                    lineColor: [0, 0, 0],       // Black line color for header borders
                    lineWidth: 0.75,            // Set the thickness of the line
                },
            });

            // Save the generated PDF
            doc.save(`${fileName}.pdf`);
        }
    }

    private getTableHeaders(table: HTMLElement): any[][] {
        const headers: any[][] = [];
        const headerRows = table.querySelectorAll('thead tr');
        headerRows.forEach((row) => {
            const headerCells: any[] = [];
            row.querySelectorAll('th').forEach((cell) => {
                const thElement = cell as HTMLTableCellElement; // Cast to HTMLTableCellElement
                headerCells.push({
                    content: thElement.innerText,
                    colSpan: thElement.colSpan, // Access colSpan correctly
                    rowSpan: thElement.rowSpan, // Access rowSpan correctly
                });
            });
            headers.push(headerCells);
        });
        return headers;
    }

    private getTableRows(table: HTMLElement): any[][] {
        const rows: any[][] = [];
        const bodyRows = table.querySelectorAll('tbody tr');
        bodyRows.forEach((row) => {
            const rowCells: any[] = [];
            row.querySelectorAll('td').forEach((cell) => {
                const tdElement = cell as HTMLTableCellElement; // Cast to HTMLTableCellElement
                rowCells.push({
                    content: tdElement.innerText,
                });
            });
            rows.push(rowCells);
        });
        return rows;
    }

    private getTableFooters(table: HTMLElement): any[][] {
        const footers: any[][] = [];
        const footerRows = table.querySelectorAll('tfoot tr');
        footerRows.forEach((row) => {
            const footerCells: any[] = [];
            row.querySelectorAll('td').forEach((cell) => {
                const tdElement = cell as HTMLTableCellElement; // Cast to HTMLTableCellElement
                footerCells.push({
                    content: tdElement.innerText,
                    colSpan: tdElement.colSpan, // Access colSpan correctly
                    rowSpan: tdElement.rowSpan, // Access rowSpan correctly
                });
            });
            footers.push(footerCells);
        });
        return footers;
    }
    private getGroupedTableRows(table: HTMLElement, groupByColumnIndex: number, dataColumns: number[]): any[][] {
        const rows: any[][] = [];
        const bodyRows = table.querySelectorAll('tbody tr');

        const groupedData: { [key: string]: any[] } = {};

        // Group data by the specified column index
        bodyRows.forEach((row) => {
            const rowCells: any[] = [];
            const nameCell = row.querySelectorAll('td')[groupByColumnIndex] as HTMLTableCellElement; // Get the cell to group by
            const groupName = nameCell ? nameCell.innerText : '';

            // Collect data for the specified columns only
            dataColumns.forEach((index) => {
                const cell = row.querySelectorAll('td')[index] as HTMLTableCellElement;
                if (cell) {
                    rowCells.push(cell.innerText);
                }
            });

            if (!groupedData[groupName]) {
                groupedData[groupName] = [];
            }
            groupedData[groupName].push(rowCells);
        });

        // Create rows for autoTable
        Object.keys(groupedData).forEach((groupName) => {
            // Add a row for the group name
            rows.push([{ content: groupName, colSpan: dataColumns.length, styles: { cellWidth: 'auto' } }]);

            // Add the individual entries under this group name
            groupedData[groupName].forEach((entry) => {
                rows.push(entry);
            });
        });

        return rows;
    }
}
