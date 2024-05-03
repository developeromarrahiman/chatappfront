import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './navbar'

export default function DashboardLayout() {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  )
}
