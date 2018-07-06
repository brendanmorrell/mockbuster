import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import MovieResult from './MovieResult.jsx';

class MoviesContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let movieComponents = this.props.movies.map(x => {
      return (
        <MovieResult
          title={x.title}
          length={x.length || '2hrs'}
          watched={x.watched || false}
          onWatchList={x.onWatchList || false}
          genre={x.genre || 'comedy'}
          rating={x.rating || 5}
          url={x.url || 'nothing'}
          key={x.title}
          favorites={this.props.movies}
          movie={{ title: x.title }}
          style={{
            background: `url(hjdsahjadsjhk)`,
          }}
        />
      );
    });
    return (
      <FlipMove duration={350} easing="ease-in-out">
        <h3>Movie Collection</h3>
        <div className="movies-container">{movieComponents}</div>
      </FlipMove>
    );
  }
}

// <div>
//   <h3>search bar</h3>
//   <input type="text" value={this.state.value} onChange={this.handleChange} />
//   <div className="movies-container">{posters.length ? posters : ''}</div>
// </div>;

const mapStateToProps = ({ movies }) => ({ movies });

export default connect(mapStateToProps)(MoviesContainer);
