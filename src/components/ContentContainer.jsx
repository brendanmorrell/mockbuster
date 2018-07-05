import React from 'react';

import MoviesContainer from './MoviesContainer.jsx';
import FiltersContainer from './FiltersContainer.jsx';

export default () => {
  return (
    <div>
      <FiltersContainer />
      <MoviesContainer />
    </div>
  );
};
