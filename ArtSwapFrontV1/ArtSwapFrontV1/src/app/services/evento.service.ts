import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environments';
import { Evento } from '../models/Evento';

const base_url= environment.base
@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private url = `${base_url}/eventos`;
  private listaCambio = new Subject<Evento[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Evento[]>(this.url);
  }

  insert(me: Evento){
    return this.http.post(this.url, me);
  }
  
  //get and set
  getList(){
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Evento[]){
    this.listaCambio.next(listaNueva);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number){ 
    return this.http.get<Evento>(`${this.url}/${id}`);
  }

  update(m: Evento){
    return this.http.put(this.url, m);
  }
}
