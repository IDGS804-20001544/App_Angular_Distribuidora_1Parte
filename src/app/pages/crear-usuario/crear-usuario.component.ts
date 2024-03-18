import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {

  usuarios: any = [];
  usuarioForm: FormGroup;

  constructor(public usuariosService: UsuariosService, public router: Router, private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  agregarUsuario() {
    if (this.usuarioForm.valid) {
      Swal.fire({
        title: "¿Desea agregar el usuario?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Agregar",
        denyButtonText: `No acepto`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          
          let formData = new FormData();
          formData.append('nombre', this.usuarioForm.get('usuario')?.value);
          formData.append('contrasenia', this.usuarioForm.get('contraseña')?.value);
          formData.append('rol_id', this.usuarioForm.get('rol')?.value);

          this.usuariosService.agregarUsuario('agregar.php', formData).subscribe((event: any) =>{
            Swal.fire("¡Agregado!", "", "success");
            if (event.status == 'success') {
              this.router.navigate(['/home/usuarios']);
            }
          })
        } else if (result.isDenied) {
          Swal.fire("Ups!", "", "info");
        }
      });
    } else {
      Swal.fire("Ups!", "El formulario es inválido. Por favor, revisa los campos.", "error");
    }
  }
}
