import { ObraArte } from "./ObraArte"
import { Usuarios } from "./Usuarios"

export class Favorito{
    idFavoritos: number=0
    fechaanadid: Date= new Date(Date.now())
    usuario: Usuarios = new Usuarios()
    obraArt: ObraArte = new ObraArte()
}