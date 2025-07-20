import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
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

const VolunteerSignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    skills: [],
    interests: [],
    availability: {
      weekdays: false,
      weekends: false,
      evenings: false,
      mornings: false
    },
    experience: "",
    motivation: "",
    preferredActivities: [],
    timeCommitment: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const availableSkills = [
    "Teaching", "Medical", "Construction", "Cooking", "Driving", 
    "Translation", "IT/Technology", "Fundraising", "Event Planning", 
    "Social Media", "Photography", "Music", "Art", "Sports", 
    "Administration", "Counseling", "Legal", "Accounting"
  ];

  const availableInterests = [
    "Education", "Healthcare", "Environment", "Animal Welfare", 
    "Poverty Alleviation", "Disaster Relief", "Community Development", 
    "Youth Programs", "Elderly Care", "Women Empowerment", 
    "Disability Support", "Cultural Preservation", "Sports & Recreation"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillToggle = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleAvailabilityChange = (time) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [time]: !prev.availability[time]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      skills: selectedSkills,
      interests: selectedInterests
    };
    console.log("Volunteer signup data:", finalData);
    // Here you would typically send the data to your backend
    alert("Thank you for signing up! We'll contact you soon.");
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep1 = () => (
    <>
      <h2>Personal Information</h2>
      <TwoColumn>
        <Column>
          <InputContainer>
            <Label htmlFor="firstName">First Name *</Label>
            <Input 
              id="firstName" 
              name="firstName" 
              type="text" 
              value={formData.firstName}
              onChange={handleInputChange}
              required 
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input 
              id="lastName" 
              name="lastName" 
              type="text" 
              value={formData.lastName}
              onChange={handleInputChange}
              required 
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="email">Email Address *</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              value={formData.phone}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Column>
        <Column>
          <InputContainer>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input 
              id="dateOfBirth" 
              name="dateOfBirth" 
              type="date" 
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="address">Address</Label>
            <TextArea 
              id="address" 
              name="address" 
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street address"
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              name="city" 
              type="text" 
              value={formData.city}
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="state">State</Label>
            <Input 
              id="state" 
              name="state" 
              type="text" 
              value={formData.state}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Column>
      </TwoColumn>
    </>
  );

  const renderStep2 = () => (
    <>
      <h2>Skills & Interests</h2>
      <div tw="mb-8">
        <h3 tw="text-xl font-semibold mb-4">Select Your Skills</h3>
        <div tw="flex flex-wrap">
          {availableSkills.map(skill => (
            <SkillTag 
              key={skill}
              onClick={() => handleSkillToggle(skill)}
              style={{ 
                backgroundColor: selectedSkills.includes(skill) ? '#fbbf24' : '#e5e7eb',
                cursor: 'pointer'
              }}
            >
              {skill}
            </SkillTag>
          ))}
        </div>
      </div>
      
      <div tw="mb-8">
        <h3 tw="text-xl font-semibold mb-4">Select Your Interests</h3>
        <div tw="flex flex-wrap">
          {availableInterests.map(interest => (
            <SkillTag 
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              style={{ 
                backgroundColor: selectedInterests.includes(interest) ? '#fbbf24' : '#e5e7eb',
                cursor: 'pointer'
              }}
            >
              {interest}
            </SkillTag>
          ))}
        </div>
      </div>

      <InputContainer>
        <Label htmlFor="experience">Previous Volunteer Experience</Label>
        <TextArea 
          id="experience" 
          name="experience" 
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Describe any previous volunteer experience..."
        />
      </InputContainer>
    </>
  );

  const renderStep3 = () => (
    <>
      <h2>Availability & Preferences</h2>
      
      <div tw="mb-6">
        <h3 tw="text-xl font-semibold mb-4">When are you available?</h3>
        <div tw="grid grid-cols-2 gap-4">
          {Object.entries(formData.availability).map(([key, value]) => (
            <label key={key} tw="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleAvailabilityChange(key)}
                tw="mr-2"
              />
              <span tw="capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      <InputContainer>
        <Label htmlFor="timeCommitment">Time Commitment</Label>
        <Select 
          id="timeCommitment" 
          name="timeCommitment" 
          value={formData.timeCommitment}
          onChange={handleInputChange}
        >
          <option value="">Select time commitment</option>
          <option value="1-2 hours per week">1-2 hours per week</option>
          <option value="3-5 hours per week">3-5 hours per week</option>
          <option value="6-10 hours per week">6-10 hours per week</option>
          <option value="10+ hours per week">10+ hours per week</option>
          <option value="Occasional/Event-based">Occasional/Event-based</option>
        </Select>
      </InputContainer>

      <InputContainer>
        <Label htmlFor="motivation">Why do you want to volunteer?</Label>
        <TextArea 
          id="motivation" 
          name="motivation" 
          value={formData.motivation}
          onChange={handleInputChange}
          placeholder="Tell us about your motivation to volunteer..."
        />
      </InputContainer>
    </>
  );

  const renderStep4 = () => (
    <>
      <h2>Emergency Contact & Review</h2>
      
      <TwoColumn>
        <Column>
          <InputContainer>
            <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
            <Input 
              id="emergencyContact" 
              name="emergencyContact" 
              type="text" 
              value={formData.emergencyContact}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Column>
        <Column>
          <InputContainer>
            <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
            <Input 
              id="emergencyPhone" 
              name="emergencyPhone" 
              type="tel" 
              value={formData.emergencyPhone}
              onChange={handleInputChange}
            />
          </InputContainer>
        </Column>
      </TwoColumn>

      <div tw="mt-8 p-4 bg-gray-800 rounded">
        <h3 tw="text-lg font-semibold mb-2">Review Your Information</h3>
        <p tw="text-sm">Name: {formData.firstName} {formData.lastName}</p>
        <p tw="text-sm">Email: {formData.email}</p>
        <p tw="text-sm">Skills: {selectedSkills.join(", ") || "None selected"}</p>
        <p tw="text-sm">Interests: {selectedInterests.join(", ") || "None selected"}</p>
        <p tw="text-sm">Time Commitment: {formData.timeCommitment || "Not specified"}</p>
      </div>
    </>
  );

  const renderStepContent = () => {
    switch(currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <FormContainer>
            <div tw="mx-auto max-w-4xl">
              <div tw="mb-8">
                <div tw="flex justify-between items-center mb-4">
                  <h1 tw="text-4xl font-bold">Volunteer Sign Up</h1>
                  <div tw="text-sm">Step {currentStep} of 4</div>
                </div>
                <div tw="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    tw="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {renderStepContent()}

                <div tw="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      tw="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Previous
                    </button>
                  )}
                  
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      tw="px-6 py-2 bg-yellow-400 text-gray-800 rounded hover:bg-yellow-500 ml-auto"
                    >
                      Next
                    </button>
                  ) : (
                    <SubmitButton type="submit" tw="ml-auto">
                      Submit Application
                    </SubmitButton>
                  )}
                </div>
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

export default VolunteerSignupPage; 