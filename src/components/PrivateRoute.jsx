import React from 'react'
import { Outlet, Navigate} from 'react-router';
import {useAuthStatus} from '../hooks/useAuthStatus';

export default function PrivateRoute() {
    const {loggedIn, checkStatus} = useAuthStatus();
    if(checkStatus){
        return <h3>Loading...</h3>
    }

  return loggedIn? <Outlet /> : <Navigate to="/sign-in" />
}
