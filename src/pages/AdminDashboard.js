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
const Table = tw.table`w-full bg-white rounded-lg shadow overflow-hidden`;
const TableHeader = tw.th`px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`;
const TableCell = tw.td`px-6 py-4 whitespace-nowrap text-sm text-gray-900`;
const TableRow = tw.tr`hover:bg-gray-100`;
const Badge = styled.span`
  ${tw`inline-flex px-2 py-1 text-xs font-semibold rounded-full`}
  ${props => props.variant === 'success' && tw`bg-green-100 text-green-800`}
  ${props => props.variant === 'warning' && tw`bg-yellow-100 text-yellow-800`}
  ${props => props.variant === 'danger' && tw`bg-red-100 text-red-800`}
  ${props => props.variant === 'info' && tw`bg-blue-100 text-blue-800`}
`;

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in a real app, this would come from your backend
  const stats = {
    totalVolunteers: 1247,
    activeVolunteers: 892,
    totalHours: 15420,
    totalActivities: 156,
    pendingApplications: 23,
    upcomingActivities: 12,
    completedActivities: 134,
    averageRating: 4.6
  };

  const recentActivities = [
    {
      id: 1,
      title: "Community Garden Cleanup",
      ngo: "Green Earth Initiative",
      volunteers: 15,
      hours: 45,
      status: "completed",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Virtual Tutoring Session",
      ngo: "Education First",
      volunteers: 8,
      hours: 24,
      status: "ongoing",
      date: "2024-01-16"
    },
    {
      id: 3,
      title: "Food Bank Distribution",
      ngo: "Community Care",
      volunteers: 12,
      hours: 36,
      status: "upcoming",
      date: "2024-01-18"
    },
    {
      id: 4,
      title: "Senior Center Visit",
      ngo: "Golden Years Support",
      volunteers: 6,
      hours: 18,
      status: "completed",
      date: "2024-01-14"
    }
  ];

  const topVolunteers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      hours: 156,
      activities: 23,
      rating: 4.9
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@email.com",
      hours: 142,
      activities: 19,
      rating: 4.8
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      hours: 128,
      activities: 17,
      rating: 4.7
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@email.com",
      hours: 115,
      activities: 15,
      rating: 4.6
    }
  ];

  const pendingApplications = [
    {
      id: 1,
      name: "John Smith",
      email: "john.s@email.com",
      type: "volunteer",
      date: "2024-01-16",
      status: "pending"
    },
    {
      id: 2,
      name: "Hope Foundation",
      email: "contact@hopefoundation.org",
      type: "ngo",
      date: "2024-01-15",
      status: "pending"
    },
    {
      id: 3,
      name: "Lisa Wang",
      email: "lisa.w@email.com",
      type: "volunteer",
      date: "2024-01-14",
      status: "pending"
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      completed: 'success',
      ongoing: 'info',
      upcoming: 'warning',
      pending: 'warning'
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const renderOverview = () => (
    <>
      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.totalVolunteers.toLocaleString()}</StatNumber>
          <StatLabel>Total Volunteers</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalHours.toLocaleString()}</StatNumber>
          <StatLabel>Total Hours</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalActivities}</StatNumber>
          <StatLabel>Total Activities</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.averageRating}</StatNumber>
          <StatLabel>Average Rating</StatLabel>
        </StatCard>
      </StatsGrid>

      <div tw="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section>
          <SectionTitle>Recent Activities</SectionTitle>
          <div tw="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <thead>
                <tr>
                  <TableHeader>Activity</TableHeader>
                  <TableHeader>NGO</TableHeader>
                  <TableHeader>Volunteers</TableHeader>
                  <TableHeader>Hours</TableHeader>
                  <TableHeader>Status</TableHeader>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map(activity => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.title}</TableCell>
                    <TableCell>{activity.ngo}</TableCell>
                    <TableCell>{activity.volunteers}</TableCell>
                    <TableCell>{activity.hours}</TableCell>
                    <TableCell>{getStatusBadge(activity.status)}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
        </Section>

        <Section>
          <SectionTitle>Top Volunteers</SectionTitle>
          <div tw="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <thead>
                <tr>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Hours</TableHeader>
                  <TableHeader>Activities</TableHeader>
                  <TableHeader>Rating</TableHeader>
                </tr>
              </thead>
              <tbody>
                {topVolunteers.map(volunteer => (
                  <TableRow key={volunteer.id}>
                    <TableCell>{volunteer.name}</TableCell>
                    <TableCell>{volunteer.hours}</TableCell>
                    <TableCell>{volunteer.activities}</TableCell>
                    <TableCell>{volunteer.rating}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </div>
        </Section>
      </div>
    </>
  );

  const renderApplications = () => (
    <Section>
      <SectionTitle>Pending Applications</SectionTitle>
      <div tw="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <thead>
            <tr>
              <TableHeader>Name/Organization</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {pendingApplications.map(app => (
              <TableRow key={app.id}>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>
                  <Badge variant={app.type === 'volunteer' ? 'info' : 'warning'}>
                    {app.type.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{app.date}</TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell>
                  <div tw="flex space-x-2">
                    <button tw="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                      Approve
                    </button>
                    <button tw="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
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
        <SectionTitle>Activity Categories</SectionTitle>
        <div tw="bg-white rounded-lg shadow p-6">
          <div tw="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p tw="text-gray-500">Chart: Distribution of activities by category</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle>Hours Distribution</SectionTitle>
        <div tw="bg-white rounded-lg shadow p-6">
          <div tw="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p tw="text-gray-500">Chart: Volunteer hours by NGO</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionTitle>Geographic Distribution</SectionTitle>
        <div tw="bg-white rounded-lg shadow p-6">
          <div tw="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p tw="text-gray-500">Map: Volunteer and NGO locations</p>
          </div>
        </div>
      </Section>
    </div>
  );

  const renderManagement = () => (
    <div tw="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div tw="bg-white rounded-lg shadow p-6">
        <h3 tw="text-lg font-semibold mb-4">User Management</h3>
        <div tw="space-y-2">
          <button tw="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Manage Volunteers
          </button>
          <button tw="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Manage NGOs
          </button>
          <button tw="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            Manage Admins
          </button>
        </div>
      </div>

      <div tw="bg-white rounded-lg shadow p-6">
        <h3 tw="text-lg font-semibold mb-4">Content Management</h3>
        <div tw="space-y-2">
          <button tw="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Manage Activities
          </button>
          <button tw="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Manage Categories
          </button>
          <button tw="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            Manage Skills
          </button>
        </div>
      </div>

      <div tw="bg-white rounded-lg shadow p-6">
        <h3 tw="text-lg font-semibold mb-4">System Settings</h3>
        <div tw="space-y-2">
          <button tw="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            System Configuration
          </button>
          <button tw="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Email Templates
          </button>
          <button tw="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            Backup & Restore
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview();
      case 'applications': return renderApplications();
      case 'analytics': return renderAnalytics();
      case 'management': return renderManagement();
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
              <h1 tw="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
              <p tw="text-gray-600">Manage volunteers, NGOs, and activities across the platform</p>
            </div>

            {/* Navigation Tabs */}
            <div tw="border-b border-gray-200 mb-8">
              <nav tw="flex space-x-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'applications', label: 'Applications' },
                  { id: 'analytics', label: 'Analytics' },
                  { id: 'management', label: 'Management' }
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

export default AdminDashboardPage; 