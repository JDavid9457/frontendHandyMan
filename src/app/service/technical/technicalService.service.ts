import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechnicalService {
  private readonly API_RES = environment.API_REST;
  //private readonly saveTecnhical = '/api/technical/save';
  private headers: HttpHeaders = new HttpHeaders();


  constructor(private http: HttpClient) {
   this.headers = this.headers.append('Content-Type','application/json');
  }

  public getAllTechnicalList() {

    const path = `${this.API_RES}/technical/api/technical/list`
    return this.http.get<[]>(path);

  }


 public save(params: any){
    return this.http.post(this.API_RES +'/technical/api/technical/save', params,{headers: this.headers}).toPromise();
  }

  public getTechnical(identifyTechnical:string, numberWeek: string){
    return this.http.get(this.API_RES + '/technical/'+identifyTechnical+'/'+numberWeek).toPromise();
  } 

}
