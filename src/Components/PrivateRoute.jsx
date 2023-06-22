import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import { UseAuthStatus } from '../Hooks/UseAuthStatus';

export default function PrivateRoute() {
    const {loggedIn,checkingStatus} = UseAuthStatus();
    if(checkingStatus)
    {
        return <h3>Loading...</h3>
    }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}
