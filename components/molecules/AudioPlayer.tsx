import React from 'react';

const AudioPlayer = ({ src }) => {
  return (
    <audio id="audio-player" controls className="mx-auto outline-none">
      <source id="audio-mp4" src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;