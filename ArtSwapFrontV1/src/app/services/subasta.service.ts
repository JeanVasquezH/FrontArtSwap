import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { Subasta } from '../models/Subasta';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class SubastaService {

  private url = `${base_url}/subastas`;
  private listaCambio = new Subject<Subasta[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Subasta[]>(this.url);
  }

  insert(suba: Subasta) {
    return this.http.post(this.url, suba);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Subasta[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Subasta>(`${this.url}/${id}`);
  }

  update(s: Subasta) {
    return this.http.put(this.url, s);
  }
}
