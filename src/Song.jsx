import React from "react";
export default function Song({title, artist, year}) {
    return (
        //creating a container for song and adding inline style to it (inline CSS)
        <div className= "song" style={{
            textAlign: "center",
            border: "5px solid",
            borderColor:"#ff48c4",
            padding: "10px",
            margin: "10px",
            borderRadius: "8px",
            backgroundColor: "#fdf6f6"
        }}>
            <h3>{title}</h3>
            <p>{artist}</p>
            <p>{year}</p>
        </div>            
    );
}