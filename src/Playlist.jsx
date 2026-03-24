import React, {useState, useEffect} from "react";
import Song from "./Song";
import Podcast from "./Podcast";
import Status from "./Status.jsx";
import "./styles.css";

export default function Playlist() {
    // State for the list of tracks fetched from JSON Server
  const [tracks, setTracks] = useState([]);
  // State for the index of the currently selected track
  const [currentIndex, setCurrentIndex] = useState(null);
  // State for play/pause status
  const [isPlaying, setIsPlaying] = useState(false);

  // Fetch playlist from JSON Server when component is being displayed
  useEffect(() => {
    fetch("http://localhost:3001/audio")
      .then(res => res.json())       // Convert response to JSON
      .then(data => setTracks(data)); // Store the tracks in state
  }, []); // Empty dependency array runs only once on load

  // Go to the next track
  const handleNext = () => {
    if(tracks.length === 0) return;

    let nextIndex;
    if(currentIndex === null) {
      // If nothing is playing yet, start with the first track
      nextIndex = 0;
    } else if(currentIndex === tracks.length - 1) {
      // If we are at the last track, loop to the first
      nextIndex = 0;
    } else {
      // Otherwise, move to the next track
      nextIndex = currentIndex + 1;
    }

    setCurrentIndex(nextIndex);
    setIsPlaying(true); // Automatically play
  };

  // Go to the previous track
  const handlePrev = () => {
    if(tracks.length === 0) return;

    let prevIndex;
    if(currentIndex === null) {
      // If nothing is playing yet, start with the last track
      prevIndex = tracks.length - 1;
    } else if(currentIndex === 0) {
      // If we are at the first track, loop to the last
      prevIndex = tracks.length - 1;
    } else {
      // Otherwise, move to the previous track
      prevIndex = currentIndex - 1;
    }

    setCurrentIndex(prevIndex);
    setIsPlaying(true); // Automatically play
  };

  // Toggle play/pause
  const handlePlayPause = () => {
    if(currentIndex === null) return; // Nothing to play/pause
    setIsPlaying(!isPlaying); // Flip the boolean
  };

  // Shuffle tracks
  const handleShuffle = () => {
    const shuffled = [...tracks].sort(() => Math.random() - 0.5);
    setTracks(shuffled);
  };

  // Double-click a track to play it
  const handleTrackDoubleClick = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="playlist">
      <h1>Favorites</h1>

      <div className="buttons">
        <button onClick={handleShuffle}>Shuffle</button>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={handleNext}>Next</button>
      </div>

      <Status 
        tracks={tracks} 
        currentIndex={currentIndex} 
        isPlaying={isPlaying} 
      />

      <div className="tracks">
        {tracks.map((track, index) => {
          // Determine type based on presence of 'artist'
          const TrackComponent = track.artist ? Song : Podcast;

          return (
            <div 
              key={index} 
              onDoubleClick={() => handleTrackDoubleClick(index)}
            >
              <TrackComponent {...track} />
            </div>
          );
        })}
      </div>
    </div>
  );
}