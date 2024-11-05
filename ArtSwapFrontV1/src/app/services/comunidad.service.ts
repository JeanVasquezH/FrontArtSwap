import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comunidad } from '../models/Comunidad';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environments';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {
  private url = `${base_url}/comunidades`;
  private listaCambio = new Subject<Comunidad[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Comunidad[]>(this.url);
  }

  insert(co: Comunidad) {
    return this.http.post(this.url, co);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Comunidad[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Comunidad>(`${this.url}/${id}`);
  }

  update(c: Comunidad) {
    return this.http.put(this.url, c);
  }


}
