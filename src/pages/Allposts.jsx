import React, { useState, useEffect } from "react";
import { Container, Postcard } from "../components";
import appwriteService from "../Appwrite/config";
import { Row, Col } from "react-bootstrap";

function Allposts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) {
         console.log("📦 Posts received:", res.documents);
        setPosts(res.documents);
      }
    });
  }, []);

  return (
    <div className="py-5">
      <Container>
        <Row className="g-4 justify-content-center">
          {posts.map((post) => (
            <Col key={post.$id} xs={12} sm={6} md={4} lg={3}>
              <Postcard post={post} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Allposts;

