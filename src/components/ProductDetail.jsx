import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  CardMedia,
  Typography,
  Button,
  Grid,
  Chip,
  Alert,
  Divider,
  IconButton,
  Paper,
  Container,
  Breadcrumbs,
  Link,
  Skeleton,
  Grow,
  Badge
} from '@mui/material'
import {
  AddShoppingCart,
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  Security,
  Support,
  LocalOffer,
  Star
} from '@mui/icons-material'
import { productService } from '../services/api'
import { useCart } from '../contexts/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getProductById(id)
      setProduct(data)
    } catch (err) {
      setError('Failed to fetch product details. Please try again later.')
      console.error('Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleBack = () => {
    navigate('/')
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: product?.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={40} width={200} sx={{ mb: 3 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={24} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={32} sx={{ mb: 3 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={48} />
          </Grid>
        </Grid>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
          {error}
        </Alert>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ maxWidth: 600, mx: 'auto' }}>
          Product not found.
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body1"
          onClick={handleBack}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          <ArrowBack sx={{ fontSize: 16 }} />
          Back to Products
        </Link>
        <Typography color="text.primary">{product.category}</Typography>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <Grow in timeout={500}>
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', position: 'relative' }}>
              {/* Discount Badge */}
              {product.discount && (
                <Badge
                  badgeContent={`-${product.discount}%`}
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    zIndex: 1,
                    '& .MuiBadge-badge': {
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      minWidth: 40,
                      height: 28,
                    }
                  }}
                >
                  <Box />
                </Badge>
              )}

              <CardMedia
                component="img"
                height="500"
                image={product.image}
                alt={product.title}
                sx={{
                  objectFit: 'contain',
                  borderRadius: 2,
                  backgroundColor: '#f8fafc'
                }}
              />
            </Paper>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Header */}
              <Box sx={{ mb: 3 }}>
                {/* Brand and Category */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {product.brand && (
                    <Chip
                      label={product.brand}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  <Chip
                    label={product.category}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </Box>
                
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 700, mb: 2, lineHeight: 1.2 }}
                >
                  {product.title}
                </Typography>

                {/* Model and Color */}
                {(product.model || product.color) && (
                  <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                    {product.model && (
                      <Typography variant="body1" color="text.secondary">
                        <strong>Model:</strong> {product.model}
                      </Typography>
                    )}
                    {product.color && (
                      <Typography variant="body1" color="text.secondary">
                        <strong>Color:</strong> {product.color}
                      </Typography>
                    )}
                  </Box>
                )}

                {/* Price */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Typography
                    variant="h2"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                  >
                    ${product.price}
                  </Typography>
                  {product.discount && (
                    <Typography
                      variant="h4"
                      color="error.main"
                      sx={{ 
                        textDecoration: 'line-through',
                        fontWeight: 500
                      }}
                    >
                      ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Description */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Description
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}
                >
                  {product.description}
                </Typography>
              </Box>

              {/* Features */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Features
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalShipping sx={{ color: 'success.main' }} />
                      <Typography variant="body2">Free Shipping</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Security sx={{ color: 'success.main' }} />
                      <Typography variant="body2">Secure Payment</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Support sx={{ color: 'success.main' }} />
                      <Typography variant="body2">24/7 Support</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalOffer sx={{ color: 'success.main' }} />
                      <Typography variant="body2">Best Price</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Actions */}
              <Box sx={{ mt: 'auto' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={<AddShoppingCart />}
                      onClick={handleAddToCart}
                      sx={{
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 2
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <IconButton
                      onClick={toggleFavorite}
                      sx={{
                        width: '100%',
                        height: 56,
                        border: '1px solid #e2e8f0',
                        '&:hover': {
                          backgroundColor: 'error.light',
                          color: 'white'
                        }
                      }}
                    >
                      {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <IconButton
                      onClick={handleShare}
                      sx={{
                        width: '100%',
                        height: 56,
                        border: '1px solid #e2e8f0',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'white'
                        }
                      }}
                    >
                      <Share />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grow>
    </Container>
  )
}

export default ProductDetail 