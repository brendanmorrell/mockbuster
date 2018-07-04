import React from 'react';
import axios from 'axios';

import MoviesContainer from './MoviesContainer.jsx';
import FiltersContainer from './FiltersContainer.jsx';

// axios.get('http://localhost:3000/getdata').then(res => {
//   console.log('axios get request processed');
//   console.log(res);
// });

export default () => {
  return (
    <div>
      <FiltersContainer />
      <MoviesContainer />
    </div>
  );
};
