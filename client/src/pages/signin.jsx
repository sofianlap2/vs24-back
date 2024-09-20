import React from 'react'
import SignIn from '../components/accueil/Signin'
import ScrollToTop from '../components/admin/outils/ScrollToTop'

const SigninPage = () => {
  return (
    <>
    <ScrollToTop />
    <div style={{background:'#000'}}>
            <SignIn/>

    </div>
    </>
  )
}

export default SigninPage
