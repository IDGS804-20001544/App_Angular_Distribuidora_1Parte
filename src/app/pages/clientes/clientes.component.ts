import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: any = [];
  cliente: any = {};

  constructor(private clienteService: ClientesService, private router: Router) {
    this.obtenerClientes();
  }

  ngOnInit(): void {
      this.obtenerClientes();
  }

  obtenerClientes() {
    this.clienteService.getClientes('leer.php').subscribe((data) => {
      this.clientes = data.items;
    })
  }

  seleccionarCliente(id:any) {
    this.clienteService.seleccionarCliente(id).subscribe((resp: any) => {
      this.cliente = resp.items[0];
    })
  }

  editarCliente() {
    Swal.fire({
      title: "¿Desea editar el cliente?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Editar",
      denyButtonText: `No acepto`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        let formData = new FormData();
        formData.append('id', this.cliente.id);
        formData.append('codigo', this.cliente.codigo);
        formData.append('razonSocial', this.cliente.razonSocial);
        formData.append('rfc', this.cliente.rfc);
        formData.append('telefono', this.cliente.telefono);
        formData.append('pagosCon', this.cliente.pagosCon);
        formData.append('pedidosA', this.cliente.pedidosA);
        formData.append('recepcionDePedidos', this.cliente.recepcionDePedidos);

        this.clienteService.agregarCliente('editar.php', formData).subscribe((event: any) =>{
          Swal.fire("¡Editado!", "", "success");
          if (event.status == 'success') {
            this.obtenerClientes();
//            window.location.reload();
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Ups!", "", "info");
      }
    });
  }

  eliminarCliente(id: any) {
    Swal.fire({
      title: "¿Desea eliminar al cliente?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No acepto`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("¡Eliminado!", "", "success");
        this.clienteService.eliminarCliente(id).subscribe((resp: any) => {
          if(resp['status'] == 'success') {
            console.log('Cliente eliminado');
            this.obtenerClientes();
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Ups!", "", "info");
      }
    });
  }
}
