import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CambrillonesService } from 'src/app/services/cambrillones.service';
import { HormasService } from 'src/app/services/hormas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambrillones',
  templateUrl: './cambrillones.component.html',
  styleUrls: ['./cambrillones.component.css']
})
export class CambrillonesComponent {
  
  cambrillones: any = [];
  cambrillon: any = {};
  hormas: any[] = [];


  constructor(private cambrillonService: CambrillonesService,  private hormasService: HormasService) {

    
    this.obtenerCambrillones();
  }

  ngOnInit(): void {
      this.obtenerCambrillones();
      this.getHormas();
  }
  getHormas() {
    this.hormasService.getHormas('leer.php').subscribe((data) => {
      this.hormas = data.items;
    })
  }
  obtenerCambrillones() {
    this.cambrillonService.getCambrillones('leer.php').subscribe((data) => {
      this.cambrillones = data.items;
    })
  }

  seleccionarCambrillon(id:any) {
    this.cambrillonService.seleccionarCambrillon(id).subscribe((resp: any) => {
      this.cambrillon = resp.items[0];
    })
  }

  editarCambrillon() {
    Swal.fire({
      title: "¿Desea editar el cambrillón?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Editar",
      denyButtonText: `No acepto`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        let formData = new FormData();
        formData.append('nombre', this.cambrillon.nombre);
        formData.append('horma_id', this.cambrillon.horma_id);
        formData.append('id', this.cambrillon.id);

        this.cambrillonService.agregarCambrillon('editar.php', formData).subscribe((event: any) =>{
          Swal.fire("¡Editado!", "", "success");
          if (event.status == 'success') {
            this.obtenerCambrillones();
            // this.router.navigate(['/home/cambrillones']);
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Ups!", "", "info");
      }
    });
  }

  eliminarCambrillon(id: any) {
    Swal.fire({
      title: "¿Desea eliminar el cambrillón?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No acepto`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("¡Eliminado!", "", "success");
        this.cambrillonService.eliminarCambrillon(id).subscribe((resp: any) => {
          if(resp['status'] == 'success') {
            console.log('Cambrillón eliminado');
            this.obtenerCambrillones();
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Ups!", "", "info");
      }
    });
  }
}
