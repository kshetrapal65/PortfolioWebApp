import React from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CircularProgress = () => {
  const percentage = 70;

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textSize: "14px",
          pathColor: "#5B84FF",
          trailColor: "#1E2A45",
          textColor: "#5B84FF",
        })}
      />
    </div>
  );
};

export default CircularProgress;
