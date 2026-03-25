import React from "react";
export default function Status({tracks, currentIndex, isPlaying}) {
    // Only show something if a track is selected
    if (currentIndex === null) return null;

    const track = tracks[currentIndex];
    const title = track.title ? track.title : track.episodeTitle;

    return (
        <h2>
            {isPlaying ? `Playing: ${title}` : "Paused"}
        </h2>
    )
}