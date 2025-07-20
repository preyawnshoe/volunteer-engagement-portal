import React from "react";
import GlobalStyles from 'styles/GlobalStyles';
import { css } from "styled-components/macro"; //eslint-disable-line

import ComponentRenderer from "ComponentRenderer.js";
import MainLandingPage from "MainLandingPage.js";
import ThankYouPage from "ThankYouPage.js";

// NGO Volunteer Management System Pages
import VolunteerSignupPage from "pages/VolunteerSignup.js";
import NGORegistrationPage from "pages/NGORegistration.js";
import ActivityCreationPage from "pages/ActivityCreation.js";
import AdminDashboardPage from "pages/AdminDashboard.js";
import VolunteerDashboardPage from "pages/VolunteerDashboard.js";
import NGODashboardPage from "pages/NGODashboard.js";

// Additional System Pages
import AboutUsPage from "pages/AboutUs.js";
import ContactUsPage from "pages/ContactUs.js";
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import PrivacyPolicyPage from "pages/PrivacyPolicy.js";
import TermsOfServicePage from "pages/TermsOfService.js";
import BlogIndexPage from "pages/BlogIndex.js";
import PricingPage from "pages/Pricing.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/components/:type/:subtype/:name" element={<ComponentRenderer />} />
          <Route path="/components/:type/:name" element={<ComponentRenderer />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          
          {/* NGO Volunteer Management System Routes */}
          <Route path="/volunteer/signup" element={<VolunteerSignupPage />} />
          <Route path="/ngo/register" element={<NGORegistrationPage />} />
          <Route path="/ngo/activity/create" element={<ActivityCreationPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/volunteer/dashboard" element={<VolunteerDashboardPage />} />
          <Route path="/ngo/dashboard" element={<NGODashboardPage />} />
          
          {/* Additional System Pages */}
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          
          <Route path="/" element={<MainLandingPage />} />
        </Routes>
      </Router>
    </>
  );
}
