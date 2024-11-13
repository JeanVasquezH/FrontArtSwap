
import { Routes } from '@angular/router';
import { MetodopagoComponent } from './components/metodopago/metodopago.component';
import { CreaeditametodopagoComponent } from './components/metodopago/creaeditametodopago/creaeditametodopago.component';
import { ComunidadComponent } from './components/comunidad/comunidad.component';
import { CreaeditacomunidadComponent } from './components/comunidad/creaeditacomunidad/creaeditacomunidad.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreaeditarolesComponent } from './components/roles/creaeditaroles/creaeditaroles.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
import { ResenhaComponent } from './components/resenha/resenha.component';
import { CreaeditaresenhaComponent } from './components/resenha/creaeditaresenha/creaeditaresenha.component';
import { ObraarteComponent } from './components/obraarte/obraarte.component';
import { CreaeditaobraarteComponent } from './components/obraarte/creaeditaobraarte/creaeditaobraarte.component';
import { VentaComponent } from './components/venta/venta.component';
import { CreaeditaventaComponent } from './components/venta/creaeditaventa/creaeditaventa.component';
import { IntercambioComponent } from './components/intercambio/intercambio.component';
import { SubastaComponent } from './components/subasta/subasta.component';
import { CreaeditasubastaComponent } from './components/subasta/creaeditasubasta/creaeditasubasta.component';
import { CreaeditaintercambioComponent } from './components/intercambio/creaeditaintercambio/creaeditaintercambio.component';



export const routes: Routes = [
    {
        path: 'metodoPagos', component: MetodopagoComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditametodopagoComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditametodopagoComponent
            },
        ],
    },
    {
        path: 'comunidades', component: ComunidadComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditacomunidadComponent,
            },
            {
                path: 'ediciones/:id', component: CreaeditacomunidadComponent
            },
        ],
    },

    {
        path: 'roles', component: RolesComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditarolesComponent,
            },
            
        ],
    },

    //arreglar
    {
        path: 'usuarios', component: UsuarioComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditausuarioComponent,
            },
        ]
    },
    {
        path: 'resenha', component: ResenhaComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditaresenhaComponent,
            },
            {
                path: 'ediciones/:id', component: CreaeditaresenhaComponent
            },
        ],
    },
    {
        path: 'obraartes', component: ObraarteComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditaobraarteComponent,
            },
            {
                path: 'ediciones/:id', component: CreaeditaobraarteComponent
            },
        ],
    },
    {
        path: 'ventas', component: VentaComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditaventaComponent,
            },
            {
                path: 'ediciones/:id', component: CreaeditaventaComponent
            },
        ],
    },
    {
        path: 'intercambios', component: IntercambioComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditaintercambioComponent,
            },
            {
                path: 'ediciones/:id', component: CreaeditaintercambioComponent
            },
        ],
    },

    {
        path: 'subastas', component: SubastaComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditasubastaComponent,
            },
            {
                path: 'ediciones/:id', component: CreaeditasubastaComponent
            },
        ],
    },
];