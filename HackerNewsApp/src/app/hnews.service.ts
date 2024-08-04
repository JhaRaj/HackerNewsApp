import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppSettings } from './app-settings';

@Injectable({
  providedIn: 'root'
})

export class HNewsService {
  constructor(private http:HttpClient) {};

  getData() :any{
    return this.http.get(AppSettings.API_ENDPOINT);
  };
  
}
