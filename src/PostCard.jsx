import React from "react";
import appwriteService from "./Appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage }) {
  const src = featuredimage ? appwriteService.getFileView(featuredimage) : "";

  return (
    <Link to={`/posts/${$id}`} className="text-decoration-none ">
      <div
        className="rounded-4 overflow-hidden shadow-sm border-0"
        style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
        }}
      >
        <div className="w-100">
          <img
            src={src}
            alt={title}
            className="w-100 rounded-top-4"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </div>
        <div className="p-3 bg-white">
          <h5 className="fw-bold text-dark mb-0">{title}</h5>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;











