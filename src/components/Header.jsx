import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Box,
  Button,
  alpha,
  Tooltip
} from '@mui/material'
import { 
  ShoppingCart, 
  Home, 
  Storefront,
  Person
} from '@mui/icons-material'
import { useCart } from '../contexts/CartContext'

const Header = () => {
  const { getTotalItems } = useCart()

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
        {/* Logo */}
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mr: 4,
            '&:hover': {
              opacity: 0.9,
            }
          }}
        >
          <Storefront sx={{ fontSize: 28 }} />
          MiniStore
        </Typography>
        
        {/* Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          <Tooltip title="Home" arrow>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              startIcon={<Home />}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.1),
                }
              }}
            >
              Home
            </Button>
          </Tooltip>
          
          <Tooltip title="Profile" arrow>
            <IconButton
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.1),
                }
              }}
            >
              <Person />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Shopping Cart" arrow>
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/cart"
              sx={{
                position: 'relative',
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.1),
                }
              }}
            >
              <Badge 
                badgeContent={getTotalItems()} 
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    minWidth: 20,
                    height: 20,
                  }
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header 