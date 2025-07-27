 import React, { useId, forwardRef } from "react";

const Select = forwardRef(function Select(
  { options = [], label, className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-100 mb-3">
      {label && (
        <label htmlFor={id} className="form-label fw-semibold mb-2">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`form-select ${className}`}
        style={{
          border: "2px solid transparent",
          borderRadius: "10px",
          background:
            "linear-gradient(white, white) padding-box, linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%) border-box",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          padding: "10px 14px",
          color: "#333",
          fontWeight: "500",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = "0 0 0 3px rgba(253, 187, 45, 0.3)";
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.05)";
        }}
        {...props}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
