import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Venta } from '../models/Venta';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DescripcionVentasObraArteDTO } from '../models/DescripcionVentasObraArteDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private url = `${base_url}/ventas`;
  private listaCambio = new Subject<Venta[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Venta[]>(this.url);
  }

  insert(co: Venta) {
    return this.http.post(this.url, co);
  }

  //get y set
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Venta[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Venta>(`${this.url}/${id}`);
  }

  update(c: Venta) {
    return this.http.put(this.url, c);
  }

  getventaobraarte():Observable<DescripcionVentasObraArteDTO[]>{
    return this.http.get<DescripcionVentasObraArteDTO[]>(`${this.url}/descripcionobrasvendidas`);
  }
}
