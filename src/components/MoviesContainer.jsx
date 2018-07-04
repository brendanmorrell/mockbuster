import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import Movie from './Movie.jsx';

class MoviesContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let movieComponents = this.props.movies.map(x => (
      <Movie
        title={x.title}
        length={x.length || '2hrs'}
        watched={x.watched || false}
        onWatchList={x.onWatchList || false}
        genre={x.genre || 'comedy'}
        rating={x.rating || 5}
        url={x.url || 'www.fakeimage.com'}
        key={x.title}
      />
    ));
    return (
      <div className="movies-container">
        <FlipMove duration={350} easing="ease-in-out">
          {movieComponents}
        </FlipMove>
      </div>
    );
  }
}

const mapStateToProps = ({ movies }) => ({ movies });

export default connect(mapStateToProps)(MoviesContainer);
