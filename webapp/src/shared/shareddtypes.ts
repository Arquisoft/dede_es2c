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
  codigo: string;
  fecha: Date,
  precioTotal: number,
  products: Object[],
  correo: string
}

export type Object = {
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: string;
  url: string;
  descripcion: string;
  cantidad: number;
}