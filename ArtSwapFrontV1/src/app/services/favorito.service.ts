import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Favorito } from '../models/Favorito';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  private url = `${base_url}/favoritos`;
  private listaCambio = new Subject<Favorito[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Favorito[]>(this.url);
  }

  insert(fo: Favorito) {
    return this.http.post(this.url, fo);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Favorito[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Favorito>(`${this.url}/${id}`);
  }

  update(c: Favorito) {
    return this.http.put(this.url, c);
  }


}
