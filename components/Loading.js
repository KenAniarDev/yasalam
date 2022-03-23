import { useState } from 'react';
import { css } from '@emotion/react';
import GridLoader from 'react-spinners/GridLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  return (
    <div className='sweet-loading h-screen flex items-center'>
      <GridLoader size={40} margin={10} css={override} color={'#D25235'} />
    </div>
  );
}

export default App;
