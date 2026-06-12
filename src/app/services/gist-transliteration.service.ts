import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GistTransliterationService {

  private baseUrl = 'https://gisttransserver.in/transliteration'; // Replace with the actual endpoint
  private apiKey = 'YOUR_API_KEY_HERE'; // Replace with your API key or credentials

  constructor(private http: HttpClient) {}

  transliterate(inputText: string, langCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`, // If authorization is required
    });

    const body = {
      input: inputText,
      lang: langCode,
    };

    return this.http.post(`${this.baseUrl}`, body, { headers });
  }
}
