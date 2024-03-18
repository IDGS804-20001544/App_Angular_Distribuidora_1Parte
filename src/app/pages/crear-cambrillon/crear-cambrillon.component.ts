import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CambrillonesService } from 'src/app/services/cambrillones.service';
import { HormasService } from 'src/app/services/hormas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cambrillon',
  templateUrl: './crear-cambrillon.component.html',
  styleUrls: ['./crear-cambrillon.component.css']
})
export class CrearCambrillonComponent implements OnInit{

  cambrillones: any = [];
  hormas: any[] = [];
  cambreForm: FormGroup;

  constructor(public cambrillonesService: CambrillonesService, public router: Router, private hormasService: HormasService,
    private fb: FormBuilder) {
      this.cambreForm = this.fb.group({
        nombre: ['', Validators.required],
        horma_id: ['', Validators.required],
      });
    }


  ngOnInit(): void {
    this.getHormas();
  }
  getHormas() {
    this.hormasService.getHormas('leer.php').subscribe((data) => {
      this.hormas = data.items;
    })
  }
  agregarCambrillon() {
    Swal.fire({
      title: "¿Desea agregar el cambrillón?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: `No acepto`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        let formData = new FormData();
        formData.append('nombre', this.cambreForm.get('nombre')?.value);
        formData.append('horma_id', this.cambreForm.get('horma_id')?.value);

        this.cambrillonesService.agregarCambrillon('agregar.php', formData).subscribe((event: any) =>{
          Swal.fire("¡Agregado!", "", "success");
          if (event.status == 'success') {
            this.router.navigate(['/home/cambrillones']);
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Ups!", "", "info");
      }
    });
  }
}
