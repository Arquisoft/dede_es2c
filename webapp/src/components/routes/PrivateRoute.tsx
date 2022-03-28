import { Navigate} from 'react-router';
import jwt_decode from "jwt-decode";




export default function PrivateRoute({children,redirectTo}: any) {
  let isAuthenticated:boolean;
  if(localStorage.getItem('token') != null)
    var user:any = jwt_decode(localStorage.getItem('token') || '{}');
  if(user){
    isAuthenticated = (user.user.role === "ROLE_ADMIN");
  }else{
    isAuthenticated = false;
  }
  return isAuthenticated ? children : <Navigate to={redirectTo} replace={true} />;
};