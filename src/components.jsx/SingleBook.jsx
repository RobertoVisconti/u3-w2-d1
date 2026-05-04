import { Component } from "react";
import { Card } from "react-bootstrap";

class SingleBook extends Component {
  render() {
    const { book, selectedAsin, changeSelectedAsin } = this.props;

    return (
      <Card
        className="d-flex flex-column h-100 shadow-sm"
        style={{
          border:
            selectedAsin === book.asin ? "3px solid red" : "1px solid #dee2e6",
          cursor: "pointer",
        }}
        onClick={() => changeSelectedAsin(book.asin)}
      >
        <Card.Img
          variant="top"
          src={book.img}
          alt={book.title}
          style={{ height: "500px", objectFit: "cover" }}
        />

        <Card.Body>
          <Card.Title className="text-truncate" title={book.title}>
            {book.title}
          </Card.Title>
          <Card.Text className="text-muted">Prezzo: €{book.price}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default SingleBook;
