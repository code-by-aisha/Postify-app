import React, { useState, useEffect } from "react";
import appwriteService from "../Appwrite/config";
import { Container, PostCard } from "../components";
import { Row, Col, Card, Button } from "react-bootstrap";


function Home() {

  const showcaseCards = [
  {
    title: "Lava Cake Recipe",
    text: "This warm, gooey chocolate lava cake is the perfect dessert for a cozy evening. Learn how to make it with just a few ingredients!",
    author: "Sadaf",
    imgUrl: "https://i.pinimg.com/736x/f6/a3/0f/f6a30f69e05b9f41bc33e1a61334df2d.jpg",
    link: "/posts/lava-cake"
  },
  {
    title: "Graduation Day Recap",
    text: "A quick reflection on a memorable day — full of emotions, dreams, and unforgettable memories. The journey just begins!",
    author: "jasmin",
    imgUrl: "https://i.pinimg.com/736x/85/32/24/853224fab799895f21f2b0b98d82af73.jpg",
    link: "/posts/graduation-day"
  },
  {
    title: "Horse Riding on the Weekend",
    text: "Spent the weekend riding through open fields — the wind, the freedom, the joy. A peaceful break from screens and stress.",
    author: "Aishaa",
    imgUrl: "https://i.pinimg.com/736x/04/ca/36/04ca36e2bfd6694f974f61582d1ab0aa.jpg",
    link: "/posts/horse-riding"
  }
];

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((response) => {
        if (response && Array.isArray(response.documents)) {
          setPosts(response.documents);
        } else {
          setPosts([]);
        }
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 bg-dark text-white d-flex align-items-center justify-content-center">
        <h3 className="text-light">Loading posts…</h3>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-dark text-white py-5 ">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-light">Welcome to Postify</h1>
          <p className="lead text-secondary">
            Share your thoughts and explore inspiring posts from others.
          </p>
        </div>

        {/* Dynamic Posts */}
        {posts.length === 0 ? (
          <div className="text-center">
            <p className="text-muted fs-5">
              No posts yet. Be the first to create one!
            </p>
          </div>
        ) : (
          <Row className="g-5 mb-4">
            {posts.map((post) => (
              <Col key={post.$id} xs={12} sm={6} md={4} lg={3}>
                <PostCard {...post} />
              </Col>
            ))}
          </Row>
        )}

        {/* Static Custom Cards with Author & Read More */}
        <Row className="g-4">
  {showcaseCards.map((card, idx) => (
    <Col key={idx} xs={12} sm={6} md={4}>
      <Card className="bg-light text-dark h-100 shadow-sm border-0">
        <Card.Img
          variant="top"
          src={card.imgUrl}
          alt={card.title}
          style={{ objectFit: "cover", height: "200px" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fw-semibold">{card.title}</Card.Title>
          <Card.Text style={{ fontSize: "0.9rem", flexGrow: 1 }}>
            {card.text}
          </Card.Text>
          <small className="text-muted mb-2">By {card.author}</small>
          <Button
            as="a"
            href={card.link}
            variant="outline-primary"
            size="sm"
          >
            Read More
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

      </Container>
    </div>
  );
}

export default Home;


