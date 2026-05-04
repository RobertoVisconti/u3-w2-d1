const BooksFooter = () => {
  return (
    <>
      <footer className="py-3 mt-auto border-top bg-light">
        <div className="container text-center">
          <span className="text-muted">
            <strong>Il Silenzio Rilegato</strong> | Dal 1993 -{" "}
            {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </>
  );
};
export default BooksFooter;
