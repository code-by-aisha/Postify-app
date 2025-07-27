import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
   
    if (authStatus === null) return;

    if (authentication && !authStatus) {
      navigate("/login");
    }

    else if (!authentication && authStatus) {
      navigate("/");
    }

    // Let the content render
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

