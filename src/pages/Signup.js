import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/logo.svg";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const Subheading = tw.p`mt-2 text-sm text-gray-600 text-center`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const UserTypeSelector = tw.div`flex mb-6 bg-gray-100 rounded-lg p-1`;
const UserTypeButton = styled.button`
  ${tw`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none`}
  ${props => props.active ? tw`bg-white text-primary-600 shadow-sm` : tw`text-gray-600 hover:text-gray-900`}
`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const TextArea = tw.textarea`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0 resize-none`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Join Our Community",
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Continue with Google",
      url: "https://google.com"
    },
    {
      iconImageSrc: twitterIconImageSrc,
      text: "Continue with Twitter",
      url: "https://twitter.com"
    }
  ],
  submitButtonText = "Create Account",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "/terms-of-service",
  privacyPolicyUrl = "/privacy-policy",
  signInUrl = "/login"
}) => {
  const [userType, setUserType] = React.useState('volunteer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  const location = useLocation();

  useEffect(() => {
    // Always read the referral code from the URL on every render
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    setReferralCode(ref || '');
  }, [location.search]);

  const getSubheading = () => {
    switch(userType) {
      case 'volunteer':
        return "Join thousands of volunteers making a difference in communities worldwide.";
      case 'ngo':
        return "Register your NGO to connect with passionate volunteers and expand your impact.";
      case 'admin':
        return "Administrator access for platform management and oversight.";
      default:
        return "Join our community of changemakers.";
    }
  };

  const getSubmitButtonText = () => {
    switch(userType) {
      case 'volunteer':
        return "Join as Volunteer";
      case 'ngo':
        return "Register NGO";
      case 'admin':
        return "Create Admin Account";
      default:
        return "Create Account";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, userType, referralCode: referralCode || undefined })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Signup failed');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      window.location.href = '/login';
    } catch (err) {
      setError('Server error');
      setLoading(false);
    }
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <Subheading>{getSubheading()}</Subheading>
              {/* Debug: Show referral code if present */}
              {referralCode && (
                <div style={{ color: 'green', marginBottom: 8 }}>
                  Using Referral Code: <b>{referralCode}</b>
                </div>
              )}
              <FormContainer>
                <UserTypeSelector>
                  <UserTypeButton 
                    active={userType === 'volunteer'} 
                    onClick={() => setUserType('volunteer')}
                  >
                    Volunteer
                  </UserTypeButton>
                  <UserTypeButton 
                    active={userType === 'ngo'} 
                    onClick={() => setUserType('ngo')}
                  >
                    NGO
                  </UserTypeButton>
                  <UserTypeButton 
                    active={userType === 'admin'} 
                    onClick={() => setUserType('admin')}
                  >
                    Admin
                  </UserTypeButton>
                </UserTypeSelector>

                <SocialButtonsContainer>
                  {socialButtons.map((socialButton, index) => (
                    <SocialButton key={index} href={socialButton.url}>
                      <span className="iconContainer">
                        <img src={socialButton.iconImageSrc} className="icon" alt="" />
                      </span>
                      <span className="text">{socialButton.text}</span>
                    </SocialButton>
                  ))}
                </SocialButtonsContainer>
                <DividerTextContainer>
                  <DividerText>Or sign up with your email</DividerText>
                </DividerTextContainer>
                <Form onSubmit={handleSubmit}>
                  <Input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                  <Input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                  <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                  <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                  
                  {userType === 'ngo' && (
                    <>
                      <Input type="text" placeholder="Organization Name" />
                      <Input type="text" placeholder="Organization Website" />
                      <TextArea rows="3" placeholder="Brief description of your organization and mission" />
                    </>
                  )}
                  
                  {userType === 'volunteer' && (
                    <>
                      <Input type="text" placeholder="Phone Number" />
                      <Input type="text" placeholder="City/Location" />
                      <TextArea rows="2" placeholder="What causes are you passionate about? (optional)" />
                    </>
                  )}

                  <SubmitButton type="submit" disabled={loading}>
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{loading ? 'Creating Account...' : getSubmitButtonText()}</span>
                  </SubmitButton>
                  {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                  {success && <div style={{ color: 'green', marginTop: 8 }}>Signup successful! Redirecting to login...</div>}
                  
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    By creating an account, you agree to our{" "}
                    <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                      Sign In
                    </a>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};
