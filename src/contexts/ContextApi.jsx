import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';
import { useCookies } from 'react-cookie';
export const ThemeContext = createContext();
const ContextApi = ({children}) => {
  const [logged, setLogged] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null)
  return (
    <ThemeContext.Provider value={{logged,setLogged, cookies, setCookie, removeCookie}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ContextApi