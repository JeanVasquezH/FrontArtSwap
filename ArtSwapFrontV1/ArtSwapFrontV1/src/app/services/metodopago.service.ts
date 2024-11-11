import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Metodopago } from '../models/Metodopago';

const base_url= environment.base

@Injectable({
  providedIn: 'root',
})
export class MetodopagoService {
  private url = `${base_url}/metodoPagos`;
  private listaCambio = new Subject<Metodopago[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Metodopago[]>(this.url);
  }

  insert(me: Metodopago){
    return this.http.post(this.url, me);
  }
  
  //get and set
  getlist(){
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva: Metodopago[]){
    this.listaCambio.next(listaNueva);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){ 
    return this.http.get<Metodopago>(`${this.url}/${id}`);
  }

  update(m: Metodopago){
    return this.http.put(this.url, m);
  }

}
