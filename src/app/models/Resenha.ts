import { Usuarios } from "./Usuarios"

export class Resenha{
    idResenha:number=0
    calificacion:number=0
    comentario: string = ""
    fechaResena: Date= new Date(Date.now())

    usua: Usuarios = new Usuarios()
}

