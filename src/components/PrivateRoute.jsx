import { parse } from 'postcss'
import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import AccessDenied from '../pages/AccessDenied '
import { Outlet } from 'react-router-dom'

const PrivateRoute = () => {

    const { authState } = useContext(AuthContext)
    console.log(authState.email, authState.isAuthenticated);

    if (authState.user.role !== 'admin') {
        return <AccessDenied />
    }

    return <Outlet />
}

export default PrivateRoute