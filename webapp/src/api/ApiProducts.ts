import {Product} from '../shared/shareddtypes';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';

export async function getProducts(): Promise<Product[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    let response = await fetch(apiEndPoint + "/product/list");
    return response.json();
}
  
export async function getProductosByCategoria(categoria: string): Promise<Product[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    let response = await fetch(apiEndPoint + "/product/getByCategoria/" + categoria);
    return response.json();
}

export async function addProduct(url: string, nombre: string, descripcion: string, precio: string, categoria: string, stock: string): Promise<any>{
    let codigo = uuidv4();
    axios.post("http://localhost:5000/product/addPost", {"codigo": codigo, 
            "nombre": nombre, "categoria": categoria, "stock": Number.parseInt(stock), 
            "precio": Number.parseFloat(precio), "url": url, "descripcion": descripcion}).then(
        res => {
            if(res.status === 201){
                Swal.fire({
                    title: "UProducto añadido",
                    text: "Se ha añadido el prodcuto sin problemas",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "ERROR",
                    text: "Se ha producido un error con los productos",
                    icon: "error"
                });
            }
        }
    )
}