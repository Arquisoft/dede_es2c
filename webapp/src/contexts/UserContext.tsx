import React, { useReducer, FC, createContext, ReactNode } from 'react';

enum UserActionType {
    SET_USER = 'SET_USER'
  }

interface UserState  {
    user: string
}

interface UserStateProps {
    children: ReactNode;
}

interface SetUserAction {
    type: typeof UserActionType.SET_USER;
    payload: string;
}

interface ContextProps {
    state: UserState;
    dispatch: { setUser:(user:string) => void; }
}

  const userReducer = (state: UserState, action: SetUserAction): UserState => {
    if (action.type === UserActionType.SET_USER){
        return {
          user: action.payload
        }
      }
      else{
        return state;
      }
  }

const localStorageUser = localStorage.getItem("TOKEN");
const inicial = { user: localStorageUser ? localStorageUser: "no sesion"}

export const UserContext = createContext({} as ContextProps);

const State: FC<UserStateProps> = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, inicial);
    const setUser = (user: string) => {
        localStorage.setItem('currentUser', user);
        dispatch({ type: UserActionType.SET_USER, payload: user });
    }

    return (
        <UserContext.Provider value = {{state, dispatch: {setUser}}}>
            {children}
        </UserContext.Provider>

    );
  }
  export default State