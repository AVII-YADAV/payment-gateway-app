# Payment Gateway Platform

A comprehensive payment gateway platform inspired by Stripe and Razorpay, built with modern technologies and production-ready features.

## 🚀 Features

- **Multi-Payment Methods**: UPI, Cards, Wallets, Net Banking
- **Real-time Processing**: Webhook-based payment updates
- **Admin Dashboard**: Complete merchant and transaction management
- **Merchant Portal**: API keys, analytics, QR codes, invoices
- **Security**: JWT auth, rate limiting, 2FA, IP whitelisting
- **Analytics**: Real-time transaction charts and insights
- **Responsive Design**: Modern UI with dark/light themes

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with role-based access
- **Payment Engine**: Mock payment simulation with webhooks
- **Documentation**: Swagger/OpenAPI
- **DevOps**: Docker, Nginx, PM2

## 📦 Installation

1. **Clone and Install Dependencies**

```bash
git clone https://github.com/AVII-YADAV/payment-gateway-app
cd payment-gateway-app
npm run install:all
```

2. **Environment Setup**

```bash
cp .env.example .env
# Edit .env with your database and API credentials
```

3. **Database Setup**

```bash
npm run db:generate
npm run db:push
```

4. **Start Development**

```bash
npm run dev
```

## 🏗 Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React context providers
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # Global styles
├── server/                # Node.js Backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
├── prisma/               # Database schema
├── public/              # Static assets
├── nginx/              # Nginx configuration
└── docker/             # Docker files
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/payment_gateway"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-secret"

# Server
PORT=5000
NODE_ENV=development

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Gateway
GATEWAY_NAME="PaymentGateway"
GATEWAY_LOGO="https://your-domain.com/logo.png"

# Security
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## 🚀 Deployment

### Docker Deployment

```bash
npm run docker:build
npm run docker:run
```

### Production Deployment

```bash
npm run build
npm start
```

## 📚 API Documentation

Once the server is running, visit:

- Swagger UI: `http://localhost:5000/api-docs`
- API Base URL: `http://localhost:5000/api/v1`

## 🔐 Default Credentials

### Admin Account

- Email: `admin@paymentgateway.com`
- Password: `admin123`

### Test Merchant Account

- Email: `merchant@test.com`
- Password: `merchant123`

## 🧪 Testing

```bash
# Run backend tests
cd server && npm test

# Run frontend tests
cd client && npm test
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


