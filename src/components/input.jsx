import React, { forwardRef } from "react";
const Input = forwardRef(({
  label,
  type = "text",
  className = "",
  placeholder = "",
  error,
  ...props
}, ref) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1 text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded-lg
          bg-white bg-opacity-20 backdrop-blur-md
          border border-white border-opacity-30
          text-dark placeholder-white placeholder-opacity-60
          focus:outline-none focus:ring-2 focus:ring-[#FDBB2D] focus:border-transparent
          ${className}`}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
    </div>
  );
});


export default Input;
