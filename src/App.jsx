import "./App.css";
import BooksFooter from "./components.jsx/BooksFooter";
import BooksNavBar from "./components.jsx/BooksNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import fantasy from "./data/fantasy.json";
import BookList from "./components.jsx/BookList";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <BooksNavBar />
      </header>
      <main className="flex-grow-1">
        <BookList books={fantasy} />
      </main>
      <footer>
        <BooksFooter />
      </footer>
    </div>
  );
}

export default App;
