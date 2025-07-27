import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/authenticated.js";
import Footer from "components/footers/FiveColumnWithBackground.js";
import { ReactComponent as SvgDotPatternIcon } from "../images/dot-pattern.svg";
import { ReactComponent as ArrowLeftIcon } from "feather-icons/dist/icons/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "feather-icons/dist/icons/arrow-right.svg";
import { ReactComponent as CheckIcon } from "feather-icons/dist/icons/check.svg";

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

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

const NavigationButton = styled.button`
  ${tw`flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
  
  .icon {
    ${tw`w-5 h-5 transition-transform duration-200`}
  }
  
  &:hover .icon {
    ${props => props.direction === 'left' ? tw`transform -translate-x-1` : tw`transform translate-x-1`}
  }
  
  &:hover {
    ${tw`scale-105 shadow-lg`}
  }
  
  &:active {
    ${tw`scale-95`}
  }
`;

const PreviousButton = styled(NavigationButton)`
  ${tw`bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500`}
`;

const NextButton = styled(NavigationButton)`
  ${tw`bg-yellow-400 text-gray-800 hover:bg-yellow-500 focus:ring-yellow-500`}
`;

const SubmitButton = styled(NavigationButton)`
  ${tw`bg-green-500 text-white hover:bg-green-600 focus:ring-green-500`}
`;

const NavigationContainer = tw.div`flex justify-between items-center mt-12 pt-8 border-t border-gray-200`;

const StepIndicator = tw.div`flex justify-center mb-8`;
const StepDot = styled.div`
  ${tw`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 mx-2`}
  ${props => props.completed && tw`bg-green-500 text-white`}
  ${props => props.current && tw`bg-yellow-400 text-gray-800`}
  ${props => props.pending && tw`bg-gray-300 text-gray-600`}
`;

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in or has temp data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const tempUserData = localStorage.getItem('tempUserData');
    
    if (token && userData) {
      // User is already logged in
      setUser(JSON.parse(userData));
      const userObj = JSON.parse(userData);
      setFormData(prev => ({
        ...prev,
        email: userObj.email,
        firstName: userObj.name.split(' ')[0] || '',
        lastName: userObj.name.split(' ').slice(1).join(' ') || ''
      }));
    } else if (tempUserData) {
      // User just completed basic signup, pre-fill with temp data
      const tempData = JSON.parse(tempUserData);
      setFormData(prev => ({
        ...prev,
        email: tempData.email,
        firstName: tempData.name.split(' ')[0] || '',
        lastName: tempData.name.split(' ').slice(1).join(' ') || '',
        phone: tempData.phone || '',
        city: tempData.city || ''
      }));
      // Clear temp data after using it
      localStorage.removeItem('tempUserData');
    } else {
      // No authentication or temp data, redirect to login
      window.location.href = '/login';
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const finalData = {
        ...formData,
        skills: selectedSkills,
        interests: selectedInterests
      };

      let response;
      
      if (token) {
        // User is logged in, complete profile
        response = await fetch('http://localhost:5000/api/volunteer/complete-profile', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(finalData)
        });
      } else {
        // User just completed basic signup, create complete profile
        response = await fetch('http://localhost:5000/api/volunteer/create-complete-profile', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalData)
        });
      }

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || 'Failed to complete profile');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      
      // If user wasn't logged in, store the token and user data
      if (!token && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Redirect to dashboard after successful completion
      setTimeout(() => {
        window.location.href = '/volunteer/dashboard';
      }, 2000);

    } catch (err) {
      setError('Server error');
      setLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const isStepValid = (step) => {
    switch(step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return selectedSkills.length > 0 && selectedInterests.length > 0 && formData.experience;
      case 3:
        return Object.values(formData.availability).some(value => value) && formData.timeCommitment && formData.motivation;
      case 4:
        return formData.emergencyContact && formData.emergencyPhone;
      default:
        return false;
    }
  };

  const getStepValidationMessage = (step) => {
    switch(step) {
      case 1:
        if (!formData.firstName) return "First name is required";
        if (!formData.lastName) return "Last name is required";
        if (!formData.email) return "Email is required";
        if (!formData.phone) return "Phone number is required";
        return null;
      case 2:
        if (selectedSkills.length === 0) return "Please select at least one skill";
        if (selectedInterests.length === 0) return "Please select at least one interest";
        if (!formData.experience) return "Please describe your experience";
        return null;
      case 3:
        if (!Object.values(formData.availability).some(value => value)) return "Please select at least one availability option";
        if (!formData.timeCommitment) return "Please select your time commitment";
        if (!formData.motivation) return "Please share your motivation";
        return null;
      case 4:
        if (!formData.emergencyContact) return "Emergency contact is required";
        if (!formData.emergencyPhone) return "Emergency phone is required";
        return null;
      default:
        return null;
    }
  };

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
                  <h1 tw="text-4xl font-bold">Complete Your Volunteer Profile</h1>
                  <div tw="text-sm">Step {currentStep} of 4</div>
                </div>
                <div tw="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    tw="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  ></div>
                </div>
                {user && (
                  <p tw="text-sm text-gray-300 mt-2">
                    Welcome, {user.name}! Please complete your volunteer profile.
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <StepIndicator>
                  {[1, 2, 3, 4].map(step => (
                    <StepDot
                      key={step}
                      completed={currentStep > step}
                      current={currentStep === step}
                      pending={currentStep < step}
                    >
                      {step}
                    </StepDot>
                  ))}
                </StepIndicator>
                
                {renderStepContent()}

                <NavigationContainer>
                  {currentStep > 1 && (
                    <PreviousButton
                      type="button"
                      onClick={prevStep}
                      direction="left"
                    >
                      <ArrowLeftIcon className="icon" /> Previous
                    </PreviousButton>
                  )}
                  
                  {currentStep < 4 ? (
                    <div tw="flex flex-col items-end">
                      <NextButton
                        type="button"
                        onClick={nextStep}
                        direction="right"
                        disabled={!isStepValid(currentStep)}
                      >
                        Next <ArrowRightIcon className="icon" />
                      </NextButton>
                      {!isStepValid(currentStep) && (
                        <div tw="text-red-500 text-sm mt-2 text-right max-w-xs">
                          {getStepValidationMessage(currentStep)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div tw="flex flex-col items-end">
                      <SubmitButton
                        type="submit"
                        disabled={loading || !isStepValid(currentStep)}
                      >
                        {loading ? 'Completing Profile...' : 'Complete Profile'}
                        <CheckIcon className="icon" />
                      </SubmitButton>
                      {!isStepValid(currentStep) && (
                        <div tw="text-red-500 text-sm mt-2 text-right max-w-xs">
                          {getStepValidationMessage(currentStep)}
                        </div>
                      )}
                    </div>
                  )}
                </NavigationContainer>

                {error && (
                  <div tw="mt-4 p-3 bg-red-600 text-white rounded">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div tw="mt-4 p-3 bg-green-600 text-white rounded">
                    Profile completed successfully! Redirecting to dashboard...
                  </div>
                )}
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