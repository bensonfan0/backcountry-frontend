"use client";

import Grid from '@mui/material/Grid2';
import ContainerCard from '@/components/container/containerCard';
import ToolWindow from '@/components/tool/toolWindow';
import styled from 'styled-components';

const ToolContainer = styled.div`
    width: 100%;
    margin-top: auto;
`

const Page = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding: 40px 0 0 0;
`

function Inventory() {
    return (
        <Page>
            <ContainerCard id={1} title={"Backpack"} content={"weight"} />
            <ToolContainer>
                <ToolWindow />
            </ToolContainer>
        </Page>
    )
}

export default Inventory