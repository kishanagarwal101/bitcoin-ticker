import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import React, { Component, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router';
import { useAuth } from './AuthContext'
const PrivateRoute = (props) => {
    const { currentUser } = useAuth();

    if (currentUser)
        return (
            <Route  {...props}
                component={props.component} />
        )
    else
        return (
            <Redirect to='/login' />
        )

}

export default PrivateRoute;