import {Producto} from 'src/app/models/Product'

export class Client{
    id_Cliente: number
    nombre: String
    productos: Array<Producto>
}