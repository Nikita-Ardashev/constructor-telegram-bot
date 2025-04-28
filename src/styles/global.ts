'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        padding: 0;
	    margin: 0;
	    outline: none;
	    border: none;
    }
    html{
        scroll-behavior: smooth;
        height: 100vh;
    }
    body{
        display: flex;
        flex-direction: column;
    }
`;
