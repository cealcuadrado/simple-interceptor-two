import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://jsonplaceholder.typicode.com/todos/10';

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
