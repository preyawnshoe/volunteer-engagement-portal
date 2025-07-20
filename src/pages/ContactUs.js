import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithBackground.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustrationFullForm.js";
import ContactDetails from "components/cards/ThreeColContactDetails.js";

const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`block`;
const Email = tw.span`text-sm mt-6 block text-gray-500`;
const Phone = tw.span`text-sm mt-0 block text-gray-500`;

// Custom contact form section
const ContactSection = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const ContactHeading = tw.h1`font-bold text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 leading-tight`;
const ContactSubheading = tw.p`mt-4 text-center text-lg text-gray-600 max-w-3xl mx-auto`;
const ContactInfo = tw.div`mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`;

const ContactCard = tw.div`bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition duration-300`;
const ContactIcon = tw.div`w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto`;
const ContactTitle = tw.h3`text-xl font-bold text-gray-900 mb-4`;
const ContactDescription = tw.p`text-gray-600 mb-4`;

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      
      <ContactSection>
        <ContactHeading>Get in Touch</ContactHeading>
        <ContactSubheading>
          Have questions about our NGO Volunteer Management System? We're here to help! 
          Whether you're an NGO looking to register, a volunteer wanting to get involved, 
          or need technical support, our team is ready to assist you.
        </ContactSubheading>
        
        <ContactInfo>
          <ContactCard>
            <ContactIcon>📧</ContactIcon>
            <ContactTitle>General Inquiries</ContactTitle>
            <ContactDescription>
              Questions about our platform, features, or how to get started
            </ContactDescription>
            <Email>hello@ngoconnect.org</Email>
            <Phone>+1 (415) 555-0123</Phone>
          </ContactCard>
          
          <ContactCard>
            <ContactIcon>🤝</ContactIcon>
            <ContactTitle>NGO Support</ContactTitle>
            <ContactDescription>
              Help with NGO registration, activity creation, and management
            </ContactDescription>
            <Email>ngos@ngoconnect.org</Email>
            <Phone>+1 (303) 555-0987</Phone>
          </ContactCard>
          
          <ContactCard>
            <ContactIcon>👥</ContactIcon>
            <ContactTitle>Volunteer Support</ContactTitle>
            <ContactDescription>
              Assistance with volunteer signup, profile management, and activities
            </ContactDescription>
            <Email>volunteers@ngoconnect.org</Email>
            <Phone>+1 (312) 555-0654</Phone>
          </ContactCard>
          
          <ContactCard>
            <ContactIcon>🔧</ContactIcon>
            <ContactTitle>Technical Support</ContactTitle>
            <ContactDescription>
              Help with platform issues, bugs, or technical questions
            </ContactDescription>
            <Email>support@ngoconnect.org</Email>
            <Phone>+1 (512) 555-0789</Phone>
          </ContactCard>
          
          <ContactCard>
            <ContactIcon>🤝</ContactIcon>
            <ContactTitle>Partnerships</ContactTitle>
            <ContactDescription>
              Business partnerships, integrations, and collaboration opportunities
            </ContactDescription>
            <Email>partnerships@ngoconnect.org</Email>
            <Phone>+1 (206) 555-0321</Phone>
          </ContactCard>
          
          <ContactCard>
            <ContactIcon>📞</ContactIcon>
            <ContactTitle>Emergency Contact</ContactTitle>
            <ContactDescription>
              Urgent matters requiring immediate attention
            </ContactDescription>
            <Email>emergency@ngoconnect.org</Email>
            <Phone>+1 (212) 555-0456</Phone>
          </ContactCard>
        </ContactInfo>
      </ContactSection>

      <ContactUsForm />
      
      <ContactDetails
        cards={[
          {
            title: "Headquarters",
            description: (
              <>
                <Address>
                  <AddressLine>123 Impact Street</AddressLine>
                  <AddressLine>San Francisco, CA 94105</AddressLine>
                </Address>
                <Email>hello@ngoconnect.org</Email>
                <Phone>+1 (415) 555-0123</Phone>
              </>
            )
          },
          {
            title: "East Coast Office",
            description: (
              <>
                <Address>
                  <AddressLine>456 Community Ave</AddressLine>
                  <AddressLine>New York, NY 10001</AddressLine>
                </Address>
                <Email>east@ngoconnect.org</Email>
                <Phone>+1 (212) 555-0456</Phone>
              </>
            )
          },
          {
            title: "Support Center",
            description: (
              <>
                <Address>
                  <AddressLine>789 Volunteer Way</AddressLine>
                  <AddressLine>Austin, TX 73301</AddressLine>
                </Address>
                <Email>support@ngoconnect.org</Email>
                <Phone>+1 (512) 555-0789</Phone>
              </>
            )
          },
          {
            title: "Partnership Hub",
            description: (
              <>
                <Address>
                  <AddressLine>321 NGO Plaza</AddressLine>
                  <AddressLine>Seattle, WA 98101</AddressLine>
                </Address>
                <Email>partnerships@ngoconnect.org</Email>
                <Phone>+1 (206) 555-0321</Phone>
              </>
            )
          },
          {
            title: "Volunteer Support",
            description: (
              <>
                <Address>
                  <AddressLine>654 Service Drive</AddressLine>
                  <AddressLine>Chicago, IL 60601</AddressLine>
                </Address>
                <Email>volunteers@ngoconnect.org</Email>
                <Phone>+1 (312) 555-0654</Phone>
              </>
            )
          },
          {
            title: "NGO Relations",
            description: (
              <>
                <Address>
                  <AddressLine>987 Impact Circle</AddressLine>
                  <AddressLine>Denver, CO 80201</AddressLine>
                </Address>
                <Email>ngos@ngoconnect.org</Email>
                <Phone>+1 (303) 555-0987</Phone>
              </>
            )
          }
        ]}
      />
      <Footer />
    </AnimationRevealPage>
  );
};
