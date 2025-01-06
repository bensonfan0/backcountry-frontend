import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const SidebarContainer = styled.div`
    background-color: white;
    height: 100%;
    padding: 0 40px 0 40px;
`;

const List = styled.ul`
    list-style-type: none;
`;

const ListItem = styled.li`
    padding: 10px 0 10px 0;
    margin: 15px 0;
    cursor: pointer;
`;

const Sidebar: React.FC = () => {
    return (
        <SidebarContainer>
            <List>
                <ListItem><Link href="/" className="hover:bg-blue-500 transition duration-300 ease-in-out" style={{color: 'black'}}>Hikes</Link></ListItem>
                <ListItem><Link href="/inventory" className="hover:bg-blue-500 transition duration-300 ease-in-out" style={{color: 'black'}}>Inventory</Link></ListItem>
                <ListItem><Link href="/" className="hover:bg-blue-500 transition duration-300 ease-in-out" style={{color: 'black'}}>Settings</Link></ListItem>
                <ListItem><Link href="/" className="hover:bg-blue-500 transition duration-300 ease-in-out" style={{color: 'black'}}>Export</Link></ListItem>
            </List>
        </SidebarContainer>
    );
};

export default Sidebar;
