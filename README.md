# Volunteer Engagement Portal

A modern web application that bridges the gap between NGOs (Non-Governmental Organizations) and passionate volunteers, enabling meaningful community impact through streamlined volunteer management.

## 🌟 Features

### For NGOs
- **Easy Registration**: Simple onboarding process for NGOs
- **Activity Creation**: Create and manage volunteer opportunities
- **Dashboard Analytics**: Track volunteer engagement and impact metrics
- **Volunteer Management**: View and manage volunteer applications

### For Volunteers
- **Skill-Based Matching**: AI-powered matching with relevant opportunities
- **Easy Signup**: Streamlined registration process
- **Dashboard**: Track your volunteer hours and activities
- **Mobile-Friendly**: Access from anywhere on any device

### Platform Features
- **Advanced Analytics**: Comprehensive reporting and insights
- **Secure & Reliable**: Enterprise-grade security with data protection
- **Responsive Design**: Works seamlessly across all devices
- **Real-time Updates**: Live tracking of volunteer activities

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd volunteer-engagement-portal
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn start
   ```

4. **Open your browser**
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
│   │   ├── NGORegistration.js
│   │   ├── ActivityCreation.js
│   │   └── ...            # Other pages
│   ├── helpers/           # Utility functions and helpers
│   ├── images/            # Image assets
│   ├── styles/            # Global styles
│   ├── App.js             # Main application component
│   └── MainLandingPage.js # Landing page
├── package.json           # Dependencies and scripts
└── tailwind.config.js     # Tailwind CSS configuration
```

## 🛠️ Available Scripts

### `yarn start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`
Builds the app for production to the `build` folder. The build is optimized for the best performance.

### `yarn test`
Launches the test runner in interactive watch mode.

### `yarn deploy`
Builds the app and deploys it to Netlify (requires Netlify CLI).

## 🎨 Technology Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS + Styled Components
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Feather Icons
- **Build Tool**: Create React App
- **Package Manager**: Yarn

## 📱 Key Pages

- **Landing Page** (`/`) - Main homepage with features and call-to-action
- **Volunteer Signup** (`/volunteer/signup`) - Volunteer registration
- **NGO Registration** (`/ngo/register`) - NGO onboarding
- **Activity Creation** (`/ngo/activity/create`) - Create volunteer opportunities
- **Admin Dashboard** (`/admin/dashboard`) - Administrative controls
- **Volunteer Dashboard** (`/volunteer/dashboard`) - Volunteer management
- **NGO Dashboard** (`/ngo/dashboard`) - NGO management

## 🔧 Configuration

The application uses several configuration files:

- `tailwind.config.js` - Tailwind CSS configuration
- `babel-plugin-macros.config.js` - Babel macros configuration
- `jsconfig.json` - JavaScript configuration for better imports

## 🚀 Deployment

The application is configured for deployment on Netlify. Use the following command to deploy:

```bash
yarn deploy
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

---

**Built with ❤️ for community impact**
