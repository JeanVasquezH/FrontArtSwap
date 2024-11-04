
import { Routes } from '@angular/router';
import { MetodopagoComponent } from './components/metodopago/metodopago.component';
import { CreaeditametodopagoComponent } from './components/metodopago/creaeditametodopago/creaeditametodopago.component';



export const routes: Routes = [
    {
        path: 'metodopagos', component: MetodopagoComponent,
        children:[
            {
                path: 'nuevo', component: CreaeditametodopagoComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditametodopagoComponent
            }
        ]
    }
];
