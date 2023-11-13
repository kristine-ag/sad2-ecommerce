import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Center from "../components/Center";
import styled from "styled-components";

const sharedTitleStyles = `
  font-size: 1.5em;
  color: #fff;
  text-align: left; 
  margin-right: 20px;
  font-weight: bold; 
  cursor: pointer;
`;

const Title = styled.h1`
  ${sharedTitleStyles}
`;

const TitleButton = styled.button`
  ${sharedTitleStyles}
  border: none;
  background-color: transparent;
`;

const P = styled.p`
  font-size: small;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  display: inline;
`;

const Output = styled.p`
  font-size: small;
  color: white;
  font-weight: light;
  text-transform: uppercase;
  display: inline;
`;

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 500px;
  margin: 40px 25px;
  color: #fff;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  gap: 20px;
`;

export default function AccountPage() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios
      .get("http://localhost:8082/logout")
      .then((res) => {
        if (res.data.loggedOut) {
          setUserData({
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
          });
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8082/account")
      .then((res) => {
        if (res.data.valid) {
          setUserData({
            firstName: res.data.customer_account_firstName || "",
            lastName: res.data.customer_account_lastName || "",
            email: res.data.customer_account_emailAddress || "",
            username: res.data.customer_account_username || "",
            password: res.data.customer_account_password || "",
          });
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <>
      <Center>
        <PageWrapper>
          <TitleButton> Personal Info </TitleButton>
          <TitleButton onClick={handleLogout}>Log Out</TitleButton>
        </PageWrapper>

        <PageWrapper>
          <Title> My Profile </Title>
        </PageWrapper>

        <PageWrapper>
          <ColumnsWrapper>
            <P> First Name:</P>
            <Output>{userData.firstName}</Output>
            <P> Last Name:</P>
            <Output>{userData.lastName}</Output>
            <P> Contact Number: </P>
            <P> Email: </P>
            <Output> {userData.email} </Output>
          </ColumnsWrapper>
          <ColumnsWrapper>
            <P> Username:</P> <Output> {userData.username} </Output>
            <P> Password:</P> <Output> ******* </Output>
          </ColumnsWrapper>
        </PageWrapper>
      </Center>
    </>
  );
}
