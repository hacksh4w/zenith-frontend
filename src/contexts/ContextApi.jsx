import React from 'react'
import { useState } from 'react';
export const ThemeContext = createContext();
const ContextApi = ({children}) => {
  const [logged, setLogged] = useState(false);
  return (
    <ThemeContext.Provider value={{logged,setLogged}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ContextApi