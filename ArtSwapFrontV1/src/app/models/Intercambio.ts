import { ObraArte } from "./ObraArte"
import { Usuarios } from "./Usuarios"

export class Intercambio{
    idIntercambio: number=0
    fechaIntercambio: Date= new Date(Date.now())
    estado: string= ""
    
    usuario: Usuarios = new Usuarios
    obraArte: ObraArte = new ObraArte

}