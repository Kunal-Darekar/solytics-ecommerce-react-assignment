import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  IconButton,
  Divider,
  TextField,
  Chip,
  Container,
  Paper,
  Grow,
  Tooltip
} from '@mui/material'
import {
  Add,
  Remove,
  Delete,
  ArrowBack,
  ShoppingBag,
  LocalShipping,
  Payment,
  Security
} from '@mui/icons-material'
import { useCart } from '../contexts/CartContext'

const Cart = () => {
  const navigate = useNavigate()
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice
  } = useCart()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity)
    } else {
      removeFromCart(productId)
    }
  }

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
  }

  const handleContinueShopping = () => {
    navigate('/')
  }

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!')
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Grow in timeout={500}>
            <Box>
              <ShoppingBag sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                Your cart is empty
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                Looks like you haven&apos;t added any items to your cart yet. Start shopping to discover amazing products!
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<ArrowBack />}
                onClick={handleContinueShopping}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2
                }}
              >
                Start Shopping
              </Button>
            </Box>
          </Grow>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Shopping Cart
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #e2e8f0', borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Cart Items
              </Typography>
              <Button
                color="error"
                variant="outlined"
                onClick={clearCart}
                startIcon={<Delete />}
                size="small"
              >
                Clear Cart
              </Button>
            </Box>

            {items.map((item, index) => (
              <Grow in timeout={300 + index * 100} key={item.id}>
                <Card sx={{ mb: 3, border: '1px solid #f1f5f9' }}>
                  <Grid container>
                    <Grid item xs={4} sm={3}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.title}
                        sx={{
                          objectFit: 'contain',
                          p: 2,
                          backgroundColor: '#f8fafc'
                        }}
                      />
                    </Grid>

                    <Grid item xs={8} sm={9}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              component="h3"
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                lineHeight: 1.3,
                                height: '2.6em',
                                fontWeight: 600,
                                mb: 1
                              }}
                            >
                              {item.title}
                            </Typography>

                            {/* Brand and Category */}
                            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                              {item.brand && (
                                <Chip
                                  label={item.brand}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              )}
                              {item.category && (
                                <Chip
                                  label={item.category}
                                  size="small"
                                  color="secondary"
                                  variant="outlined"
                                />
                              )}
                            </Box>

                            {/* Model and Color */}
                            {(item.model || item.color) && (
                              <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                                {item.model && (
                                  <Typography variant="caption" color="text.secondary">
                                    Model: {item.model}
                                  </Typography>
                                )}
                                {item.color && (
                                  <Typography variant="caption" color="text.secondary">
                                    Color: {item.color}
                                  </Typography>
                                )}
                              </Box>
                            )}

                            <Typography
                              variant="h5"
                              color="primary"
                              sx={{ fontWeight: 700, mb: 2 }}
                            >
                              ${item.price}
                            </Typography>
                          </Box>

                          <Tooltip title="Remove Item" arrow>
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveItem(item.id)}
                              size="small"
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'error.light',
                                  color: 'white'
                                }
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              Quantity:
                            </Typography>
                            
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              sx={{
                                border: '1px solid #e2e8f0',
                                '&:hover': {
                                  backgroundColor: 'primary.light',
                                  color: 'white'
                                }
                              }}
                            >
                              <Remove />
                            </IconButton>
                            
                            <TextField
                              value={item.quantity}
                              size="small"
                              sx={{ 
                                width: 60, 
                                mx: 1,
                                '& .MuiOutlinedInput-root': {
                                  textAlign: 'center'
                                }
                              }}
                              inputProps={{ style: { textAlign: 'center' } }}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 0
                                handleQuantityChange(item.id, value)
                              }}
                            />
                            
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              sx={{
                                border: '1px solid #e2e8f0',
                                '&:hover': {
                                  backgroundColor: 'primary.light',
                                  color: 'white'
                                }
                              }}
                            >
                              <Add />
                            </IconButton>
                          </Box>

                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grow>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #e2e8f0', borderRadius: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Order Summary
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ space: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">
                  Subtotal ({items.length} items):
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${getTotalPrice().toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">
                  Shipping:
                </Typography>
                <Typography variant="body1" color="success.main" sx={{ fontWeight: 600 }}>
                  Free
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="body1">
                  Tax:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${(getTotalPrice() * 0.1).toFixed(2)}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Total:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  ${(getTotalPrice() * 1.1).toFixed(2)}
                </Typography>
              </Box>

              {/* Features */}
              <Box sx={{ mb: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalShipping sx={{ color: 'success.main', fontSize: 16 }} />
                      <Typography variant="caption">Free Shipping</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Security sx={{ color: 'success.main', fontSize: 16 }} />
                      <Typography variant="caption">Secure</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<Payment />}
                onClick={handleCheckout}
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2
                }}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<ArrowBack />}
                onClick={handleContinueShopping}
                sx={{
                  py: 1.5,
                  mt: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart 