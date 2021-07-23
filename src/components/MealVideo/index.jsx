import React from 'react';
import PropTypes from 'prop-types';

function MealVideo({ youTubeVideo, title }) {

  if (youTubeVideo === '') {
    return (
      <h4>Sorry, there is no video available for this recipe =/</h4>
    );
  }

  return (
    <iframe
      title={ title }
      data-testid="video"
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      src={ `http://www.youtube.com/embed/${youTubeVideo}`}
    />
  );
}

export default MealVideo;
MealVideo.propTypes = {
	youTubeVideo: PropTypes.string,
	title: PropTypes.string,
}.isRequired;

// API YouTube: https://developers.google.com/youtube/player_parameters?hl=pt-br
