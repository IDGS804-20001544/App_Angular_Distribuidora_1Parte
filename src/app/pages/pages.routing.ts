import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { CrearUsuarioComponent } from "./crear-usuario/crear-usuario.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { CrearClienteComponent } from "./crear-cliente/crear-cliente.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { CrearCambrillonComponent } from "./crear-cambrillon/crear-cambrillon.component";
import { CambrillonesComponent } from "./cambrillones/cambrillones.component";
import { authGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: 'home', component: PagesComponent,canActivate:[authGuard],
        children: [
            { path: 'crear-usuario', component: CrearUsuarioComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'crear-cliente', component: CrearClienteComponent },
            { path: 'clientes', component: ClientesComponent },
            { path: 'crear-cambrillon', component: CrearCambrillonComponent },
            { path: 'cambrillones', component: CambrillonesComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}