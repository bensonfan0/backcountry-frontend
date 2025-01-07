"use client";

import Grid from '@mui/material/Grid2';
import ContainerCard from '@/components/container/containerCard';
import ToolWindow from '@/components/tool/toolWindow';
import styled from 'styled-components';

const ToolContainer = styled.div`
    width: 25%;
    margin-top: auto;
    /* flex: 1; */
    flex-grow: 0;
`

const PackContainer = styled.div`
    width: 75%;
    /* flex: 4; */
`

const Page = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100%;
    /* padding: 40px 0 0 0; */
`

function Inventory() {
    return (
        <Page>
            <ToolContainer>
                <ToolWindow />
            </ToolContainer>
            <PackContainer>
                <ContainerCard id={1} title={"Backpack"} content={"weight"} />
            </PackContainer>
        </Page>
    )
}

export default Inventory