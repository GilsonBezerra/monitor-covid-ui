import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  
  baseURL = 'https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalGeralApi';

  constructor(private http: HttpClient) { }
  

  public buscarDados() {
    return this.http.get<any[]>(this.baseURL);
  }



}








