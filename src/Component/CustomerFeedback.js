import React from "react";
import { Card, ListGroup, Row, Col, Container } from "react-bootstrap";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const feedbackData = [
  {
    id: 1,
    name: "Denver Lewis",
    image:
      "https://www.thesun.co.uk/wp-content/uploads/2020/06/NINTCHDBPICT000592609288.jpg", // Replace with actual image URL
    rating: 4,
    feedback:
      "The food was excellent and so was the service. I had the mushroom risotto with scallops which was awesome. I had a burger over greens (gluten-free) which was also very good. They were very conscientious about gluten allergies.",
  },
  {
    id: 2,
    name: "Professor Lewis",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSMhW8eO0LhK4Yb_iu9_-9w7P_P6PRiQDsw&s", // Replace with actual image URL
    rating: 5,
    feedback:
      "We enjoyed the Eggs Benedict served on homemade focaccia bread and hot coffee. Perfect service.",
  },
  {
    id: 3,
    name: "Raquel Murillo",
    image:
      "https://i.gadgets360cdn.com/large/money_heist_season_5_1632565710914.jpg", // Replace with actual image URL
    rating: 4,
    feedback:
      "Normally wings are wings, but theirs are lean, meaty, and tender, and very flavorful.",
  },
  {
    id: 2,
    name: "Dianne Russell",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2aFs7CYfXraf6h-wrlxJ0iCTqsbQdonyUA&s", // Replace with actual image URL
    rating: 5,
    feedback:
      "We enjoyed the Eggs Benedict served on homemade focaccia bread and hot coffee. Perfect service.",
  },
  {
    id: 2,
    name: "Dianne Russell",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSMhW8eO0LhK4Yb_iu9_-9w7P_P6PRiQDsw&s", // Replace with actual image URL
    rating: 5,
    feedback:
      "We enjoyed the Eggs Benedict served on homemade focaccia bread and hot coffee. Perfect service.",
  },
];

const CustomerFeedback = () => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} color="#FFD700" />);
      } else {
        stars.push(<FaStarHalfAlt key={i} color="#DDD" />);
      }
    }
    return stars;
  };

  return (
    <Container>
      <Card
        style={{
          backgroundColor: "#1E1E2D",
          color: "white",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Card.Header
          className="text-white text-start fw-bold"
          style={{ fontSize: "20px" }}
        >
          Customer’s Feedback
        </Card.Header>
        <Card.Body style={{ overflowY: "auto", maxHeight: "440px" }}>
          <ListGroup variant="flush">
            {feedbackData.map((item) => (
              <ListGroup.Item
                key={item.id}
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  marginBottom: "10px",
                }}
              >
                <Row>
                  <Col xs={12} className="d-flex align-items-center ">
                    <img
                      src={item.image}
                      alt="profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                    <div>
                      <strong className="ms-2">{item.name}</strong>
                    </div>
                  </Col>

                  <Col className="text-start" xs={12}>
                    <div style={{ color: "#FFD700", margin: "5px 0" }}>
                      {renderStars(item.rating)}
                    </div>
                    <p style={{ fontSize: "14px" }}>{item.feedback}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CustomerFeedback;
