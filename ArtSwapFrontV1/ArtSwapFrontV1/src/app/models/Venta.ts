import { Metodopago } from "./Metodopago"
import { ObraArte } from "./ObraArte"

export class Venta{
    idVenta: number=0
    fechaVenta: string = ""
    precio: number=0
    fechaCreacion: Date= new Date(Date.now())
    obraArt: ObraArte = new ObraArte();
    metodoPag: Metodopago = new Metodopago();
}