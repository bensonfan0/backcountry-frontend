import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    height: 40px;
`;


const ListItem = styled.div`
    padding: 10px 10px 0 10px; 
    cursor: pointer;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <ListItem><Link href="/" className="hover:bg-blue-500 transition duration-300 ease-in-out" style={{ color: 'black' }}>Hikes</Link></ListItem>
            <ListItem><Link href="/inventory" className="hover:bg-blue-500 transition duration-300 ease-in-out" style={{ color: 'black' }}>Inventory</Link></ListItem>
            <ListItem><Link href="/" className="hover:bg-blue-500 transition duration-300 ease-in-out" style={{ color: 'black' }}>Settings</Link></ListItem>
            <ListItem><Link href="/" className="hover:bg-blue-500 transition duration-300 ease-in-out" style={{ color: 'black' }}>Export</Link></ListItem>
        </HeaderContainer>
    );
};

export default Header;
