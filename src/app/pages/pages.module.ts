import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { CrearCambrillonComponent } from './crear-cambrillon/crear-cambrillon.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CambrillonesComponent } from './cambrillones/cambrillones.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PagesComponent,
    LoginComponent,
    CrearUsuarioComponent,
    CrearClienteComponent,
    CrearCambrillonComponent,
    UsuariosComponent,
    ClientesComponent,
    CambrillonesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl:'never'})
  ]
})
export class PagesModule { }
