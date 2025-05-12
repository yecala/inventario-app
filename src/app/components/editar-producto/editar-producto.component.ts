import { Component, inject } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent {

  producto: Producto = new Producto();
  id!:number;

  private productoServicio = inject(ProductoService);
  private ruta = inject(ActivatedRoute);
  private enrutador = inject(Router);

  ngOnInit(){
    this.id = this.ruta.snapshot.params['id']; //Para recuperar parametros de la url
    this.productoServicio.obtenerProductoPorId(this.id).subscribe({
      next: (datos) => this.producto = datos.data,
      error: (errores: any) => console.log(errores)
    })
  }

  onSubmit(){
    this.guardarProducto();
  }
  guardarProducto() {
    this.productoServicio.editarProducto(this.id,this.producto).subscribe({
      next: (datos) => this.irProductoLista(),
      error: (errores) => console.log(errores)
    });
  }
  irProductoLista(): void {
    this.enrutador.navigate(['/productos']);
  }
}
