import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';
export const ThemeContext = createContext();
const ContextApi = ({children}) => {
  const [logged, setLogged] = useState(true);
  return (
    <ThemeContext.Provider value={{logged,setLogged}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ContextApi