import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        font-family: poppins, sans-serif;
    }

    body {
        width: 100vw;
        height: 100vh;
        diplay: flex;
        justify-content: center;
        background-color: #f2f2f2;
    }

    #root {
        display: flex;
        justify-content: center;
    }
`;

export default Global;