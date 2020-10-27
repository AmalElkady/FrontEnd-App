import React, { useState } from "react";

export default function ChatIcon() {
  const [clicked, setClicked] = useState(false);

  const onclick = () => {
    setClicked(!clicked);
     setTimeout(() => {
       setClicked(false);
    }, 4000);
  };

  return (
    <>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "50%" }}
        onClick={onclick}
      >
        <path
          className={`${clicked ? "line-message-border" : "stroke1 fill1"}`}
          d="M84.5 13H15C10.5817 13 7 16.5817 7 21V59.5C7 63.9183 10.5817 67.5 15 67.5H18V85.0858C18 85.9767 19.0771 86.4229 19.7071 85.7929L37.7071 67.7929C37.8946 67.6054 38.149 67.5 38.4142 67.5H84.5C88.9183 67.5 92.5 63.9183 92.5 59.5V21C92.5 16.5817 88.9183 13 84.5 13Z"
          fill="rgba(255,255,255,1)"
          stroke="rgba(232,120,162,1)"
          stroke-width="2px"
          style={{ animationDuration: "3s" }}
         
        ></path>
        <path
          //stocke={clicked ? "rgba(255,255,255,1)" : "rgba(211,49,110,1)"}
          className={`${clicked ? "line-message3-line1" : ""}`}
          d="M21 53H49"
          stroke="rgba(211,49,110,1)"
          stroke-width="2px"
          style={{ animationDuration: "3s" }}
        
        ></path>
        <path
          className={`${clicked ? "line-message3-line2" : "stroke2"}`}
          d="M21 41H77"
          stroke="rgba(211,49,110,1)"
          stroke-width="2px"
          style={{ animationDuration: "3s" }}
         
        ></path>
        <path
          className={`stroke2 ${clicked ? "line-message3-line3" : ""}`}
          d="M21 29H77"
          stroke="rgba(211,49,110,1)"
          stroke-width="2px"
          style={{ animationDuration: "3s" }}
         
        ></path>
      </svg>
    </>
  );
}
