 import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../Appwrite/config";

function Postcard({ post }) {
  const { title, featuredimage } = post;

  return (
    <div
      className="card h-100 w-100 border-0 shadow-lg rounded-4 overflow-hidden d-flex flex-column"
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
      }}
    >
      {/* Image Area */}
      <div
        className="d-flex align-items-end"
        style={{
          height: "180px",
          backgroundImage: post.featuredimage
            ? `url(${appwriteService.getFileView(post.featuredimage)})`
            : "linear-gradient(135deg, #632dc996, #7b4bc9ff)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background: "rgba(0, 0, 0, 0.4)",
          }}
        ></div>

        {/* Title */}
        <div className="w-100 p-2 position-relative" style={{ zIndex: 2 }}>
          <h5 className="card-title mb-0 text-truncate text-white">{title}</h5>
        </div>
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column">
        <p className="card-text text-muted mb-3">
          Dive into the post to explore more content...
        </p>
        <Link
          to={`/posts/${post.slug}`}
          className="btn btn-outline-primary mt-auto rounded-pill"
          style={{ transition: "all 0.3s ease" }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#6610f2";
            e.target.style.color = "#fff";
            e.target.style.borderColor = "#6610f2";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#6610f2";
            e.target.style.borderColor = "#6610f2";
          }}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default Postcard;
