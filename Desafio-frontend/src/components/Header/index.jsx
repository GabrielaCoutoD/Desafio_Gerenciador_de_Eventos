import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgb(14, 59, 90);
  color: white;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-left: 20px;
  border: none;
  border-radius: 5px;
  background-color: rgb(153, 159, 159);
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Logo>Meu Projeto</Logo>
      <Nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/cadastro">Cadastro</NavLink>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
