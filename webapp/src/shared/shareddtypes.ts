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
}


export type Order = {
  codigo: string;
  fecha: Date,
  precioTotal: number,
  product: ProductPedido[],
  correo: string
}

export type ProductPedido = {
    producto: Product;
    cantidad: number;
}