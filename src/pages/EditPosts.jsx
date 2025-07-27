import React,{useState , useEffect} from "react";
import {Container , PostForm} from "../components";
import appwriteService from "../Appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPosts() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getDocument(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-5">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPosts;
