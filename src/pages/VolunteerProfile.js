import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/authenticated.js";
import Footer from "components/footers/FiveColumnWithBackground.js";

const Container = styled.div`
  ${tw`relative`}
`;

const Content = styled.div`
  ${tw`max-w-screen-xl mx-auto py-20 lg:py-24`}
`;

const ProfileContainer = styled.div`
  ${tw`bg-white rounded-lg shadow-lg p-8`}
`;

const ProfileHeader = styled.div`
  ${tw`flex justify-between items-start mb-8`}
`;

const ProfileTitle = styled.h1`
  ${tw`text-4xl font-bold text-gray-800 mb-2`}
`;

const ProfileSubtitle = styled.p`
  ${tw`text-gray-600`}
`;

const ButtonGroup = styled.div`
  ${tw`flex space-x-3`}
`;

const SecondaryButton = styled.button`
  ${tw`px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium transition duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500`}
`;

const Section = styled.div`
  ${tw`mb-8`}
`;

const SectionTitle = styled.h2`
  ${tw`text-2xl font-bold text-gray-800 mb-4`}
`;

const SectionContent = styled.div`
  ${tw`bg-gray-100 rounded-lg p-6`}
`;

const InfoGrid = styled.div`
  ${tw`grid grid-cols-1 md:grid-cols-2 gap-6`}
`;

const InfoItem = styled.div`
  ${tw`mb-4`}
`;

const InfoLabel = styled.div`
  ${tw`text-sm font-semibold text-gray-600 mb-1`}
`;

const InfoValue = styled.div`
  ${tw`text-lg text-gray-800`}
`;

const Badge = styled.span`
  ${tw`inline-block bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`}
  ${props => props.variant === 'success' && tw`bg-green-100 text-green-800`}
  ${props => props.variant === 'warning' && tw`bg-yellow-100 text-yellow-800`}
  ${props => props.variant === 'danger' && tw`bg-red-100 text-red-800`}
  ${props => props.variant === 'info' && tw`bg-blue-100 text-blue-800`}
`;

const StatsGrid = styled.div`
  ${tw`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8`}
`;

const StatCard = styled.div`
  ${tw`bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-lg text-center`}
`;

const StatNumber = styled.div`
  ${tw`text-3xl font-bold mb-2`}
`;

const StatLabel = styled.div`
  ${tw`text-sm opacity-75`}
`;

const LoadingContainer = styled.div`
  ${tw`text-center py-20`}
`;

const ErrorContainer = styled.div`
  ${tw`text-center py-20 text-red-500`}
`;

const AvailabilityItem = styled.div`
  ${tw`flex items-center`}
`;

const AvailabilityDot = styled.div`
  ${tw`w-4 h-4 rounded mr-2`}
  background-color: ${props => props.available ? '#10b981' : '#d1d5db'};
`;

const AvailabilityText = styled.span`
  ${tw`capitalize`}
`;

const SkillsContainer = styled.div`
  ${tw`mb-6`}
`;

const SkillsList = styled.div`
  ${tw`mt-2`}
`;

const InterestsContainer = styled.div`
  ${tw`mb-6`}
`;

const InterestsList = styled.div`
  ${tw`mt-2`}
`;

const AvailabilityContainer = styled.div`
  ${tw`mb-6`}
`;

const AvailabilityGrid = styled.div`
  ${tw`mt-2 grid grid-cols-2 gap-4`}
`;

const TimeCommitmentContainer = styled.div`
  ${tw`mb-6`}
`;

const ActivitiesContainer = styled.div`
  ${tw`flex flex-wrap gap-2`}
`;

const VolunteerProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Not authenticated.');
          setLoading(false);
          return;
        }
        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.message || 'Failed to fetch profile');
          setLoading(false);
          return;
        }
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError('Server error');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tempUserData');
    window.location.href = '/';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <LoadingContainer>Loading...</LoadingContainer>;
  if (error) return <ErrorContainer>{error}</ErrorContainer>;
  if (!user) return <ErrorContainer>No user data found.</ErrorContainer>;

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <ProfileContainer>
            <ProfileHeader>
              <div>
                <ProfileTitle>Volunteer Profile</ProfileTitle>
                <ProfileSubtitle>Complete profile information for {user.name}</ProfileSubtitle>
              </div>
              <ButtonGroup>
                <SecondaryButton onClick={() => window.location.href = '/volunteer/dashboard'}>
                  Back to Dashboard
                </SecondaryButton>
                <SecondaryButton onClick={handleLogout}>
                  Logout
                </SecondaryButton>
              </ButtonGroup>
            </ProfileHeader>

            {/* Stats Overview */}
            <StatsGrid>
              <StatCard>
                <StatNumber>{user.shareCount || 0}</StatNumber>
                <StatLabel>Referrals</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>{user.referralCode || 'N/A'}</StatNumber>
                <StatLabel>Referral Code</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>{user.profileCompleted ? 'Complete' : 'Incomplete'}</StatNumber>
                <StatLabel>Profile Status</StatLabel>
              </StatCard>
            </StatsGrid>

            {/* Personal Information */}
            <Section>
              <SectionTitle>Personal Information</SectionTitle>
              <SectionContent>
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Full Name</InfoLabel>
                    <InfoValue>{user.firstName} {user.lastName}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Email Address</InfoLabel>
                    <InfoValue>{user.email}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Phone Number</InfoLabel>
                    <InfoValue>{user.phone || 'Not provided'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Date of Birth</InfoLabel>
                    <InfoValue>{formatDate(user.dateOfBirth)}</InfoValue>
                  </InfoItem>
                </InfoGrid>
              </SectionContent>
            </Section>

            {/* Address Information */}
            <Section>
              <SectionTitle>Address Information</SectionTitle>
              <SectionContent>
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Address</InfoLabel>
                    <InfoValue>{user.address || 'Not provided'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>City</InfoLabel>
                    <InfoValue>{user.city || 'Not provided'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>State</InfoLabel>
                    <InfoValue>{user.state || 'Not provided'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>ZIP Code</InfoLabel>
                    <InfoValue>{user.zipCode || 'Not provided'}</InfoValue>
                  </InfoItem>
                </InfoGrid>
              </SectionContent>
            </Section>

            {/* Emergency Contact */}
            <Section>
              <SectionTitle>Emergency Contact</SectionTitle>
              <SectionContent>
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Emergency Contact Name</InfoLabel>
                    <InfoValue>{user.emergencyContact || 'Not provided'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Emergency Contact Phone</InfoLabel>
                    <InfoValue>{user.emergencyPhone || 'Not provided'}</InfoValue>
                  </InfoItem>
                </InfoGrid>
              </SectionContent>
            </Section>

            {/* Skills & Interests */}
            <Section>
              <SectionTitle>Skills & Interests</SectionTitle>
              <SectionContent>
                <SkillsContainer>
                  <InfoLabel>Skills</InfoLabel>
                  <SkillsList>
                    {user.skills && user.skills.length > 0 ? (
                      user.skills.map(skill => (
                        <Badge key={skill} variant="info">{skill}</Badge>
                      ))
                    ) : (
                      <InfoValue>No skills listed</InfoValue>
                    )}
                  </SkillsList>
                </SkillsContainer>
                <InterestsContainer>
                  <InfoLabel>Interests</InfoLabel>
                  <InterestsList>
                    {user.interests && user.interests.length > 0 ? (
                      user.interests.map(interest => (
                        <Badge key={interest} variant="success">{interest}</Badge>
                      ))
                    ) : (
                      <InfoValue>No interests listed</InfoValue>
                    )}
                  </InterestsList>
                </InterestsContainer>
                <div>
                  <InfoLabel>Previous Experience</InfoLabel>
                  <InfoValue>{user.experience || 'No experience listed'}</InfoValue>
                </div>
              </SectionContent>
            </Section>

            {/* Availability & Preferences */}
            <Section>
              <SectionTitle>Availability & Preferences</SectionTitle>
              <SectionContent>
                <AvailabilityContainer>
                  <InfoLabel>Availability</InfoLabel>
                  <AvailabilityGrid>
                    {user.availability && Object.entries(user.availability).map(([key, value]) => (
                      <AvailabilityItem key={key}>
                        <AvailabilityDot available={value}></AvailabilityDot>
                        <AvailabilityText>{key}</AvailabilityText>
                      </AvailabilityItem>
                    ))}
                  </AvailabilityGrid>
                </AvailabilityContainer>
                <TimeCommitmentContainer>
                  <InfoLabel>Time Commitment</InfoLabel>
                  <InfoValue>{user.timeCommitment || 'Not specified'}</InfoValue>
                </TimeCommitmentContainer>
                <div>
                  <InfoLabel>Motivation</InfoLabel>
                  <InfoValue>{user.motivation || 'Not provided'}</InfoValue>
                </div>
              </SectionContent>
            </Section>

            {/* Preferred Activities */}
            {user.preferredActivities && user.preferredActivities.length > 0 && (
              <Section>
                <SectionTitle>Preferred Activities</SectionTitle>
                <SectionContent>
                  <ActivitiesContainer>
                    {user.preferredActivities.map(activity => (
                      <Badge key={activity} variant="warning">{activity}</Badge>
                    ))}
                  </ActivitiesContainer>
                </SectionContent>
              </Section>
            )}

            {/* Account Information */}
            <Section>
              <SectionTitle>Account Information</SectionTitle>
              <SectionContent>
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>User Type</InfoLabel>
                                         <InfoValue style={{ textTransform: 'capitalize' }}>{user.userType}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Member Since</InfoLabel>
                    <InfoValue>{formatDate(user.createdAt)}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Profile Completed</InfoLabel>
                    <InfoValue>{user.profileCompleted ? 'Yes' : 'No'}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Referral Code</InfoLabel>
                                         <InfoValue style={{ fontFamily: 'monospace' }}>{user.referralCode}</InfoValue>
                  </InfoItem>
                </InfoGrid>
              </SectionContent>
            </Section>
          </ProfileContainer>
        </Content>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};

export default VolunteerProfilePage; 