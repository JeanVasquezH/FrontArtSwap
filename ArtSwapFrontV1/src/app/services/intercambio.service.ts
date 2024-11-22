import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Intercambio } from '../models/Intercambio';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environments';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class IntercambioService {
  private url = `${base_url}/intercambios`;
  private listaCambio = new Subject<Intercambio[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Intercambio[]>(this.url);
  }

  insert(inter: Intercambio) {
    return this.http.post(this.url, inter);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Intercambio[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Intercambio>(`${this.url}/${id}`);
  }

  update(i: Intercambio) {
    return this.http.put(this.url, i);
  }


}
