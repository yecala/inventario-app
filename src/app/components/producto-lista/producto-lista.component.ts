import { Component, inject } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [],
  templateUrl: './producto-lista.component.html',
  styleUrl: './producto-lista.component.css'
})
export class ProductoListaComponent {

  productos: Producto[]

  private productoServicio = inject(ProductoService);
  private enrutador = inject(Router);

  ngOnInit(){
    //Cargar productos
    this.obtenerProductos();
  }

  private obtenerProductos() : void{
    this.productoServicio.obtenerProductosLista().subscribe(
      {
        next: (datos) => {
          this.productos = datos.data;
          console.log(this.productos);
        },
        error: (error) =>{
          console.error("Error al obtener los procutos",error);
        }
      }
    );
  }

  editarProducto(id:number){
    this.enrutador.navigate(['editar-producto',id])
  }

  eliminarProducto(id: number) {
    Swal.fire({
      title: "Esta seguro?",
      text: "No podra revertir este cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
          this.productoServicio.eliminarProducto(id).subscribe({
          next: (datos) => this.obtenerProductos(),
          error: (errores) => console.log(errores)
        });
        Swal.fire({
          title: "Eliminado correctamente!",
          text: "El producto fue eliminado con exito.",
          icon: "success"
        });
      }
    });    
  }
}
