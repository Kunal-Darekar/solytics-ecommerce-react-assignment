

# Solytics_Assignment



# Mini E-Commerce Product Listing App

A modern, responsive e-commerce frontend application built with React, Material-UI, and Axios. This app demonstrates a complete product listing and shopping cart experience using the API from fakestoreapi.in.

## ✨ Enhanced Features

- **Modern Design**: Beautiful UI with gradients, animations, and smooth transitions
- **Product Badges**: Discount, Popular, and On Sale indicators
- **Advanced Product Info**: Brand, model, color, and category display
- **Favorites System**: Add products to favorites with heart icons
- **Search Bar**: Integrated search functionality in header
- **Responsive Design**: Works perfectly on all devices
- **Loading States**: Skeleton loaders and smooth transitions
- **Image Gallery**: Multiple product images with thumbnails
- **Share Functionality**: Share products via native sharing or clipboard
- **Enhanced Cart**: Better visual hierarchy and improved UX

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Material-UI (MUI) v5** - Professional UI components
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation with search
│   ├── ProductList.jsx # Product grid with badges
│   ├── ProductDetail.jsx # Detailed product view
│   └── Cart.jsx        # Shopping cart
├── contexts/           # State management
│   └── CartContext.jsx # Cart context & provider
├── services/           # API services
│   └── api.js         # API configuration
├── App.jsx            # Main application
└── main.jsx           # Entry point
```

## 🌐 API Integration

Uses [fakestoreapi.in](https://fakestoreapi.in/api/products) for product data.

### API Endpoints:
- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch product details
- `GET /products?category=:category` - Fetch by category
- `GET /products/categories` - Fetch all categories

### Product Data Structure:
```json
{
  "id": 1,
  "title": "Product Name",
  "image": "image_url",
  "price": 99.99,
  "description": "Product description",
  "brand": "Brand Name",
  "model": "Model Number",
  "color": "Color",
  "category": "Category",
  "discount": 15,
  "popular": true,
  "onSale": false
}
```

## 🎨 Design Features

- **Gradient Headers**: Beautiful gradient backgrounds
- **Card Animations**: Hover effects and smooth transitions
- **Badge System**: Discount, popular, and sale indicators
- **Typography**: Modern Inter font with proper hierarchy
- **Color Scheme**: Professional blue and orange theme
- **Responsive Grid**: Adapts to all screen sizes
- **Loading States**: Skeleton loaders for better UX

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured layout with sidebar cart
- **Tablet**: Adjusted grid layouts
- **Mobile**: Stacked layouts with touch-friendly buttons

## 🚀 Deployment

The application can be deployed to any static hosting service:

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Future Enhancements

- User authentication and profiles
- Wishlist functionality
- Product search and filtering
- Payment integration (Stripe/PayPal)
- Order history and tracking
- Product reviews and ratings
- Dark mode toggle
- Localization support
- PWA capabilities

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React, Material-UI, and modern web technologies** 