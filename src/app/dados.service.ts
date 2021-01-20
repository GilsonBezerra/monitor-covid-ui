import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  
  baseURL = environment.endPoint;

  constructor(private http: HttpClient) { }
  

  public buscarDados() {
    return this.http.get<any[]>(this.baseURL);
  }



}








