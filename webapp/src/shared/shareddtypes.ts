export type User = {
    name:string;
    email:string;
}

export type Product = {
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: string;
  url: string;
  descripcion: string;
  cantidad: number;

}
export type Order = {
  codigo: string;
  fecha: Date,
  precioTotal: number,
  productsPedido: Object[],
  correo: string
}

export type Object = {
  codigoProd: string;
  cantidad: number;
  id_carrito: string;
}