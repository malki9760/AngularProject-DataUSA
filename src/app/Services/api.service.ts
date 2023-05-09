import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from "rxjs/operators";
import { Idata, Result } from '../models/data.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Result> { 
    const url: string = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
    return this.http.get<Result>(url, {});
  }
}
