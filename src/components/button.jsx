 import React from "react";

function Button({
  children,
  type = "button",
  className = "",
  onClick = () => {},
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
      style={{
        padding: "10px 20px",
        fontWeight: "600",
        color: "white",
        background: "linear-gradient(135deg, #FDBB2D 0%, #3A1C71 100%)",
        border: "none",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(1px)";
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(-2px)";
      }}
    >
      {children}
    </button>
  );
}

export default Button;
