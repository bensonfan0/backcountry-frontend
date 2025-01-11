"use client";

import ContainerWindow from '@/components/container/containerWindow';
import ToolWindow from '@/components/tool/toolWindow';
import styled from 'styled-components';

const ToolContainer = styled.div`
    width: 25%;
    margin-top: auto;
    flex-grow: 0;
`

const PackContainer = styled.div`
    width: 75%;
`

const Page = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh - 40px);
`

function Inventory() {
    return (
        <Page>
            <ToolContainer>
                <ToolWindow />
            </ToolContainer>
            <PackContainer>
                <ContainerWindow />
            </PackContainer>
        </Page>
    )
}

export default Inventory