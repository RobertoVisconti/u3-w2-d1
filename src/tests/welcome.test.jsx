import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BooksNavBar from "../components.jsx/BooksNavBar";

describe("Test del titolo nella navbar", () => {
  it("Verifica del componente se è montato correttamente", () => {
    render(<BooksNavBar />);
    const title = screen.getByText(/il silenzio rilegato/i);
    expect(title).toBeInTheDocument();
  });
});
