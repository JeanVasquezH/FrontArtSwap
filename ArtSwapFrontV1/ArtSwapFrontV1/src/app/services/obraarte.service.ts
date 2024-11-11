import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { ObraArte } from '../models/ObraArte';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ObraarteService {

  private url = `${base_url}/obraartes`;
  private listaCambio = new Subject<ObraArte[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<ObraArte[]>(this.url);
  }

  insert(co: ObraArte) {
    return this.http.post(this.url, co);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: ObraArte[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<ObraArte>(`${this.url}/${id}`);
  }

  update(c: ObraArte) {
    return this.http.put(this.url, c);
  }


}
