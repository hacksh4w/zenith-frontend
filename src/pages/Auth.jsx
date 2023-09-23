import React from 'react'
import { ContainerStyles } from '../../palette'
import authimage from '../assets/authimage.jpg'
const Auth = () => {
  return (
    <ContainerStyles sx={{
        minWidth:'100vw',
        minHeight:'100vh',
        // backgroundColor:'white.main'
    }}>
        <ContainerStyles sx={{
            minHeight:'75vh',
            minWidth:{xs:'95vw', sm:'80vw', md:'85vw'}
        }}>
            <Box src={authimage}/>
        </ContainerStyles>
    </ContainerStyles>
  )
}

export default Auth