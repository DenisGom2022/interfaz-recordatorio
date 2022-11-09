import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recordatorio } from '../models/Recordatorio';
import { global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public url:string;
  constructor(private http:HttpClient) {
    this.url = global.url;
  }

  getDatos():Observable<any>{
    return this.http.get(this.url + "recorda");
  }

  guardarDatos(recor:Recordatorio):Observable<any>{
    return this.http.post(this.url+"recorda", recor);
  }

  eliminar(id:number):Observable<any>{
    return this.http.delete(this.url+"recorda/"+id);    
  }

  editar(recor:Recordatorio):Observable<any>{
    return this.http.put(this.url + "recorda/" + recor.id, recor);
  }
}
