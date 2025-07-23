import React, { useEffect, useState } from "react";

import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithBackground.js";
import { ReactComponent as SvgDotPatternIcon } from "./images/dot-pattern.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const TwoColumn = tw.div`flex flex-col lg:flex-row items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;

const Heading = tw.h1`font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg text-gray-600`;

const Actions = tw.div`flex flex-col sm:flex-row justify-center lg:justify-start`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 lg:py-4 rounded-lg text-white transition duration-300 transform focus:outline-none focus:shadow-outline hover:scale-105 hover:shadow-lg`;
const SecondaryButton = tw.button`font-bold px-8 lg:px-10 py-3 lg:py-4 rounded-lg text-gray-900 transition duration-300 transform focus:outline-none focus:shadow-outline hover:scale-105 hover:shadow-lg`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

const FeaturesContainer = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const FeatureHeading = tw.h2`font-bold text-3xl md:text-4xl lg:text-5xl text-center text-gray-900 leading-tight`;
const FeatureSubheading = tw.p`mt-4 text-center text-lg text-gray-600`;
const FeaturesGrid = tw.div`mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`;

const FeatureCard = tw.div`bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-2`;
const FeatureIcon = tw.div`w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto`;
const FeatureTitle = tw.h3`text-xl font-bold text-gray-900 mb-4 text-center`;
const FeatureDescription = tw.p`text-gray-600 text-center`;

const StatsContainer = tw.div`bg-gray-100 py-20 lg:py-24`;
const StatsGrid = tw.div`max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`;
const StatCard = tw.div`text-center`;
const StatNumber = tw.div`text-4xl lg:text-5xl font-bold text-primary-500 mb-2`;
const StatLabel = tw.div`text-gray-600 font-medium`;

const LeaderboardContainer = tw.div`max-w-screen-xl mx-auto py-12`;
const LeaderboardHeading = tw.h2`font-bold text-3xl md:text-4xl text-center text-primary-500 mb-6`;
const LeaderboardTable = tw.table`w-full bg-white rounded-lg shadow-lg overflow-hidden`;
const LeaderboardHeader = tw.thead`bg-primary-500 text-white`;
const LeaderboardRow = tw.tr``;
const LeaderboardCell = tw.td`py-4 px-6 text-center border-b`;
const LeaderboardTh = tw.th`py-4 px-6 text-center`;

const CTAContainer = tw.div`bg-primary-500 py-20 lg:py-24`;
const CTAContent = tw.div`max-w-screen-xl mx-auto text-center`;
const CTAHeading = tw.h2`font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight`;
const CTAParagraph = tw.p`mt-4 text-xl text-white opacity-75`;
const CTAButton = tw.button`mt-8 font-bold px-8 lg:px-10 py-3 lg:py-4 bg-white text-primary-500 rounded-lg transition duration-300 transform focus:outline-none focus:shadow-outline hover:scale-105 hover:shadow-lg`;

const MainLandingPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:5000/api/leaderboard");
        const data = await response.json();
        if (!response.ok) {
          setError(data.message || "Failed to fetch leaderboard");
          setLoading(false);
          return;
        }
        setLeaderboard(data);
        setLoading(false);
      } catch (err) {
        setError("Server error");
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  // Helper to preserve referral code in URL if present
  const getSignupUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    return ref ? `/signup?ref=${ref}` : '/signup';
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <TwoColumn>
            <LeftColumn>
              <Heading>
                Connect NGOs with
                <br />
                <span tw="text-primary-500">Passionate Volunteers</span>
              </Heading>
              <Paragraph>
                Empowering NGOs to create meaningful impact through volunteer engagement. 
                Our platform bridges the gap between organizations and dedicated individuals 
                ready to make a difference in their communities.
              </Paragraph>
              <Actions>
                <PrimaryButton 
                  tw="bg-primary-500 hover:bg-primary-600"
                  onClick={() => window.location.href = getSignupUrl()}
                >
                  Join as Volunteer
                </PrimaryButton>
                <SecondaryButton 
                  tw="bg-gray-100 hover:bg-gray-200 ml-0 sm:ml-6 mt-4 sm:mt-0"
                  onClick={() => window.location.href = '/ngo/register'}
                >
                  Register NGO
                </SecondaryButton>
              </Actions>
            </LeftColumn>
            <RightColumn>
              <IllustrationContainer>
                <img 
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Volunteers working together" 
                  tw="w-full max-w-lg rounded-lg shadow-2xl"
                />
              </IllustrationContainer>
            </RightColumn>
          </TwoColumn>
        </Content>
      </Container>

      <FeaturesContainer>
        <FeatureHeading>
          Why Choose Our Platform?
        </FeatureHeading>
        <FeatureSubheading>
          Comprehensive tools and features designed to streamline volunteer management
        </FeatureSubheading>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>Easy Volunteer Onboarding</FeatureTitle>
            <FeatureDescription>
              Streamlined registration process with skill-based matching to connect 
              volunteers with the right opportunities.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Advanced Analytics</FeatureTitle>
            <FeatureDescription>
              Track volunteer hours, attendance, and impact with detailed reporting 
              and insights for better decision-making.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureTitle>Smart Matching</FeatureTitle>
            <FeatureDescription>
              AI-powered matching system that connects volunteers with activities 
              based on skills, interests, and availability.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>Mobile Friendly</FeatureTitle>
            <FeatureDescription>
              Access the platform from anywhere with our responsive design that 
              works seamlessly on all devices.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>Secure & Reliable</FeatureTitle>
            <FeatureDescription>
              Enterprise-grade security with data protection and privacy controls 
              to keep your information safe.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>Quick Setup</FeatureTitle>
            <FeatureDescription>
              Get started in minutes with our intuitive interface and comprehensive 
              onboarding process.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesContainer>

      <StatsContainer>
        <StatsGrid>
          <StatCard>
            <StatNumber>500+</StatNumber>
            <StatLabel>NGOs Registered</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>10,000+</StatNumber>
            <StatLabel>Active Volunteers</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>50,000+</StatNumber>
            <StatLabel>Hours Contributed</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>95%</StatNumber>
            <StatLabel>Satisfaction Rate</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsContainer>

      {/* Leaderboard Section */}
      <LeaderboardContainer>
        <LeaderboardHeading>Top Referrers Leaderboard</LeaderboardHeading>
        {loading ? (
          <div tw="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div tw="text-center text-red-500">{error}</div>
        ) : (
          <LeaderboardTable>
            <LeaderboardHeader>
              <LeaderboardRow>
                <LeaderboardTh>Rank</LeaderboardTh>
                <LeaderboardTh>Name</LeaderboardTh>
                <LeaderboardTh>Referrals</LeaderboardTh>
              </LeaderboardRow>
            </LeaderboardHeader>
            <tbody>
              {leaderboard.length === 0 ? (
                <LeaderboardRow>
                  <LeaderboardCell colSpan={3}>No data available.</LeaderboardCell>
                </LeaderboardRow>
              ) : (
                leaderboard.map((user, idx) => (
                  <LeaderboardRow key={user.referralCode}>
                    <LeaderboardCell>{idx + 1}</LeaderboardCell>
                    <LeaderboardCell>{user.name}</LeaderboardCell>
                    <LeaderboardCell>{user.shareCount}</LeaderboardCell>
                  </LeaderboardRow>
                ))
              )}
            </tbody>
          </LeaderboardTable>
        )}
      </LeaderboardContainer>

      <CTAContainer>
        <CTAContent>
          <CTAHeading>
            Ready to Make a Difference?
          </CTAHeading>
          <CTAParagraph>
            Join thousands of volunteers and NGOs already making an impact in their communities.
          </CTAParagraph>
          <CTAButton onClick={() => window.location.href = '/volunteer/signup'}>
            Get Started Today
          </CTAButton>
        </CTAContent>
      </CTAContainer>

      <SvgDotPattern1 />
      <Footer />
    </AnimationRevealPage>
  );
};

export default MainLandingPage;
