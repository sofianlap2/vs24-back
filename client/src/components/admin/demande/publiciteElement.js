import styled from "styled-components";
import {FaTimes} from  'react-icons/fa';
import {Link}  from "react-router-dom";


export const CloseIcon = styled(FaTimes)`
color: #000;
&:hover{
    transition: all   0.2s ease-in-out;
    color: #000;
`;
export const Icon = styled(Link)`
  text-decoration: none;
  font-size: 25px;
  font-weight: 700;
  
  
    margin-left: 16px;
    margin-top: 8px;
  
`;