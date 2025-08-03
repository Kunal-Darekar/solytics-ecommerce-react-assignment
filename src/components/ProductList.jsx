import React, { useState, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Alert,
  Chip,
  IconButton,
  Skeleton,
  Grow,
  Tooltip,
  Fab,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Container,
  Paper,
  Divider
} from '@mui/material'
import { 
  AddShoppingCart, 
  Visibility, 
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Search,
  FilterList,
  Clear,
  Sort
} from '@mui/icons-material'
import { productService } from '../services/api'
import { useCart } from '../contexts/CartContext'

const ProductSkeleton = () => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Skeleton variant="rectangular" height={200} />
    <CardContent sx={{ flexGrow: 1 }}>
      <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
      <Skeleton variant="text" height={32} />
    </CardContent>
    <CardActions>
      <Skeleton variant="rectangular" width="100%" height={36} />
    </CardActions>
  </Card>
)

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState(new Set())
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const navigate = useNavigate()
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, selectedCategory, searchQuery, sortBy])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getAllProducts()
      setProducts(data)
    } catch (err) {
      setError('Failed to fetch products. Please try again later.')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await productService.getCategories()
      console.log('Categories from API:', data)
      setCategories(data)
    } catch (err) {
      console.error('Error fetching categories:', err)
      // Fallback: extract categories from products
      if (products.length > 0) {
        const uniqueCategories = [...new Set(products.map(product => product.category))]
        console.log('Categories from products fallback:', uniqueCategories)
        setCategories(uniqueCategories)
      }
    }
  }

  // Extract categories from products if API fails
  useEffect(() => {
    if (products.length > 0 && categories.length === 0) {
      const uniqueCategories = [...new Set(products.map(product => product.category))]
      console.log('Extracting categories from products:', uniqueCategories)
      setCategories(uniqueCategories)
    }
  }, [products, categories.length])

  const filterAndSortProducts = () => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0))
        break
      default:
        // Keep original order
        break
    }

    setFilteredProducts(filtered)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`)
  }

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setSearchQuery('')
    setSortBy('default')
  }

  const getCategoryCount = (category) => {
    if (category === 'all') return products.length
    return products.filter(product => 
      product.category && product.category.toLowerCase() === category.toLowerCase()
    ).length
  }

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Discover Amazing Products
        </Typography>
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Alert severity="error" sx={{ maxWidth: 600 }}>
            {error}
          </Alert>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Featured Products
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
          Discover our handpicked selection of premium products
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'primary.main' }} />
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'primary.main' }} />
        </Box>
      </Box>

      {/* Filters Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mr: 2 }}>
            Filter & Search
          </Typography>
          {(selectedCategory !== 'all' || searchQuery || sortBy !== 'default') && (
            <Button
              startIcon={<Clear />}
              onClick={clearFilters}
              size="small"
              variant="outlined"
              color="secondary"
            >
              Clear All
            </Button>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Category Filter */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Filter by Category"
              onChange={handleCategoryChange}
              startAdornment={
                <InputAdornment position="start">
                  <FilterList />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Products ({getCategoryCount('all')})</MenuItem>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)} ({getCategoryCount(category)})
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading categories...</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Search */}
          <TextField
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />

          {/* Sort */}
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={handleSortChange}
              startAdornment={
                <InputAdornment position="start">
                  <Sort />
                </InputAdornment>
              }
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="name">Name A-Z</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="discount">Best Discount</MenuItem>
            </Select>
          </FormControl>

          {/* Results Count */}
          <Chip 
            label={`${filteredProducts.length} products found`} 
            color="primary" 
            variant="outlined"
            sx={{ ml: 'auto' }}
          />
        </Box>
      </Paper>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search or filter criteria
          </Typography>
          <Button
            variant="outlined"
            onClick={clearFilters}
            startIcon={<Clear />}
          >
            Clear Filters
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Grow in timeout={300 + index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover .product-actions': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    }
                  }}
                >
                  {/* Favorite Button */}
                  <IconButton
                    onClick={() => toggleFavorite(product.id)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(4px)',
                      zIndex: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      }
                    }}
                  >
                    {favorites.has(product.id) ? (
                      <Favorite sx={{ color: 'error.main' }} />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>

                  {/* Product Image */}
                  <CardMedia
                    component="img"
                    height="240"
                    image={product.image}
                    alt={product.title}
                    sx={{
                      objectFit: 'contain',
                      p: 3,
                      backgroundColor: '#f8fafc',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.3,
                        height: '2.6em',
                        fontWeight: 600,
                        mb: 2
                      }}
                    >
                      {product.title}
                    </Typography>
                    
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
                    
                    {/* Price */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Typography
                        variant="h5"
                        color="primary"
                        sx={{ 
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        ${product.price}
                      </Typography>
                      {product.discount && (
                        <Typography
                          variant="body2"
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
                  </CardContent>
                  
                  <CardActions 
                    className="product-actions"
                    sx={{ 
                      justifyContent: 'space-between', 
                      p: 2,
                      opacity: 0,
                      transform: 'translateY(10px)',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    <Tooltip title="View Details" arrow>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => handleViewDetails(product.id)}
                        variant="outlined"
                        sx={{ flex: 1, mr: 1 }}
                      >
                        Details
                      </Button>
                    </Tooltip>
                    
                    <Tooltip title="Add to Cart" arrow>
                      <IconButton
                        color="primary"
                        onClick={() => handleAddToCart(product)}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        <AddShoppingCart />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button for Cart */}
      <Fab
        color="primary"
        aria-label="cart"
        component={RouterLink}
        to="/cart"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <ShoppingCart />
      </Fab>
    </Container>
  )
}

export default ProductList 