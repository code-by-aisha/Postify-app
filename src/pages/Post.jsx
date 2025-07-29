 import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getDocument(slug).then((fetchedPost) => {
        if (fetchedPost) setPost(fetchedPost);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (!post) return;
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <div className="card border-0 shadow-lg mb-5 rounded-4 overflow-hidden d-flex ">
          <div className="position-relative "  style={{ paddingBottom: "2rem" }}>
            <img
              src={appwriteService.getFileView(post.featuredimage)}
              alt={post.title}
              className="w-100"
              style={{ height: "450px", objectFit: "cover", zIndex:"10", overflow:"visible" }}
            />

            {isAuthor && (
              <div className="position-absolute top-0 end-0 m-3 d-flex"
                style={{zIndex:"10"}}
              >
              
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="btn btn-success me-2">Edit</Button>
                </Link>
                <Button className="btn btn-danger" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="card border-0 shadow-sm p-4 mb-5 bg-white rounded-4">
          <h1 className="display-5 fw-bold mb-4 text-dark">{post.title}</h1>
          <div className="text-secondary lh-lg fs-5 post-content">
            {post.content ? parse(post.content) : <p>No content available.</p>}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
