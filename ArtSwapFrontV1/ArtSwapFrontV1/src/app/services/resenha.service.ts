import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environments';
import { Resenha } from '../models/Resenha';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ResenhaService {
  private url = `${base_url}/resenhas`;
  private listaCambio = new Subject<Resenha[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Resenha[]>(this.url);
  }

  insert(co: Resenha) {
    return this.http.post(this.url, co);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Resenha[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Resenha>(`${this.url}/${id}`);
  }

  update(c: Resenha) {
    return this.http.put(this.url, c);
  }
}
