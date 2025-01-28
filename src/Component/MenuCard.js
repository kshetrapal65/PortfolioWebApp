import React from "react";
import { Card, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import {
  FaBullseye,
  FaHamburger,
  FaUtensils,
  FaChevronRight,
  FaPizzaSlice,
  FaMugHot,
  FaIceCream,
} from "react-icons/fa";

const MenuCard = () => {
  const cardItems = [
    {
      id: 1,
      title: "Goals",
      icon: <FaBullseye size={20} />,
      bgColor: "#E84E33",
    },
    {
      id: 2,
      title: "Popular Dishes",
      icon: <FaHamburger size={20} />,
      bgColor: "#3E54D3",
    },

    {
      id: 4,
      title: "Menus",
      icon: <FaUtensils size={20} />,
      bgColor: "#E7E912",
    },
    {
      id: 4,
      title: "Top Coffees",
      icon: <FaMugHot size={20} />,
      bgColor: "#2496A8",
    },
    {
      id: 4,
      title: "Ice Creams",
      icon: <FaIceCream size={20} />,
      bgColor: "#DB2BD5",
    },
    {
      id: 3,
      title: "Popular Pizza",
      icon: <FaPizzaSlice size={20} />,
      bgColor: "#31C22D",
    },
  ];

  return (
    <Card
      style={{
        backgroundColor: "#1E1E2D",
        borderRadius: "12px",
        color: "white",
        height: "100%",
      }}
    >
      <ListGroup variant="flush">
        {cardItems.map((item) => (
          <ListGroupItem
            key={item.id}
            style={{
              backgroundColor: "transparent",
              color: "white",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "12px 20px",
            }}
          >
            <Row className="align-items-center">
              <Col xs={2} style={{ textAlign: "center" }}>
                <div
                  style={{
                    backgroundColor: item.bgColor,
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </div>
              </Col>

              <Col style={{ textAlign: "left" }} xs={8}>
                <span style={{ fontSize: "16px", fontWeight: "500" }}>
                  {item.title}
                </span>
              </Col>

              <Col xs={2} style={{ textAlign: "center" }}>
                <FaChevronRight style={{ color: "#666" }} />
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  );
};

export default MenuCard;
