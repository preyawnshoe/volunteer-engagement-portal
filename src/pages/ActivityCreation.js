import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/authenticated.js";
import Footer from "components/footers/FiveColumnWithBackground.js";
import { ReactComponent as SvgDotPatternIcon } from "../images/dot-pattern.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input, textarea, select {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};
    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const Select = tw.select``;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

const SkillTag = styled.span`
  ${tw`inline-block bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`}
`;

const ActivityCreationPage = () => {
  const [formData, setFormData] = useState({
    activityTitle: "",
    activityType: "",
    description: "",
    location: "",
    virtualMeetingLink: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxVolunteers: "",
    minAge: "",
    requiredSkills: [],
    preferredSkills: [],
    activityCategory: "",
    difficultyLevel: "",
    isRecurring: false,
    recurringPattern: "",
    equipment: "",
    safetyRequirements: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    budget: "",
    isUrgent: false,
    tags: []
  });

  const [selectedRequiredSkills, setSelectedRequiredSkills] = useState([]);
  const [selectedPreferredSkills, setSelectedPreferredSkills] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const availableSkills = [
    "Teaching", "Medical", "Construction", "Cooking", "Driving", 
    "Translation", "IT/Technology", "Fundraising", "Event Planning", 
    "Social Media", "Photography", "Music", "Art", "Sports", 
    "Administration", "Counseling", "Legal", "Accounting", "First Aid",
    "Childcare", "Elderly Care", "Animal Care", "Gardening", "Cleaning"
  ];

  const availableTags = [
    "Education", "Healthcare", "Environment", "Community", "Youth", 
    "Elderly", "Disability", "Women", "Children", "Animals", 
    "Emergency", "Fundraising", "Event", "Virtual", "Field Work",
    "Training", "Mentoring", "Support", "Advocacy", "Research"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRequiredSkillToggle = (skill) => {
    if (selectedRequiredSkills.includes(skill)) {
      setSelectedRequiredSkills(selectedRequiredSkills.filter(s => s !== skill));
    } else {
      setSelectedRequiredSkills([...selectedRequiredSkills, skill]);
    }
  };

  const handlePreferredSkillToggle = (skill) => {
    if (selectedPreferredSkills.includes(skill)) {
      setSelectedPreferredSkills(selectedPreferredSkills.filter(s => s !== skill));
    } else {
      setSelectedPreferredSkills([...selectedPreferredSkills, skill]);
    }
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      requiredSkills: selectedRequiredSkills,
      preferredSkills: selectedPreferredSkills,
      tags: selectedTags
    };
    console.log("Activity creation data:", finalData);
    // Here you would typically send the data to your backend
    alert("Activity created successfully! Volunteers will be notified.");
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <FormContainer>
            <div tw="mx-auto max-w-4xl">
              <h1 tw="text-4xl font-bold mb-8">Create New Activity</h1>
              
              <form onSubmit={handleSubmit}>
                <h2>Basic Information</h2>
                <InputContainer>
                  <Label htmlFor="activityTitle">Activity Title *</Label>
                  <Input 
                    id="activityTitle" 
                    name="activityTitle" 
                    type="text" 
                    value={formData.activityTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Community Garden Cleanup"
                    required 
                  />
                </InputContainer>

                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="activityType">Activity Type *</Label>
                      <Select 
                        id="activityType" 
                        name="activityType" 
                        value={formData.activityType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select activity type</option>
                        <option value="Field Work">Field Work</option>
                        <option value="Virtual">Virtual</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Event">Event</option>
                        <option value="Training">Training</option>
                        <option value="Fundraising">Fundraising</option>
                        <option value="Administrative">Administrative</option>
                        <option value="Support">Support</option>
                      </Select>
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="activityCategory">Category</Label>
                      <Select 
                        id="activityCategory" 
                        name="activityCategory" 
                        value={formData.activityCategory}
                        onChange={handleInputChange}
                      >
                        <option value="">Select category</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Environment">Environment</option>
                        <option value="Community Development">Community Development</option>
                        <option value="Youth Programs">Youth Programs</option>
                        <option value="Elderly Care">Elderly Care</option>
                        <option value="Disaster Relief">Disaster Relief</option>
                        <option value="Animal Welfare">Animal Welfare</option>
                        <option value="Human Rights">Human Rights</option>
                        <option value="Cultural">Cultural</option>
                      </Select>
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <InputContainer>
                  <Label htmlFor="description">Activity Description *</Label>
                  <TextArea 
                    id="description" 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the activity, what volunteers will do, and the impact..."
                    required 
                  />
                </InputContainer>

                <h2 tw="mt-12">Location & Timing</h2>
                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        type="text" 
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Physical address or meeting point"
                      />
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="virtualMeetingLink">Virtual Meeting Link</Label>
                      <Input 
                        id="virtualMeetingLink" 
                        name="virtualMeetingLink" 
                        type="url" 
                        value={formData.virtualMeetingLink}
                        onChange={handleInputChange}
                        placeholder="Zoom, Teams, or other meeting link"
                      />
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input 
                        id="startDate" 
                        name="startDate" 
                        type="date" 
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required 
                      />
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input 
                        id="endDate" 
                        name="endDate" 
                        type="date" 
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input 
                        id="startTime" 
                        name="startTime" 
                        type="time" 
                        value={formData.startTime}
                        onChange={handleInputChange}
                        required 
                      />
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input 
                        id="endTime" 
                        name="endTime" 
                        type="time" 
                        value={formData.endTime}
                        onChange={handleInputChange}
                        required 
                      />
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <div tw="mb-6">
                  <label tw="flex items-center">
                    <input
                      type="checkbox"
                      name="isRecurring"
                      checked={formData.isRecurring}
                      onChange={handleInputChange}
                      tw="mr-2"
                    />
                    <span>This is a recurring activity</span>
                  </label>
                </div>

                {formData.isRecurring && (
                  <InputContainer>
                    <Label htmlFor="recurringPattern">Recurring Pattern</Label>
                    <Select 
                      id="recurringPattern" 
                      name="recurringPattern" 
                      value={formData.recurringPattern}
                      onChange={handleInputChange}
                    >
                      <option value="">Select pattern</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Custom">Custom</option>
                    </Select>
                  </InputContainer>
                )}

                <h2 tw="mt-12">Volunteer Requirements</h2>
                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="maxVolunteers">Maximum Volunteers</Label>
                      <Input 
                        id="maxVolunteers" 
                        name="maxVolunteers" 
                        type="number" 
                        min="1"
                        value={formData.maxVolunteers}
                        onChange={handleInputChange}
                        placeholder="Leave empty for unlimited"
                      />
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="minAge">Minimum Age</Label>
                      <Input 
                        id="minAge" 
                        name="minAge" 
                        type="number" 
                        min="0"
                        value={formData.minAge}
                        onChange={handleInputChange}
                        placeholder="e.g., 18"
                      />
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <InputContainer>
                  <Label htmlFor="difficultyLevel">Difficulty Level</Label>
                  <Select 
                    id="difficultyLevel" 
                    name="difficultyLevel" 
                    value={formData.difficultyLevel}
                    onChange={handleInputChange}
                  >
                    <option value="">Select difficulty level</option>
                    <option value="Beginner">Beginner - No experience needed</option>
                    <option value="Intermediate">Intermediate - Some experience helpful</option>
                    <option value="Advanced">Advanced - Experience required</option>
                    <option value="Expert">Expert - Specialized skills needed</option>
                  </Select>
                </InputContainer>

                <div tw="mb-6">
                  <h3 tw="text-xl font-semibold mb-4">Required Skills</h3>
                  <p tw="text-sm mb-4">Skills that volunteers must have:</p>
                  <div tw="flex flex-wrap">
                    {availableSkills.map(skill => (
                      <SkillTag 
                        key={skill}
                        onClick={() => handleRequiredSkillToggle(skill)}
                        style={{ 
                          backgroundColor: selectedRequiredSkills.includes(skill) ? '#fbbf24' : '#e5e7eb',
                          cursor: 'pointer'
                        }}
                      >
                        {skill}
                      </SkillTag>
                    ))}
                  </div>
                </div>

                <div tw="mb-6">
                  <h3 tw="text-xl font-semibold mb-4">Preferred Skills</h3>
                  <p tw="text-sm mb-4">Skills that would be helpful but not required:</p>
                  <div tw="flex flex-wrap">
                    {availableSkills.map(skill => (
                      <SkillTag 
                        key={skill}
                        onClick={() => handlePreferredSkillToggle(skill)}
                        style={{ 
                          backgroundColor: selectedPreferredSkills.includes(skill) ? '#fbbf24' : '#e5e7eb',
                          cursor: 'pointer'
                        }}
                      >
                        {skill}
                      </SkillTag>
                    ))}
                  </div>
                </div>

                <h2 tw="mt-12">Additional Details</h2>
                <InputContainer>
                  <Label htmlFor="equipment">Equipment Needed</Label>
                  <TextArea 
                    id="equipment" 
                    name="equipment" 
                    value={formData.equipment}
                    onChange={handleInputChange}
                    placeholder="List any equipment volunteers should bring or will be provided..."
                  />
                </InputContainer>

                <InputContainer>
                  <Label htmlFor="safetyRequirements">Safety Requirements</Label>
                  <TextArea 
                    id="safetyRequirements" 
                    name="safetyRequirements" 
                    value={formData.safetyRequirements}
                    onChange={handleInputChange}
                    placeholder="Any safety protocols, PPE requirements, or health considerations..."
                  />
                </InputContainer>

                <h2 tw="mt-12">Contact Information</h2>
                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="contactPerson">Activity Contact Person</Label>
                      <Input 
                        id="contactPerson" 
                        name="contactPerson" 
                        type="text" 
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                      />
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input 
                        id="contactPhone" 
                        name="contactPhone" 
                        type="tel" 
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                      />
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <InputContainer>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail" 
                    type="email" 
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                  />
                </InputContainer>

                <h2 tw="mt-12">Activity Tags</h2>
                <div tw="mb-6">
                  <p tw="text-sm mb-4">Select tags to help volunteers find this activity:</p>
                  <div tw="flex flex-wrap">
                    {availableTags.map(tag => (
                      <SkillTag 
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        style={{ 
                          backgroundColor: selectedTags.includes(tag) ? '#fbbf24' : '#e5e7eb',
                          cursor: 'pointer'
                        }}
                      >
                        {tag}
                      </SkillTag>
                    ))}
                  </div>
                </div>

                <div tw="mb-6">
                  <label tw="flex items-center">
                    <input
                      type="checkbox"
                      name="isUrgent"
                      checked={formData.isUrgent}
                      onChange={handleInputChange}
                      tw="mr-2"
                    />
                    <span>Mark as urgent - This activity needs immediate attention</span>
                  </label>
                </div>

                <SubmitButton type="submit">
                  Create Activity
                </SubmitButton>
              </form>
            </div>
            <SvgDotPattern1 />
          </FormContainer>
        </Content>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};

export default ActivityCreationPage; 