import React from "react";
export default function Podcast(props) {
    //structured props
    let season= props.season;
    let episode= props.episode;
    let title= props.title;
    let creator= props.creator;

    //declaring variable containing season and episode and stating the condition (this is the js part)
    let finalTitle;

            if (season === undefined) {
                finalTitle = "Episode: " + episode;                
            }
            else {
                finalTitle = "Season: " + season + " Episode: " + episode;
            }

    return (
        //container for podcast (inline CSS)
        <div className= "podcast" style={{
            textAlign: "center",
            border: "5px solid",
            borderColor:"#2bd1fc",
            padding: "10px",
            margin: "10px",
            borderRadius: "8px",
            backgroundColor: "#f1faff",
        }}>
            <h3>{title}</h3>
            <p>{creator}</p>
            <p>{finalTitle}</p>
        </div>
    );
}