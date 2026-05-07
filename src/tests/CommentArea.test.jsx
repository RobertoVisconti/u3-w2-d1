import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import CommentArea from "../components.jsx/CommentArea";
import BookList from "../components.jsx/BookList";
import fantasy from "../data/fantasy.json";

describe("Controlliamo che comment area esista", () => {
  it("trova il titolo del componente", async () => {
    render(<CommentArea />);
    const title = await screen.findByText(/Nessuna recensione presente./i);
    expect(title).toBeInTheDocument();
  });
  describe("controlliamo che non ci siano istanze", () => {
    it("non dovrebbe mostrare commenti", () => {
      render(<CommentArea />);
      const singleComment = screen.queryByTestId("single-comment");
      expect(singleComment).toBeNull();
    });
  });
  describe("controlliamo i commenti premendo su un libro", () => {
    it("vediamo che escano i commenti del libro selezionato", async () => {
      render(
        <>
          <BookList books={fantasy} />
          <CommentArea />
        </>,
      );
      const allBooks = screen.getAllByTestId("books");
      fireEvent.click(allBooks[0]);

      const allComments = await screen.findAllByTestId("single-comment");
      expect(allComments.length).toBeGreaterThan(0);
    });
  });
});
