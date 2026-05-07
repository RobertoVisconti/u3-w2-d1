import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import BookList from "../components.jsx/BookList";
import fantasy from "../data/fantasy.json";

describe("Vedo se monta tutte le card", () => {
  it("Vediamo se le card vengono create con la chiamata GET", async () => {
    render(<BookList books={fantasy} />);
    const items = await screen.findAllByTestId("books");
    expect(items.length).toBe(150);
  });
  describe("controllo se ha il bordo rosso", () => {
    it("vediamo se il bordo compare al click e scompare cliccando un altro libro e cambia il bordo", () => {
      render(<BookList books={fantasy} />);
      const selected = screen.getAllByTestId("books");
      const firstSelected = selected[0];
      const secondSelected = selected[1];
      fireEvent.click(firstSelected);
      expect(firstSelected).toHaveStyle({ borderColor: "rgb(255, 0, 0)" });
      fireEvent.click(secondSelected);
      expect(secondSelected).toHaveStyle({ borderColor: "rgb(255, 0, 0)" });
      expect(firstSelected).not.toHaveStyle({ borderColor: "rgb(255, 0, 0)" });
      expect(secondSelected).toHaveStyle({ borderColor: "1px solid #dee2e6" });
    });
  });
});
