import React from "react";
import { useState, useEffect } from "react";
import { getUserName, getUserRole } from "../../utils/auth";

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        color: "#fff",
        borderRadius: "1.2rem",
        boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
        maxWidth: "30rem",
        padding: "1.5rem",
      }}
    >
      <div style={{ marginRight: "3rem" }}>
        <img
          src="/profile.svg"
          alt="Profile"
          style={{
            height: "7rem",
          }}
        />
      </div>
      <div>
        <div
          style={{
            fontSize: "1.5rem",
          }}
        >
          {getUserName()}
        </div>
        <div>{getUserRole()}</div>
        <div
          style={{
            fontFamily: "monospace",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              fontSize: "1.4rem",
              color: "#00e676",

              textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
            }}
          >
            {formatTime(currentTime)}
          </div>
          <div
            style={{
              fontSize: "1.0rem",
              color: "#ffd700",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
            }}
          >
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
