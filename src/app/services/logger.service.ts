import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() {}

  logSuccess(message: string, data?: any): void {
    console.log(`✅ SUCCESS: ${message}`, data);
    this.saveLog('SUCCESS', message, data);
  }

  logError(message: string, error?: any): void {
    console.error(`❌ ERROR: ${message}`, error);
    this.saveLog('ERROR', message, error);
  }

  private saveLog(type: string, message: string, data?: any): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type,
      message,
      data: data ? JSON.stringify(data) : ''
    };

    // Store logs in LocalStorage (Client-side)
    const logs = JSON.parse(localStorage.getItem('appLogs') || '[]');
    logs.push(logEntry);
    localStorage.setItem('appLogs', JSON.stringify(logs));
  }

  // Retrieve logs from local storage
  getLogs(): any[] {
    return JSON.parse(localStorage.getItem('appLogs') || '[]');
  }

  // Generate and download log file
  downloadLogs(): void {
    const logs = this.getLogs();
    let logContent = logs.map(log => `${log.timestamp} - ${log.type}: ${log.message} - ${log.data}`).join('\n');

    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
}
