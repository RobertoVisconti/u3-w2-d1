import { Component } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    selectedAsin: null,
  };

  changeSelectedAsin = (asin) => {
    this.setState({
      selectedAsin: asin,
    });
  };

  render() {
    return (
      <Container fluid className="my-3">
        <Row>
          <Col md={8}>
            <Row className="g-3">
              {this.props.books.map((b) => (
                <Col xs={12} sm={6} lg={4} key={b.asin}>
                  <SingleBook
                    book={b}
                    selectedAsin={this.state.selectedAsin}
                    changeSelectedAsin={this.changeSelectedAsin}
                  />
                </Col>
              ))}
            </Row>
          </Col>

          <Col
            md={4}
            className="sticky-top"
            style={{ height: "100vh", overflowY: "auto" }}
          >
            {this.state.selectedAsin ? (
              <CommentArea asin={this.state.selectedAsin} />
            ) : (
              <Alert variant="info" className="mt-3">
                Seleziona un libro per vedere le recensioni
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BookList;
