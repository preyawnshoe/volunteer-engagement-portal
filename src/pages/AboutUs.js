import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithBackground.js";
import MainFeature1 from "components/features/TwoColWithButton.js";
import Features from "components/features/ThreeColSimple.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <MainFeature1
        subheading={<Subheading>About NGO Connect</Subheading>}
        heading="Bridging the gap between NGOs and passionate volunteers."
        description="We believe that every individual has the power to make a difference. Our platform connects dedicated volunteers with NGOs that are working tirelessly to create positive change in communities around the world. Through technology, we're making it easier than ever for people to find meaningful opportunities to serve and for organizations to find the support they need."
        buttonRounded={false}
        primaryButtonText="Join Our Mission"
        imageSrc="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      />
      <MainFeature1
        subheading={<Subheading>Our Mission</Subheading>}
        heading="Empowering communities through volunteer engagement."
        description="Our mission is to create a world where every NGO has access to the volunteers they need, and every volunteer can find opportunities that match their skills and passions. We're building a platform that makes volunteer management seamless, transparent, and impactful."
        buttonRounded={false}
        primaryButtonText="Get Started"
        imageSrc="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        textOnLeft={false}
      />
      <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="What drives us forward."
        description="We are guided by these core values that shape everything we do and every decision we make."
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "Community Support",
            description: "We believe in the power of community and the impact that comes when people work together towards a common goal."
          },
          {
            imageSrc: ShieldIconImage,
            title: "Trust & Transparency",
            description: "We maintain the highest standards of trust and transparency in all our operations and partnerships."
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Impact Focused",
            description: "Every feature we build and every decision we make is focused on maximizing positive impact in communities."
          },
        ]}
        linkText=""
      />
      <TeamCardGrid 
        subheading={<Subheading>Our Team</Subheading>}
        heading="Meet the people behind NGO Connect."
        description="Our diverse team brings together expertise in technology, social impact, and community development to create a platform that truly serves the needs of NGOs and volunteers."
      />
      <Footer />
    </AnimationRevealPage>
  );
};
