import React from "react";
import logoImg from "../container/LogoP.png";

function Logo({ size = "100px" }) {
  return (
    <img
      src={logoImg}
      alt="Postify Logo"
      style={{
        width: size,
        height: size,
        borderRadius: "40%",
        objectFit: "cover",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 0 10px 5px rgba(255, 215, 0, 0.6)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "scale(1)";
      }}
    />
  );
}

export default Logo;




