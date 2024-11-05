
import { Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component'; // Importa el componente de la landing page
import { MetodopagoComponent } from './components/metodopago/metodopago.component';
import { CreaeditametodopagoComponent } from './components/metodopago/creaeditametodopago/creaeditametodopago.component';

export const routes: Routes = [
    {
        path: '', component: LandingpageComponent // Ruta predeterminada para LandingpageComponent
    },
    {
        path: 'metodopagos', component: MetodopagoComponent,
        children: [
            {
                path: 'nuevo', component: CreaeditametodopagoComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditametodopagoComponent
            }
        ]
    }
];

