import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {
  
  clientes: any = [];
  clientesForm:FormGroup;
  constructor(public clientesService: ClientesService, public router: Router,private fb: FormBuilder) {
    this.clientesForm= this.fb.group({
      codigo: ['', Validators.required],
      razonSocial: ['', Validators.required],
      rfc: ['', Validators.required],
    })
  }

  agregarCliente() {
    Swal.fire({
      title: "¿Desea agregar el cliente?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: `No acepto`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        let formData = new FormData();
        formData.append('codigo', this.clientesForm.get('codigo')?.value);
        formData.append('razonSocial',this.clientesForm.get('razonSocial')?.value);
        formData.append('rfc',this.clientesForm.get('rfc')?.value);
        
        if (this.clientes.telefono !== undefined && this.clientes.telefono !== null) {
          formData.append('telefono', this.clientes.telefono);
        }
        if (this.clientes.pagosCon !== undefined && this.clientes.pagosCon !== null) {
          formData.append('pagosCon', this.clientes.pagosCon);
        }
        if (this.clientes.pedidosA !== undefined && this.clientes.pedidosA !== null) {
          formData.append('pedidosA', this.clientes.pedidosA);
        }
        if (this.clientes.recepcionDePedidos !== undefined && this.clientes.recepcionDePedidos !== null) {
          formData.append('recepcionDePedidos', this.clientes.recepcionDePedidos);
        }
        
        this.clientesService.agregarCliente('agregar.php', formData).subscribe((event: any) =>{
          Swal.fire("¡Agregado!", "", "success");
          if (event.status == 'success') {
            this.router.navigate(['/home/clientes']);
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Ups!", "", "info");
      }
    });
  }
}