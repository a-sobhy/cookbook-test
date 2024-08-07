const Pagination = ({ skip, total, onPageChange }) => {
  const pageCount = Math.ceil(total / 10);

  const handleFirstPage = () => {
    onPageChange(0);
  };

  const handlePreviousPage = () => {
    onPageChange(Math.max(skip - 10, 0));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(skip + 10, (pageCount - 1) * 10));
  };

  const handleLastPage = () => {
    onPageChange((pageCount - 1) * 10);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    buttons.push(
      <button key="first" onClick={handleFirstPage} disabled={skip === 0}>
        {`<<`}
      </button>
    );

    buttons.push(
      <button key="previous" onClick={handlePreviousPage} disabled={skip === 0}>
        {`<`}
      </button>
    );

    for (let i = 0; i < pageCount; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i * 10)}
          className={i * 10 === skip ? "active-page" : ""}
        >
          {i + 1}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={handleNextPage}
        disabled={skip >= (pageCount - 1) * 10}
      >
        {`>`}
      </button>
    );

    buttons.push(
      <button
        key="last"
        onClick={handleLastPage}
        disabled={skip >= (pageCount - 1) * 10}
      >
        {`>>`}
      </button>
    );

    return buttons;
  };

  return <div className="pagination">{renderPaginationButtons()}</div>;
};

export default Pagination;
