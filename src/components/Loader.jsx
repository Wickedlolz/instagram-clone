import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader = () => {
    return (
        <LoaderContainer>
            <LoaderSpinner />
        </LoaderContainer>
    );
};

export default Loader;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    backdrop-filter: blur(10px);
`;

const spinnerAnimation = keyframes`
   to { transform: rotate(360deg); }
 `;

const LoaderSpinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #888888;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: ${spinnerAnimation} 0.8s linear infinite;
`;
