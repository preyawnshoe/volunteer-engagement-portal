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

const NGORegistrationPage = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    registrationNumber: "",
    foundedYear: "",
    organizationType: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    mission: "",
    vision: "",
    focusAreas: [],
    currentProjects: "",
    volunteerNeeds: "",
    fundingSources: [],
    staffCount: "",
    annualBudget: "",
    legalStatus: "",
    taxExempt: false,
    certifications: []
  });

  const [selectedFocusAreas, setSelectedFocusAreas] = useState([]);
  const [selectedFundingSources, setSelectedFundingSources] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);

  const availableFocusAreas = [
    "Education", "Healthcare", "Environment", "Poverty Alleviation", 
    "Women Empowerment", "Child Welfare", "Disaster Relief", 
    "Community Development", "Animal Welfare", "Human Rights", 
    "Youth Development", "Elderly Care", "Disability Support", 
    "Cultural Preservation", "Sports & Recreation", "Mental Health"
  ];

  const availableFundingSources = [
    "Government Grants", "Private Donations", "Corporate Sponsorships", 
    "International Aid", "Fundraising Events", "Membership Fees", 
    "Service Fees", "Investment Income", "Crowdfunding", "Foundation Grants"
  ];

  const availableCertifications = [
    "ISO 9001", "ISO 14001", "Social Enterprise Certification", 
    "Charity Registration", "Tax Exempt Status", "Quality Management", 
    "Environmental Management", "Health & Safety", "Data Protection"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFocusAreaToggle = (area) => {
    if (selectedFocusAreas.includes(area)) {
      setSelectedFocusAreas(selectedFocusAreas.filter(a => a !== area));
    } else {
      setSelectedFocusAreas([...selectedFocusAreas, area]);
    }
  };

  const handleFundingSourceToggle = (source) => {
    if (selectedFundingSources.includes(source)) {
      setSelectedFundingSources(selectedFundingSources.filter(s => s !== source));
    } else {
      setSelectedFundingSources([...selectedFundingSources, source]);
    }
  };

  const handleCertificationToggle = (cert) => {
    if (selectedCertifications.includes(cert)) {
      setSelectedCertifications(selectedCertifications.filter(c => c !== cert));
    } else {
      setSelectedCertifications([...selectedCertifications, cert]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      focusAreas: selectedFocusAreas,
      fundingSources: selectedFundingSources,
      certifications: selectedCertifications
    };
    console.log("NGO registration data:", finalData);
    // Here you would typically send the data to your backend
    alert("Thank you for registering! We'll review your application and contact you soon.");
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <Content>
          <FormContainer>
            <div tw="mx-auto max-w-4xl">
              <h1 tw="text-4xl font-bold mb-8">NGO Registration</h1>
              
              <form onSubmit={handleSubmit}>
                <h2>Organization Information</h2>
                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="organizationName">Organization Name *</Label>
                      <Input 
                        id="organizationName" 
                        name="organizationName" 
                        type="text" 
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        required 
                      />
                    </InputContainer>
                    <InputContainer>
                      <Label htmlFor="registrationNumber">Registration Number</Label>
                      <Input 
                        id="registrationNumber" 
                        name="registrationNumber" 
                        type="text" 
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                      />
                    </InputContainer>
                    <InputContainer>
                      <Label htmlFor="foundedYear">Year Founded</Label>
                      <Input 
                        id="foundedYear" 
                        name="foundedYear" 
                        type="number" 
                        min="1900"
                        max={new Date().getFullYear()}
                        value={formData.foundedYear}
                        onChange={handleInputChange}
                      />
                    </InputContainer>
                    <InputContainer>
                      <Label htmlFor="organizationType">Organization Type</Label>
                      <Select 
                        id="organizationType" 
                        name="organizationType" 
                        value={formData.organizationType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select organization type</option>
                        <option value="Non-Profit">Non-Profit</option>
                        <option value="Charity">Charity</option>
                        <option value="Foundation">Foundation</option>
                        <option value="Social Enterprise">Social Enterprise</option>
                        <option value="Community Organization">Community Organization</option>
                        <option value="Religious Organization">Religious Organization</option>
                        <option value="Educational Institution">Educational Institution</option>
                        <option value="Healthcare Organization">Healthcare Organization</option>
                      </Select>
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        name="website" 
                        type="url" 
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://www.example.org"
                      />
                    </InputContainer>
                    <InputContainer>
                      <Label htmlFor="email">Organization Email *</Label>
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
                      <Label htmlFor="phone">Organization Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </InputContainer>
                    <InputContainer>
                      <Label htmlFor="legalStatus">Legal Status</Label>
                      <Select 
                        id="legalStatus" 
                        name="legalStatus" 
                        value={formData.legalStatus}
                        onChange={handleInputChange}
                      >
                        <option value="">Select legal status</option>
                        <option value="Registered NGO">Registered NGO</option>
                        <option value="Charitable Trust">Charitable Trust</option>
                        <option value="Society">Society</option>
                        <option value="Section 8 Company">Section 8 Company</option>
                        <option value="Foundation">Foundation</option>
                        <option value="Other">Other</option>
                      </Select>
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <h2 tw="mt-12">Address Information</h2>
                <InputContainer>
                  <Label htmlFor="address">Street Address</Label>
                  <TextArea 
                    id="address" 
                    name="address" 
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Complete street address"
                  />
                </InputContainer>
                
                <TwoColumn>
                  <Column>
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
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="state">State/Province</Label>
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

                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input 
                        id="zipCode" 
                        name="zipCode" 
                        type="text" 
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country" 
                        name="country" 
                        type="text" 
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <h2 tw="mt-12">Contact Person</h2>
                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="contactPerson">Contact Person Name *</Label>
                      <Input 
                        id="contactPerson" 
                        name="contactPerson" 
                        type="text" 
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        required 
                      />
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="contactPhone">Contact Person Phone</Label>
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
                  <Label htmlFor="contactEmail">Contact Person Email *</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail" 
                    type="email" 
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required 
                  />
                </InputContainer>

                <h2 tw="mt-12">Mission & Vision</h2>
                <InputContainer>
                  <Label htmlFor="mission">Mission Statement *</Label>
                  <TextArea 
                    id="mission" 
                    name="mission" 
                    value={formData.mission}
                    onChange={handleInputChange}
                    placeholder="Describe your organization's mission..."
                    required 
                  />
                </InputContainer>

                <InputContainer>
                  <Label htmlFor="vision">Vision Statement</Label>
                  <TextArea 
                    id="vision" 
                    name="vision" 
                    value={formData.vision}
                    onChange={handleInputChange}
                    placeholder="Describe your organization's vision..."
                  />
                </InputContainer>

                <h2 tw="mt-12">Focus Areas</h2>
                <div tw="mb-6">
                  <p tw="text-sm mb-4">Select the areas your organization focuses on:</p>
                  <div tw="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableFocusAreas.map(area => (
                      <label key={area} tw="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFocusAreas.includes(area)}
                          onChange={() => handleFocusAreaToggle(area)}
                          tw="mr-2"
                        />
                        <span tw="text-sm">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <h2 tw="mt-12">Organization Details</h2>
                <TwoColumn>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="staffCount">Number of Staff</Label>
                      <Input 
                        id="staffCount" 
                        name="staffCount" 
                        type="number" 
                        min="0"
                        value={formData.staffCount}
                        onChange={handleInputChange}
                      />
                    </InputContainer>
                  </Column>
                  <Column>
                    <InputContainer>
                      <Label htmlFor="annualBudget">Annual Budget (USD)</Label>
                      <Select 
                        id="annualBudget" 
                        name="annualBudget" 
                        value={formData.annualBudget}
                        onChange={handleInputChange}
                      >
                        <option value="">Select budget range</option>
                        <option value="Under $10,000">Under $10,000</option>
                        <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                        <option value="$100,000 - $500,000">$100,000 - $500,000</option>
                        <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                        <option value="Over $1,000,000">Over $1,000,000</option>
                      </Select>
                    </InputContainer>
                  </Column>
                </TwoColumn>

                <InputContainer>
                  <Label htmlFor="currentProjects">Current Projects</Label>
                  <TextArea 
                    id="currentProjects" 
                    name="currentProjects" 
                    value={formData.currentProjects}
                    onChange={handleInputChange}
                    placeholder="Describe your current projects and activities..."
                  />
                </InputContainer>

                <InputContainer>
                  <Label htmlFor="volunteerNeeds">Volunteer Needs</Label>
                  <TextArea 
                    id="volunteerNeeds" 
                    name="volunteerNeeds" 
                    value={formData.volunteerNeeds}
                    onChange={handleInputChange}
                    placeholder="Describe what kind of volunteers you need and how they can help..."
                  />
                </InputContainer>

                <h2 tw="mt-12">Funding & Certifications</h2>
                <div tw="mb-6">
                  <p tw="text-sm mb-4">Select your primary funding sources:</p>
                  <div tw="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableFundingSources.map(source => (
                      <label key={source} tw="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFundingSources.includes(source)}
                          onChange={() => handleFundingSourceToggle(source)}
                          tw="mr-2"
                        />
                        <span tw="text-sm">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div tw="mb-6">
                  <p tw="text-sm mb-4">Select relevant certifications:</p>
                  <div tw="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableCertifications.map(cert => (
                      <label key={cert} tw="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCertifications.includes(cert)}
                          onChange={() => handleCertificationToggle(cert)}
                          tw="mr-2"
                        />
                        <span tw="text-sm">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div tw="mb-6">
                  <label tw="flex items-center">
                    <input
                      type="checkbox"
                      name="taxExempt"
                      checked={formData.taxExempt}
                      onChange={handleInputChange}
                      tw="mr-2"
                    />
                    <span>Tax Exempt Status</span>
                  </label>
                </div>

                <SubmitButton type="submit">
                  Submit Registration
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

export default NGORegistrationPage; 