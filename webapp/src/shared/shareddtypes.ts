export type User = {
    _id:string
    email:string;
    name:string;
    surname:string;
    password:string;
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
  id: string |undefined;
  codigo: string;
  fecha: Date,
  precioTotal: number,
  products: Object[],
  product: ProductPedido,
  correo: string
  id_usuario: string;
}

export type ProductPedido = {
  id_producto: string;
  cantidad: number;
  id_carrito: string;
}

export type Object = {
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: string;
  url: string;
  descripcion: string;
  cantidad: string;
}