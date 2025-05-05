import React from 'react';

const Pagination = () => (
  <nav className="d-flex justify-content-center mt-4">
    <ul className="pagination">
      <li className="page-item"><a className="page-link" href="#">&lt;</a></li>
      <li className="page-item active"><a className="page-link" href="#">1</a></li>
      <li className="page-item"><a className="page-link" href="#">2</a></li>
      <li className="page-item"><a className="page-link" href="#">3</a></li>
      <li className="page-item"><a className="page-link" href="#">&gt;</a></li>
    </ul>
  </nav>
);

export default Pagination;
