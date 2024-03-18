import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any = [];
  usuario: any = {};

  constructor(private usuarioService: UsuariosService) {
    this.obtenerUsuarios();
  }

  ngOnInit(): void {
      this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios('leer.php').subscribe((data) => {
      this.usuarios = data.items;
    })
  }

  seleccionarUsuario(id:any) {
    this.usuarioService.seleccionarUsuario(id).subscribe((resp: any) => {
      this.usuario = resp.items[0];
    })
  }

  editarUsuario() {
    Swal.fire({
      title: "¿Desea editar el usuario?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Editar",
      denyButtonText: `No acepto`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        let formData = new FormData();
        formData.append('nombre', this.usuario.nombre);
        formData.append('contrasenia', this.usuario.contrasenia);
        formData.append('rol_id', this.usuario.rol_id);
        formData.append('id', this.usuario.id);

        this.usuarioService.agregarUsuario('editar.php', formData).subscribe((event: any) =>{
          Swal.fire("¡Editado!", "", "success");
          if (event.status == 'success') {
            this.obtenerUsuarios();
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Ups!", "", "info");
      }
    });
  }

  eliminarUsuario(id: any) {
    Swal.fire({
      title: "¿Desea eliminar al usuario?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No acepto`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("¡Eliminado!", "", "success");
        this.usuarioService.eliminarUsuario(id).subscribe((resp: any) => {
          if(resp['resultado'] == 'OK') {
            console.log('Usuario elimminado');
            this.obtenerUsuarios();
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Ups!", "", "info");
      }
    });
  }
}
