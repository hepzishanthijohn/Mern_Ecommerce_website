import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import chooseUserImage from '../assets/Admin_Assets/chooseUser.png'; // Import the image

const Navbar = () => {
  return (
    <StyledNavbar>
      <Logo src={chooseUserImage} alt="Logo" />
      <NavLinks>
        <NavLink href="#admin">Admin</NavLink>
        <NavLink href="#student">Student</NavLink>
        <NavLink href="#mentor">Mentor</NavLink>
      </NavLinks>
    </StyledNavbar>
  );
};

const ChooseUser = ({ visitor }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const navigateHandler = (user, email) => {
    if (visitor === 'guest') {
      const fields = { email, password: '' };
      setLoader(true);
      // Simulating an API call or authentication process
      setTimeout(() => {
        setLoader(false);
        // Redirect based on user type
        switch (user) {
          case 'Admin':
            return navigate('/loginform');
          case 'Student':
            return navigate('/studentLogin');
          case 'Mentor':
            return navigate('/mentorLogin');
          default:
            return;
        }
      }, 1500); // Simulated loading time
    } else {
      // Redirect based on user type
      switch (user) {
        case 'Admin':
          navigate('/loginform');
          break;
        case 'Student':
          navigate('/studentLogin');
          break;
        case 'Mentor':
          navigate('/mentorLogin');
          break;
        default:
          return;
      }
    }
  };

  return (
    <>
      <Navbar />
      <StyledContainer>
        <ImageBackground >
          <div>
            <img src={chooseUserImage} alt='choose user'  style={{width:"95%"}} />
          </div>
        </ImageBackground>
        <ContentContainer>
          <IntroContainer>
            <h1 className='mb-5'>Welcome to User Selection Page</h1>
            <p>
              The ChooseUser component provides a streamlined way for users to select their role within the application. Whether you're an administrator, student, or mentor, this page offers a clear pathway to access the functionalities tailored to your role.
            </p>
            <p>
              Each user category—Admin, Student, and Mentor—is presented below. Click on the respective card to initiate the login process specific to your role.
            </p>
          </IntroContainer>
          <CardContainer>
            <StyledCard onClick={() => navigateHandler('Admin')}>
              <div className="card-body mb-5">
                <StyledTitle>Admin</StyledTitle>
                <hr />
                <p>Login as an administrator to access the dashboard to manage app data.</p>
              </div>
            </StyledCard>

            <StyledCard onClick={() => navigateHandler('Student')}>
              <div className="card-body mb-5">
                <StyledTitle>Student</StyledTitle>
                <hr />
                <p>Login as a student to explore course materials and assignments.</p>
              </div>
            </StyledCard>

            <StyledCard onClick={() => navigateHandler('Mentor')}>
              <div className="card-body mb-5">
                <StyledTitle>Mentor</StyledTitle>
                <hr />
                <p>Login as a Mentor to create courses, assignments, and track student progress.</p>
              </div>
            </StyledCard>
          </CardContainer>
        </ContentContainer>
        {/* Loader */}
        {loader && <LoaderOverlay>Please Wait...</LoaderOverlay>}
      </StyledContainer>
    </>
  );
};

export default ChooseUser;

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3f05b3;
  color: #fff;
  padding: 1rem;
`;

const Logo = styled.img`
  width: 50px;
  height: auto;
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-right: 1rem;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem;
`;

const ImageBackground = styled.div`
  width: 50%;
  height: 78vh; /* Set height to full viewport height */
  margin-top: 5rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding-left: 1rem;
`;

const IntroContainer = styled.div`
  max-width: 1000px;
  text-align: center;
  margin-top: 1rem;
  color: #3f05b3;
  line-height: 1.8;
  line-space: 17px;
  margin-bottom: 5rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 2rem;
`;

const StyledCard = styled.div`
  cursor: pointer;
  width: 33%;
  background-color: #3f05b3;
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;