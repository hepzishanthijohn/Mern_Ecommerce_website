import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'



function Portal() {
    return (
        <>
            <Sidebar />
            <Outlet></Outlet>
        </>
    )
}

export default Portal