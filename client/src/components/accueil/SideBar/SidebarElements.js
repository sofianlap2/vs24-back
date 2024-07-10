import styled from "styled-components";
import {FaTimes} from  'react-icons/fa';
import {Link as LinkS} from  'react-scroll';
import {Link as LinkR} from 'react-router-dom';



export const SidebarContainer = styled.aside`
position: fixed;
z-index: 999;
width: 100%;
height: 100% ;
background : #0d0d0d;
display: grid;
aligne-items: center;
top: 0;
left: 0;
transition: 0.3s ease-in-out;
opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`;
export  const NavItem = styled.li `
  height: 70px;
  direction: rtl;

`;
export const CloseIcon = styled(FaTimes)`
color: #fff;
&:hover{
    transition: all   0.2s ease-in-out;
    color: #8fd1e3;
`;
export const Icon = styled.div`
 position: absolute;
 top: 1.2rem;
 right: 1.5rem;
 background: transparent;
 cursor: pointer;
 font-size: 2rem;
outline: none;
`;
export  const SidebarWrapper = styled.div`
color:  #fff;
`;
export const SidebarMenu = styled.ul`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: repeat(6, 80px);
direction: rtl;

@media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
 }
`;
export const SidebarLink = styled(LinkS)`
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
text-decoration: none;
life-style:none;
transition: 0.2s ease-in-out ;
color:  #fff;
text-decoration: none;
cursor:pointer;
&:hover {
    color:#8fd1e3;
    transition: 0.2s ease-in-out;
    }

`;
export const SideBtnWrap = styled.div`
    display:flex;
    justify-content:center;

`;
export const SidebarRoute = styled(LinkR)`
    border-radius: 50px;
    background: #8fd1e3;
    white-space: nowrap;
        padding: 16px 64px;
        font-size: 16px;
        text-decoration: none;
        color: #000;
        transition: all  0.2s ease-in-out;
        cursor: pointer;
        outline: none;
        &:hover{
            transition: all   0.2s ease-in-out;
            background: #fff;
`;
export const SidebarLi = styled.li`
    white-space: nowrap;
        padding: 16px 64px;
        font-size: 16px;
        text-decoration: none;
        color: #000;
        transition: all  0.2s ease-in-out;
        cursor: pointer;
        outline: none;
        &:hover{
            transition: all   0.2s ease-in-out;
            background: #fff;
`;
