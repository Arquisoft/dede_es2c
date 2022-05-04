import {User} from '../shared/shareddtypes';
import axios from 'axios';
import Swal from 'sweetalert2';

export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function getDireccionPod(webId: string) {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    let response = await fetch(apiEndPoint + "/user/pod/" + webId);
  
    if(response.status === 404){
        return "";
    }
    return response.json();
}

export const handleLogin = async (idUser: String, pass: String) => {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    axios.post(apiEndPoint + "/user/login",{"email":idUser,"password":pass})
    .then(res => {
        if(res.status === 201){
         Swal.fire({
             title: "Sesión iniciada",
             icon: "success"
         }).then(() => {
             console.log(res.data)
             localStorage.setItem('token',res.data.token);
             window.location.assign("/products");
         });
        }else{
             Swal.fire({
                 title: "Creedenciales incorrectos",
                 text: "El usuario o contraseña son incorrectos, vuelva a introducirlos",
                 icon: "error",
                 footer: '<a href ="/signup">¿No tienes cuenta? Registrate ahora!</a>'
             });
        }
    })
}

export const handleSignup = (name:String,surname:String,email: String,pass: String,repPass:String) => {
    console.log("EntrA")
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    axios.post(apiEndPoint +"/user/signup",{"name":name,"surname":surname,"email":email,"role":"ROLE_USER","password":pass,"repPassword":repPass})
    .then(res => {
        if(res.status === 201){
            axios.post(apiEndPoint + "/cart/add",{"client_id":res.data.user._id}).then(res =>{
                if(res.status === 201){
                    Swal.fire({
                        title: "Usuario registrado",
                        text: "Te has registrado correctamente en la aplicación",
                        icon: "success"
                    }).then(() => {
                        window.location.assign("/login");
                    });
                }
            })
        }
    })
}

export const foundEmail = async (email: String):Promise<boolean> => {
    var status = false;
    if(email.trim().length > 0){
        try{
        const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
        status = await axios.get(apiEndPoint +"/user/list/"+ email)
        .then(res => {
            return res.status === 200
        })
        }catch(error){
            return false
        }
    } 
    return status;
} 

export async function getUserById(id: string) {
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/'
    let response = await fetch(apiEndPoint+'/user/findById/' + id);
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}
