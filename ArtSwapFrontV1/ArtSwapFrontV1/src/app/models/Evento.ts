import { ObraArte } from "./ObraArte"
import { Usuarios } from "./Usuarios"

export class Evento{
    idEvento: number=0
    descripcion: string = ""
    fechaInicio: Date= new Date(Date.now())
    fechaFin: Date= new Date(Date.now())
    tipo: string = ""
    ubicacion: string = ""
    valoracion: number=0
    usua: Usuarios = new Usuarios()
    obraArt: ObraArte = new ObraArte();
}