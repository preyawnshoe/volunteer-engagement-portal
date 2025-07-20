import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
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

const NGODashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock NGO data
  const ngoData = {
    name: "Green Earth Initiative",
    email: "contact@greenearth.org",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    mission: "To promote environmental conservation and sustainable practices in urban communities",
    foundedYear: "2018",
    totalVolunteers: 156,
    totalHours: 2840,
    totalActivities: 45,
    averageRating: 4.7
  };

  const currentActivities = [
    {
      id: 1,
      title: "Community Garden Cleanup",
      date: "2024-01-25",
      time: "09:00 - 12:00",
      type: "Field Work",
      status: "active",
      volunteers: 15,
      maxVolunteers: 20,
      applications: 8,
      description: "Help maintain and clean the community garden"
    },
    {
      id: 2,
      title: "Environmental Education Workshop",
      date: "2024-01-30",
      time: "14:00 - 16:00",
      type: "Virtual",
      status: "active",
      volunteers: 8,
      maxVolunteers: 15,
      applications: 12,
      description: "Teach children about environmental conservation"
    },
    {
      id: 3,
      title: "Tree Planting Event",
      date: "2024-02-05",
      time: "10:00 - 14:00",
      type: "Field Work",
      status: "upcoming",
      volunteers: 0,
      maxVolunteers: 25,
      applications: 18,
      description: "Plant trees in local parks and neighborhoods"
    }
  ];

  const volunteerApplications = [
    {
      id: 1,
      volunteerName: "John Smith",
      email: "john.s@email.com",
      activity: "Community Garden Cleanup",
      date: "2024-01-16",
      status: "pending",
      skills: ["Gardening", "Physical Work"],
      experience: "Previous experience with community gardens"
    },
    {
      id: 2,
      volunteerName: "Emily Rodriguez",
      email: "emily.r@email.com",
      activity: "Environmental Education Workshop",
      date: "2024-01-15",
      status: "approved",
      skills: ["Teaching", "Communication"],
      experience: "Former teacher with 5 years experience"
    },
    {
      id: 3,
      volunteerName: "Michael Chen",
      email: "michael.c@email.com",
      activity: "Tree Planting Event",
      date: "2024-01-14",
      status: "pending",
      skills: ["Physical Work", "Team Work"],
      experience: "Regular volunteer at local parks"
    }
  ];

  const completedActivities = [
    {
      id: 1,
      title: "Beach Cleanup",
      date: "2024-01-10",
      volunteers: 22,
      hours: 66,
      rating: 4.8,
      feedback: "Excellent organization and great impact on the community"
    },
    {
      id: 2,
      title: "Recycling Awareness Campaign",
      date: "2024-01-05",
      volunteers: 12,
      hours: 36,
      rating: 4.6,
      feedback: "Well-planned campaign with good community engagement"
    },
    {
      id: 3,
      title: "Urban Farming Workshop",
      date: "2023-12-28",
      volunteers: 18,
      hours: 54,
      rating: 4.9,
      feedback: "Very informative and hands-on workshop"
    }
  ];

  const topVolunteers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      hours: 45,
      activities: 8,
      rating: 4.9
    },
    {
      id: 2,
      name: "David Kim",
      email: "david.k@email.com",
      hours: 38,
      activities: 6,
      rating: 4.8
    },
    {
      id: 3,
      name: "Lisa Wang",
      email: "lisa.w@email.com",
      hours: 32,
      activities: 5,
      rating: 4.7
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      upcoming: 'info',
      completed: 'info',
      pending: 'warning',
      approved: 'success',
      rejected: 'danger'
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const renderOverview = () => (
    <>
      <div tw="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Organization Card */}
        <Card>
          <div tw="text-center mb-4">
            <div tw="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span tw="text-white text-2xl font-bold">
                {ngoData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <h3 tw="text-xl font-bold">{ngoData.name}</h3>
            <p tw="text-gray-600">{ngoData.email}</p>
            <p tw="text-gray-600">{ngoData.location}</p>
            <p tw="text-gray-600">Founded: {ngoData.foundedYear}</p>
          </div>
          
          <div tw="border-t pt-4">
            <h4 tw="font-semibold mb-2">Mission</h4>
            <p tw="text-gray-700 text-sm">{ngoData.mission}</p>
          </div>
        </Card>

        {/* Stats */}
        <div tw="lg:col-span-2">
          <StatsGrid>
            <StatCard>
              <StatNumber>{ngoData.totalVolunteers}</StatNumber>
              <StatLabel>Total Volunteers</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{ngoData.totalHours}</StatNumber>
              <StatLabel>Total Hours</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{ngoData.totalActivities}</StatNumber>
              <StatLabel>Activities Completed</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{ngoData.averageRating}</StatNumber>
              <StatLabel>Average Rating</StatLabel>
            </StatCard>
          </StatsGrid>
        </div>
      </div>

      {/* Current Activities */}
      <Section>
        <SectionTitle>Current Activities</SectionTitle>
        <div tw="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentActivities.map(activity => (
            <Card key={activity.id}>
              <div tw="flex justify-between items-start mb-2">
                <h4 tw="font-semibold text-lg">{activity.title}</h4>
                {getStatusBadge(activity.status)}
              </div>
              <p tw="text-gray-800 mb-2">{activity.description}</p>
              <div tw="text-sm text-gray-600 mb-3">
                <p>📅 {activity.date}</p>
                <p>🕒 {activity.time}</p>
                <p>📍 {activity.type}</p>
                <p>👥 {activity.volunteers}/{activity.maxVolunteers} volunteers</p>
                <p>📝 {activity.applications} applications</p>
              </div>
              <div tw="flex space-x-2">
                <SecondaryButton>View Details</SecondaryButton>
                <PrimaryButton>Manage</PrimaryButton>
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
        <SectionTitle>Completed Activities</SectionTitle>
        {completedActivities.map(activity => (
          <Card key={activity.id}>
            <div tw="flex justify-between items-start mb-2">
              <h4 tw="font-semibold">{activity.title}</h4>
              <div tw="text-right">
                <div tw="text-sm text-gray-600">{activity.date}</div>
                <div tw="text-sm font-medium">{activity.hours} hours</div>
              </div>
            </div>
            <p tw="text-gray-600 text-sm mb-2">👥 {activity.volunteers} volunteers</p>
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
        <SectionTitle>Top Volunteers</SectionTitle>
        {topVolunteers.map(volunteer => (
          <Card key={volunteer.id}>
            <div tw="flex justify-between items-start mb-2">
              <div>
                <h4 tw="font-semibold">{volunteer.name}</h4>
                <p tw="text-gray-600 text-sm">{volunteer.email}</p>
              </div>
              <div tw="text-right">
                <div tw="text-sm font-medium">{volunteer.hours} hours</div>
                <div tw="text-sm text-gray-600">{volunteer.activities} activities</div>
              </div>
            </div>
            <div tw="flex items-center">
              <span tw="text-sm text-gray-600 mr-2">Rating:</span>
              <div tw="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} tw="text-yellow-400">
                    {i < volunteer.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </Section>
    </div>
  );

  const renderApplications = () => (
    <Section>
      <SectionTitle>Volunteer Applications</SectionTitle>
      <div tw="bg-white rounded-lg shadow overflow-hidden">
        <div tw="overflow-x-auto">
          <table tw="min-w-full divide-y divide-gray-200">
            <thead tw="bg-gray-100">
              <tr>
                <th tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volunteer
                </th>
                <th tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Applied
                </th>
                <th tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody tw="bg-white divide-y divide-gray-200">
              {volunteerApplications.map(app => (
                <tr key={app.id} tw="hover:bg-gray-100">
                  <td tw="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div tw="text-sm font-medium text-gray-900">{app.volunteerName}</div>
                      <div tw="text-sm text-gray-500">{app.email}</div>
                    </div>
                  </td>
                  <td tw="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.activity}
                  </td>
                  <td tw="px-6 py-4 whitespace-nowrap">
                    <div tw="flex flex-wrap gap-1">
                      {app.skills.map(skill => (
                        <Badge key={skill} variant="info">{skill}</Badge>
                      ))}
                    </div>
                  </td>
                  <td tw="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.date}
                  </td>
                  <td tw="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(app.status)}
                  </td>
                  <td tw="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div tw="flex space-x-2">
                      {app.status === 'pending' && (
                        <>
                          <button tw="text-green-600 hover:text-green-900">Approve</button>
                          <button tw="text-red-600 hover:text-red-900">Reject</button>
                        </>
                      )}
                      <button tw="text-blue-600 hover:text-blue-900">View Profile</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );

  const renderAnalytics = () => (
    <div tw="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Section>
        <SectionTitle>Volunteer Growth</SectionTitle>
        <div tw="bg-white rounded-lg shadow p-6">
          <div tw="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p tw="text-gray-500">Chart: Monthly volunteer registration trends</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle>Activity Performance</SectionTitle>
        <div tw="bg-white rounded-lg shadow p-6">
          <div tw="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p tw="text-gray-500">Chart: Activity completion rates and ratings</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle>Hours Distribution</SectionTitle>
        <div tw="bg-white rounded-lg shadow p-6">
          <div tw="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p tw="text-gray-500">Chart: Volunteer hours by activity type</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle>Volunteer Demographics</SectionTitle>
        <div tw="bg-white rounded-lg shadow p-6">
          <div tw="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p tw="text-gray-500">Chart: Age, skills, and location distribution</p>
          </div>
        </div>
      </Section>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview();
      case 'activities': return renderActivities();
      case 'applications': return renderApplications();
      case 'analytics': return renderAnalytics();
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
              <h1 tw="text-4xl font-bold text-gray-800 mb-4">NGO Dashboard</h1>
              <p tw="text-gray-600">Manage your activities, volunteers, and track your impact</p>
            </div>

            {/* Navigation Tabs */}
            <div tw="border-b border-gray-200 mb-8">
              <nav tw="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'activities', label: 'Activities' },
                  { id: 'applications', label: 'Applications' },
                  { id: 'analytics', label: 'Analytics' }
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

            {/* Quick Actions */}
            <div tw="mb-8 flex space-x-4">
              <PrimaryButton>Create New Activity</PrimaryButton>
              <SecondaryButton>View All Volunteers</SecondaryButton>
              <SecondaryButton>Generate Report</SecondaryButton>
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

export default NGODashboardPage; 