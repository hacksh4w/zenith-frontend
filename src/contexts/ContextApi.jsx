import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios'
export const ThemeContext = createContext();
const ContextApi = ({children}) => {
  const [logged, setLogged] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [totalIncome, setTotalIncome] = useState(0)
  return (
    <ThemeContext.Provider value={{logged,setLogged, cookies, setCookie, removeCookie, setTotalIncome,totalIncome}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ContextApi