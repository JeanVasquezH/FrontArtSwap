
import { CanActivate ,Routes } from '@angular/router';
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
import { CreaeditaeventoComponent } from './components/evento/creaeditaevento/creaeditaevento.component';
import { IntercambioComponent } from './components/intercambio/intercambio.component';
import { CreaeditaintercambioComponent } from './components/intercambio/creaeditaintercambio/creaeditaintercambio.component';
import { CreaeditasubastaComponent } from './components/subasta/creaeditasubasta/creaeditasubasta.component';
import { SubastaComponent } from './components/subasta/subasta.component';
import { FavoritoComponent } from './components/favorito/favorito.component';
import { creaedifavoritoComponent } from './components/favorito/creaditafavorito/creaditafavorito.component';
import { EventoComponent } from './components/evento/evento.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportereventopersonaComponent } from './components/reportes/reportereventopersona/reportereventopersona.component';
import { ReportedescripobravendidaComponent } from './components/reportes/reportedescripobravendida/reportedescripobravendida.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { CantMetodospagoComponent } from './components/reportes/cant-metodospago/cant-metodospago.component';



export const routes: Routes = [

    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
    },

    {
        path: 'inicio', component: LandingpageComponent, 
    },

    {
        path: 'login', component: LoginComponent, 
    },

    {
        path: 'homes', component: HomeComponent, 
    },

    {
        path:'register', component: CreaeditausuarioComponent,
    },
    
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
        path: 'eventos', component: EventoComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditaeventoComponent,
            },
            {
                path: 'ediciones/:id', component: CreaeditaeventoComponent
            },
        ],
    },

    {
        path: 'intercambios', component: IntercambioComponent  ,
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

    {
        path: 'favoritos', component: FavoritoComponent,
        children:[
            {
                path: 'nuevo', component: creaedifavoritoComponent,
            },
            {
                path: 'ediciones/:id', component: creaedifavoritoComponent
            },
        ],
    },

    {
        path:'reportes',component:ReportesComponent,
        children:[
          {
            path:'persona',component:ReportereventopersonaComponent,
          },
          {
            path:'descripcionobrasvendidas',component:ReportedescripobravendidaComponent,
          },
          {
            path:'cantMetodopago',component:CantMetodospagoComponent,
          },
        ]
    }
];
