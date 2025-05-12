import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
  producto: Producto = new Producto();

  private productoServicio = inject(ProductoService);
  private enrutador = inject(Router);


  onSubmit(){
    this.guardarProducto();
  }

  guardarProducto(){
    this.productoServicio.agregarProducto(this.producto).subscribe({
      next: (datos) => {
        this.irListaProductos();
      },
      error: (error: any) => {console.log(error)}
    });
  }
  irListaProductos() {
    this.enrutador.navigate(['/productos'])
  }
}
