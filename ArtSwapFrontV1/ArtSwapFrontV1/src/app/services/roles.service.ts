import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from '../models/Roles';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environments';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})

export class RolesService {
  private url = `${base_url}/rolusuarios`;
  private listaCambio = new Subject<Roles[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Roles []>(this.url);
  }
  insert(ro: Roles) {
    return this.http.post(this.url, ro);
  }
  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Roles[]) {
    this.listaCambio.next(listaNueva);
  }
}
