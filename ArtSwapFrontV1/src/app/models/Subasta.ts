import { ObraArte } from "./ObraArte";
import { Usuarios } from "./Usuarios";

export class Subasta{
    idSubasta:number=0
    fechaInicio: Date= new Date(Date.now())
    fechaFin: Date= new Date(Date.now())
    precio:number=0
    estado: string=""

    usua: Usuarios= new Usuarios()
    obraArt: ObraArte = new ObraArte()

}

