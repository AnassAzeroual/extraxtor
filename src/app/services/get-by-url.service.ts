import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetByUrlService {
  httpOptions = {
    headers: new HttpHeaders({ "Access-Control-Allow-Origin": "https://quiet-stream-11534.herokuapp.com" })
  };
  constructor(private http: HttpClient) { }

  getByURL(url: string) {
    return this.http.post("http://localhost:3000/getHTML", { "url": url })
  }
}
