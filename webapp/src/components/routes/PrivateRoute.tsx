import axios from 'axios';
import { Navigate} from 'react-router';

async function isAdmin(){
  await axios.get("http://localhost:5000/user/isAdmin/" + localStorage.getItem("token"))
  .then(res => {
        localStorage.setItem("admin",res.data);
  })
}


export default function PrivateRoute({children,user,redirectTo}: any) {
  //isAdmin();
  console.log(user)
  let isAuthenticated = (user == "ROLE_ADMIN");
  console.log(isAuthenticated)
  return isAuthenticated ? children : <Navigate to={redirectTo} replace={true} />;
};