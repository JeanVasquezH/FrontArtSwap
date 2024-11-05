
import { Routes } from '@angular/router';
import { MetodopagoComponent } from './components/metodopago/metodopago.component';
import { CreaeditametodopagoComponent } from './components/metodopago/creaeditametodopago/creaeditametodopago.component';
import { ComunidadComponent } from './components/comunidad/comunidad.component';
import { CreaeditacomunidadComponent } from './components/comunidad/creaeditacomunidad/creaeditacomunidad.component';



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

];
