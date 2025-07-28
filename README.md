# Volunteer Engagement Portal

A modern full-stack web application that bridges the gap between NGOs (Non-Governmental Organizations) and passionate volunteers, enabling meaningful community impact through streamlined volunteer management with referral system and leaderboard features.

## 🌟 Features

### For NGOs
- **Easy Registration**: Simple onboarding process for NGOs
- **Activity Creation**: Create and manage volunteer opportunities
- **Dashboard Analytics**: Track volunteer engagement and impact metrics
- **Volunteer Management**: View and manage volunteer applications

### For Volunteers
- **Skill-Based Matching**: AI-powered matching with relevant opportunities
- **Easy Signup**: Streamlined registration process with referral system
- **Dashboard**: Track your volunteer hours, activities, and referral count
- **Profile Management**: Complete profile with detailed information
- **Referral System**: Share referral links and track your impact
- **Mobile-Friendly**: Access from anywhere on any device

### Platform Features
- **Advanced Analytics**: Comprehensive reporting and insights
- **Secure & Reliable**: Enterprise-grade security with JWT authentication
- **Responsive Design**: Works seamlessly across all devices
- **Real-time Updates**: Live tracking of volunteer activities
- **Leaderboard System**: Track top referrers and community impact
- **User Authentication**: Secure login/signup with role-based access

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd volunteer-engagement-portal
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   cd backend
   touch .env
   ```
   
   Add the following variables to `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/volunteer-portal
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend development server**
   ```bash
   # In a new terminal window
   npm start
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
volunteer-engagement-portal/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── blogs/         # Blog-related components
│   │   ├── cards/         # Card components
│   │   ├── cta/           # Call-to-action components
│   │   ├── features/      # Feature showcase components
│   │   ├── footers/       # Footer components
│   │   ├── forms/         # Form components
│   │   ├── headers/       # Header components
│   │   ├── hero/          # Hero section components
│   │   ├── pricing/       # Pricing components
│   │   └── testimonials/  # Testimonial components
│   ├── pages/             # Main application pages
│   │   ├── AdminDashboard.js
│   │   ├── NGODashboard.js
│   │   ├── VolunteerDashboard.js
│   │   ├── VolunteerSignup.js
│   │   ├── VolunteerProfile.js
│   │   ├── NGORegistration.js
│   │   ├── ActivityCreation.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── ...            # Other pages
│   ├── helpers/           # Utility functions and helpers
│   ├── images/            # Image assets
│   ├── styles/            # Global styles
│   ├── App.js             # Main application component
│   └── MainLandingPage.js # Landing page
├── backend/               # Backend server
│   ├── models/            # MongoDB schemas
│   │   └── User.js        # User model
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication routes
│   │   ├── user.js        # User profile routes
│   │   ├── volunteer.js   # Volunteer-specific routes
│   │   ├── referral.js    # Referral system routes
│   │   └── leaderboard.js # Leaderboard routes
│   ├── package.json       # Backend dependencies
│   └── index.js           # Main server file
├── package.json           # Frontend dependencies and scripts
└── tailwind.config.js     # Tailwind CSS configuration
```

## 🛠️ Available Scripts

### Frontend Scripts

#### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run build`
Builds the app for production to the `build` folder. The build is optimized for the best performance.

#### `npm test`
Launches the test runner in interactive watch mode.

#### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### Backend Scripts

#### `npm run dev` (in backend directory)
Starts the backend development server with nodemon for auto-restart on file changes.

#### `npm start` (in backend directory)
Starts the backend production server.

## 🎨 Technology Stack

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS + Styled Components + twin.macro
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Build Tool**: Create React App
- **Package Manager**: npm

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt.js
- **CORS**: Cross-Origin Resource Sharing
- **Environment Variables**: dotenv

## 📱 Key Pages & Features

### Authentication
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - User registration with referral support
- **Volunteer Signup** (`/volunteer/signup`) - Detailed volunteer profile creation

### Dashboards
- **Volunteer Dashboard** (`/volunteer/dashboard`) - Volunteer management with referral system
- **Volunteer Profile** (`/volunteer/profile`) - Complete user profile view
- **NGO Dashboard** (`/ngo/dashboard`) - NGO management
- **Admin Dashboard** (`/admin/dashboard`) - Administrative controls

### Registration & Management
- **NGO Registration** (`/ngo/register`) - NGO onboarding
- **Activity Creation** (`/ngo/activity/create`) - Create volunteer opportunities

### Public Pages
- **Landing Page** (`/`) - Main homepage with features, leaderboard, and call-to-action
- **About Us** (`/about`) - About the platform
- **Contact Us** (`/contact`) - Contact information
- **Privacy Policy** (`/privacy`) - Privacy policy
- **Terms of Service** (`/terms`) - Terms of service

## 🔧 Configuration

### Frontend Configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `babel-plugin-macros.config.js` - Babel macros configuration
- `jsconfig.json` - JavaScript configuration for better imports

### Backend Configuration
- `.env` - Environment variables (MongoDB URI, JWT Secret, Port)
- `package.json` - Backend dependencies and scripts

## 🔐 Authentication & Security

### User Types
- **Volunteer**: Can sign up, complete profile, view dashboard, share referrals
- **NGO**: Can register, create activities, manage volunteers
- **Admin**: Full administrative access

### JWT Authentication
- Secure token-based authentication
- Automatic token refresh
- Protected routes for authenticated users
- Role-based access control

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### User Management
- `GET /api/user/profile` - Get user profile (JWT protected)
- `POST /api/volunteer/complete-profile` - Complete volunteer profile (JWT protected)
- `POST /api/volunteer/create-complete-profile` - Create complete profile for new users

### Referral System
- `POST /api/referral/use` - Use referral code
- `GET /api/leaderboard` - Get top referrers

## 🚀 Deployment

### Frontend Deployment
The application is configured for deployment on Netlify. Use the following command to deploy:

```bash
npm run build
```

### Backend Deployment
Deploy the backend to platforms like Heroku, Railway, or DigitalOcean:

```bash
cd backend
npm start
```

### Environment Variables for Production
Set the following environment variables in your production environment:
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure secret key for JWT tokens
- `PORT` - Port number (optional, defaults to 5000)

## 🧪 Testing

### Frontend Testing
```bash
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

## 🔄 Recent Updates

### Latest Features Added
- ✅ **Referral System**: Users can share referral links and track referrals
- ✅ **Leaderboard**: Public leaderboard showing top referrers
- ✅ **User Authentication**: Complete login/signup system with JWT
- ✅ **Volunteer Profile**: Detailed profile management system
- ✅ **Multi-step Signup**: Enhanced volunteer registration process
- ✅ **Backend API**: Full REST API with MongoDB integration
- ✅ **Responsive Design**: Mobile-friendly interface

---

**Built with ❤️ for community impact**
