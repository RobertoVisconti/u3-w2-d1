import { Component } from "react";
import { ListGroup, Button, Form, Spinner, Alert } from "react-bootstrap";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: false,
    isError: false,
    newComment: {
      comment: "",
      rate: "1",
      elementId: this.props.asin,
    },
  };

  fetchComments = async () => {
    this.setState({ isLoading: true, isError: false });
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWYzM2E2NGYwNDIwZDAwMTUxNTVhNjEiLCJpYXQiOjE3Nzc1NDc4NzYsImV4cCI6MTc3ODc1NzQ3Nn0.qQzs0E2KpWLjJyx3prcC6DD4L4xxHoGe2Pfk9ct8G6o",
          },
        },
      );
      if (response.ok) {
        let data = await response.json();
        this.setState({ comments: data, isLoading: false });
      } else {
        this.setState({ isLoading: false, isError: true });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      this.setState({ isLoading: false, isError: true });
    }
  };

  deleteComment = async (commentId) => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + commentId,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWYzM2E2NGYwNDIwZDAwMTUxNTVhNjEiLCJpYXQiOjE3Nzc1NDc4NzYsImV4cCI6MTc3ODc1NzQ3Nn0.qQzs0E2KpWLjJyx3prcC6DD4L4xxHoGe2Pfk9ct8G6o",
          },
        },
      );
      if (response.ok) {
        this.fetchComments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          body: JSON.stringify(this.state.newComment),
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWYzM2E2NGYwNDIwZDAwMTUxNTVhNjEiLCJpYXQiOjE3Nzc1NDc4NzYsImV4cCI6MTc3ODc1NzQ3Nn0.qQzs0E2KpWLjJyx3prcC6DD4L4xxHoGe2Pfk9ct8G6o",
          },
        },
      );
      if (response.ok) {
        this.setState({
          newComment: { comment: "", rate: "1", elementId: this.props.asin },
        });
        this.fetchComments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        newComment: { ...this.state.newComment, elementId: this.props.asin },
      });
      this.fetchComments();
    }
  }

  render() {
    return (
      <div className="p-3 bg-light border rounded">
        <h5>Recensioni Libro</h5>

        {/* --- LOADING & ERROR --- */}
        {this.state.isLoading && (
          <div className="text-center my-2">
            <Spinner animation="border" variant="primary" size="sm" />
          </div>
        )}
        {this.state.isError && (
          <Alert variant="danger">Errore nel caricamento!</Alert>
        )}

        {/* --- LISTA COMMENTI --- */}
        <ListGroup className="mb-3">
          {this.state.comments.length === 0 && !this.state.isLoading && (
            <ListGroup.Item>Nessuna recensione presente.</ListGroup.Item>
          )}
          {this.state.comments.map((c) => (
            <ListGroup.Item
              key={c._id}
              className="d-flex justify-content-between align-items-center"
              data-testid="single-comment"
            >
              <div>
                <strong>{c.rate}/5</strong> - {c.comment}
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => this.deleteComment(c._id)}
              >
                Elimina
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* --- FORM AGGIUNTA --- */}
        <Form onSubmit={this.sendComment} className="border-top pt-3">
          <Form.Group className="mb-2">
            <Form.Label>La tua recensione</Form.Label>
            <Form.Control
              type="text"
              placeholder="Scrivi qui..."
              value={this.state.newComment.comment}
              onChange={(e) =>
                this.setState({
                  newComment: {
                    ...this.state.newComment,
                    comment: e.target.value,
                  },
                })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Voto</Form.Label>
            <Form.Select
              value={this.state.newComment.rate}
              onChange={(e) =>
                this.setState({
                  newComment: {
                    ...this.state.newComment,
                    rate: e.target.value,
                  },
                })
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Invia Commento
          </Button>
        </Form>
      </div>
    );
  }
}

export default CommentArea;
