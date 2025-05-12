import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase = `${environment.apiUrl}/productos`;
  private clienteHttp = inject(HttpClient)

  obtenerProductosLista(): Observable<Response<Producto[]>>{ 
    return this.clienteHttp.get<Response<Producto[]>>(this.urlBase);
  }

  agregarProducto(producto: Producto): Observable<Object>{ 
    return this.clienteHttp.post(this.urlBase,producto );
  }

  obtenerProductoPorId(id:number): Observable<Response<Producto>>{ 
    return this.clienteHttp.get<Response<Producto>>(`${this.urlBase}/${id}`);
  }

  editarProducto(id:number, producto: Producto){
    return this.clienteHttp.put(`${this.urlBase}/${id}`,producto)
  }

  eliminarProducto(id:number):Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`)
  }

}
