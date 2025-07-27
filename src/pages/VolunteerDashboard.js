import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/authenticated.js";
import Footer from "components/footers/FiveColumnWithBackground.js";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const DashboardContainer = tw.div`bg-white rounded-lg shadow-lg p-8`;
const StatsGrid = tw.div`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8`;
const StatCard = tw.div`bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-lg`;
const StatNumber = tw.div`text-3xl font-bold mb-2`;
const StatLabel = tw.div`text-sm opacity-75`;
const Section = tw.div`mb-8`;
const SectionTitle = tw.h2`text-2xl font-bold text-gray-800 mb-4`;
const Card = tw.div`bg-white rounded-lg shadow-md p-6 mb-4`;
const Button = tw.button`px-4 py-2 rounded font-medium transition duration-200`;
const PrimaryButton = styled(Button)`
  ${tw`bg-primary-500 text-white hover:bg-primary-600`}
`;
const SecondaryButton = styled(Button)`
  ${tw`bg-gray-200 text-gray-800 hover:bg-gray-300`}
`;
const Badge = styled.span`
  ${tw`inline-flex px-2 py-1 text-xs font-semibold rounded-full`}
  ${props => props.variant === 'success' && tw`bg-green-100 text-green-800`}
  ${props => props.variant === 'warning' && tw`bg-yellow-100 text-yellow-800`}
  ${props => props.variant === 'danger' && tw`bg-red-100 text-red-800`}
  ${props => props.variant === 'info' && tw`bg-blue-100 text-blue-800`}
`;

const VolunteerDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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

  const handleCopyReferral = () => {
    if (user && user.referralCode) {
      const url = `${window.location.origin}/signup?ref=${user.referralCode}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tempUserData');
    window.location.href = '/';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  // Mock volunteer data
  const volunteerData = {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    totalHours: 156,
    totalActivities: 23,
    rating: 4.9,
    skills: ["Teaching", "Event Planning", "Social Media", "First Aid"],
    interests: ["Education", "Youth Programs", "Community Development"],
    availability: {
      weekdays: true,
      weekends: true,
      evenings: true,
      mornings: false
    }
  };

  const upcomingActivities = [
    {
      id: 1,
      title: "Virtual Tutoring Session",
      ngo: "Education First",
      date: "2024-01-20",
      time: "14:00 - 16:00",
      type: "Virtual",
      status: "confirmed",
      description: "Help high school students with math and science subjects"
    },
    {
      id: 2,
      title: "Community Garden Cleanup",
      ngo: "Green Earth Initiative",
      date: "2024-01-25",
      time: "09:00 - 12:00",
      type: "Field Work",
      status: "confirmed",
      description: "Help maintain and clean the community garden"
    },
    {
      id: 3,
      title: "Food Bank Distribution",
      ngo: "Community Care",
      date: "2024-01-28",
      time: "10:00 - 14:00",
      type: "Field Work",
      status: "pending",
      description: "Assist with food distribution to families in need"
    }
  ];

  const pastActivities = [
    {
      id: 1,
      title: "Senior Center Visit",
      ngo: "Golden Years Support",
      date: "2024-01-14",
      hours: 4,
      rating: 5,
      feedback: "Great experience! The seniors were very welcoming."
    },
    {
      id: 2,
      title: "Fundraising Event",
      ngo: "Hope Foundation",
      date: "2024-01-10",
      hours: 6,
      rating: 4,
      feedback: "Well organized event with good team coordination."
    },
    {
      id: 3,
      title: "Youth Mentoring",
      ngo: "Future Leaders",
      date: "2024-01-05",
      hours: 3,
      rating: 5,
      feedback: "Very rewarding to help young people develop their skills."
    }
  ];

  const recommendedActivities = [
    {
      id: 1,
      title: "After-School Program Assistant",
      ngo: "Education First",
      date: "2024-01-22",
      time: "15:00 - 17:00",
      type: "Field Work",
      location: "Downtown Community Center",
      requiredSkills: ["Teaching", "Patience"],
      description: "Help children with homework and educational activities"
    },
    {
      id: 2,
      title: "Social Media Content Creator",
      ngo: "Digital Impact",
      date: "2024-01-24",
      time: "Flexible",
      type: "Virtual",
      location: "Remote",
      requiredSkills: ["Social Media", "Content Creation"],
      description: "Create engaging content for NGO's social media platforms"
    },
    {
      id: 3,
      title: "Event Planning Committee",
      ngo: "Community Events",
      date: "2024-02-01",
      time: "18:00 - 20:00",
      type: "Hybrid",
      location: "Community Hall",
      requiredSkills: ["Event Planning", "Organization"],
      description: "Help plan and organize community fundraising events"
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      confirmed: 'success',
      pending: 'warning',
      completed: 'info'
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const renderOverview = () => (
    <>
      <div tw="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Profile Card */}
        <Card>
          <div tw="text-center mb-4">
            <div tw="w-24 h-24 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span tw="text-white text-2xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <h3 tw="text-xl font-bold">{user.name}</h3>
            <p tw="text-gray-600">{user.email}</p>
            {user.location && <p tw="text-gray-600">{user.location}</p>}
          </div>
          <div tw="border-t pt-4">
            <h4 tw="font-semibold mb-2">Referral Link</h4>
            <div tw="flex items-center mb-2">
              <input
                type="text"
                value={`${window.location.origin}/signup?ref=${user.referralCode}`}
                readOnly
                style={{ flex: 1, marginRight: 8, padding: 4, borderRadius: 4, border: '1px solid #ddd' }}
              />
              <PrimaryButton onClick={handleCopyReferral} type="button">
                {copied ? 'Copied!' : 'Copy'}
              </PrimaryButton>
            </div>
            <div tw="text-xs text-gray-500 mb-2">Share this link to invite others and increase your referral count!</div>
            <div tw="text-sm font-medium">Your Referrals: <span tw="text-primary-500">{user.shareCount || 0}</span></div>
          </div>
          
          <div tw="border-t pt-4">
            <h4 tw="font-semibold mb-2">Skills</h4>
            <div tw="flex flex-wrap gap-1 mb-4">
              {volunteerData.skills.map(skill => (
                <Badge key={skill} variant="info">{skill}</Badge>
              ))}
            </div>
            
            <h4 tw="font-semibold mb-2">Interests</h4>
            <div tw="flex flex-wrap gap-1">
              {volunteerData.interests.map(interest => (
                <Badge key={interest} variant="success">{interest}</Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div tw="lg:col-span-2">
          <StatsGrid>
            <StatCard>
              <StatNumber>{user.totalHours || 0}</StatNumber>
              <StatLabel>Total Hours</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{user.totalActivities || 0}</StatNumber>
              <StatLabel>Activities Completed</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{user.rating || '-'}</StatNumber>
              <StatLabel>Average Rating</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{upcomingActivities.length}</StatNumber>
              <StatLabel>Upcoming Activities</StatLabel>
            </StatCard>
          </StatsGrid>
        </div>
      </div>

      {/* Upcoming Activities */}
      <Section>
        <SectionTitle>Upcoming Activities</SectionTitle>
        <div tw="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingActivities.map(activity => (
            <Card key={activity.id}>
              <div tw="flex justify-between items-start mb-2">
                <h4 tw="font-semibold text-lg">{activity.title}</h4>
                {getStatusBadge(activity.status)}
              </div>
              <p tw="text-gray-600 text-sm mb-2">{activity.ngo}</p>
              <p tw="text-gray-800 mb-2">{activity.description}</p>
              <div tw="text-sm text-gray-600 mb-3">
                <p>📅 {activity.date}</p>
                <p>🕒 {activity.time}</p>
                <p>📍 {activity.type}</p>
              </div>
              <div tw="flex space-x-2">
                <SecondaryButton>View Details</SecondaryButton>
                {activity.status === 'pending' && (
                  <PrimaryButton>Confirm</PrimaryButton>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );

  const renderActivities = () => (
    <div tw="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Section>
        <SectionTitle>Past Activities</SectionTitle>
        {pastActivities.map(activity => (
          <Card key={activity.id}>
            <div tw="flex justify-between items-start mb-2">
              <h4 tw="font-semibold">{activity.title}</h4>
              <div tw="text-right">
                <div tw="text-sm text-gray-600">{activity.date}</div>
                <div tw="text-sm font-medium">{activity.hours} hours</div>
              </div>
            </div>
            <p tw="text-gray-600 text-sm mb-2">{activity.ngo}</p>
            <p tw="text-gray-800 mb-2">{activity.feedback}</p>
            <div tw="flex items-center">
              <span tw="text-sm text-gray-600 mr-2">Rating:</span>
              <div tw="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} tw="text-yellow-400">
                    {i < activity.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </Section>

      <Section>
        <SectionTitle>Recommended Activities</SectionTitle>
        {recommendedActivities.map(activity => (
          <Card key={activity.id}>
            <div tw="flex justify-between items-start mb-2">
              <h4 tw="font-semibold">{activity.title}</h4>
              <Badge variant="info">{activity.type}</Badge>
            </div>
            <p tw="text-gray-600 text-sm mb-2">{activity.ngo}</p>
            <p tw="text-gray-800 mb-2">{activity.description}</p>
            <div tw="text-sm text-gray-600 mb-3">
              <p>📅 {activity.date}</p>
              <p>🕒 {activity.time}</p>
              <p>📍 {activity.location}</p>
            </div>
            <div tw="mb-3">
              <span tw="text-sm text-gray-600">Required Skills: </span>
              <div tw="flex flex-wrap gap-1 mt-1">
                {activity.requiredSkills.map(skill => (
                  <Badge key={skill} variant="warning">{skill}</Badge>
                ))}
              </div>
            </div>
            <PrimaryButton>Apply Now</PrimaryButton>
          </Card>
        ))}
      </Section>
    </div>
  );

  const renderProfile = () => (
    <div tw="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Section>
        <SectionTitle>Personal Information</SectionTitle>
        <Card>
          <div tw="space-y-4">
            <div>
              <label tw="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={user.name}
                tw="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                readOnly
              />
            </div>
            <div>
              <label tw="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                value={user.email}
                tw="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                readOnly
              />
            </div>
            {/* Add more fields as needed */}
          </div>
        </Card>
      </Section>

      <Section>
        <SectionTitle>Availability & Preferences</SectionTitle>
        <Card>
          <div tw="space-y-4">
            <div>
              <h4 tw="font-semibold mb-2">Availability</h4>
              <div tw="space-y-2">
                {Object.entries(volunteerData.availability).map(([key, value]) => (
                  <label key={key} tw="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      tw="mr-2"
                    />
                    <span tw="capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 tw="font-semibold mb-2">Skills</h4>
              <div tw="flex flex-wrap gap-1 mb-2">
                {volunteerData.skills.map(skill => (
                  <Badge key={skill} variant="info">{skill}</Badge>
                ))}
              </div>
              <SecondaryButton>Edit Skills</SecondaryButton>
            </div>
            
            <div>
              <h4 tw="font-semibold mb-2">Interests</h4>
              <div tw="flex flex-wrap gap-1 mb-2">
                {volunteerData.interests.map(interest => (
                  <Badge key={interest} variant="success">{interest}</Badge>
                ))}
              </div>
              <SecondaryButton>Edit Interests</SecondaryButton>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview();
      case 'activities': return renderActivities();
      case 'profile': return renderProfile();
      default: return renderOverview();
    }
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <DashboardContainer>
            <div tw="mb-8">
              <div tw="flex justify-between items-start mb-4">
                <div>
                  <h1 tw="text-4xl font-bold text-gray-800 mb-4">Volunteer Dashboard</h1>
                  <p tw="text-gray-600">Welcome back, {user.name}! Here's your volunteering overview.</p>
                </div>
                <div tw="flex space-x-3">
                  <PrimaryButton onClick={() => window.location.href = '/volunteer/profile'}>
                    View Full Profile
                  </PrimaryButton>
                  <SecondaryButton onClick={handleLogout}>
                    Logout
                  </SecondaryButton>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div tw="border-b border-gray-200 mb-8">
              <nav tw="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'activities', label: 'Activities' },
                  { id: 'profile', label: 'Profile' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    css={[
                      tw`py-2 px-1 border-b-2 font-medium text-sm`,
                      activeTab === tab.id
                        ? tw`border-primary-500 text-primary-600`
                        : tw`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`
                    ]}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </DashboardContainer>
        </Content>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};

export default VolunteerDashboardPage; 