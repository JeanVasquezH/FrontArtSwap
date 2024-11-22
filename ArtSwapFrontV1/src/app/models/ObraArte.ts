import { Resenha } from "./Resenha"
import { Usuarios } from "./Usuarios"

export class ObraArte{
    idObraArte: number=0
    titulo: string = ""
    descripcion: string = ""
    fechaCreacion: Date= new Date(Date.now())
    estado: string = ""
    precio: number=0
    valoracion: number=0
    usua: Usuarios = new Usuarios()
    resen: Resenha = new Resenha()
    imagenobra: string= ""
}

