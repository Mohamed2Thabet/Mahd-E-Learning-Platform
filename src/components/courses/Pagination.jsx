import React from 'react'
import { Pagination as BootstrapPagination } from 'react-bootstrap'
import styled from 'styled-components'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageItems = () => {
    const items = []

    // Previous button
    items.push(
      <BootstrapPagination.Prev
        key="prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />
    )

    // First page
    if (currentPage > 2) {
      items.push(
        <BootstrapPagination.Item
          key={1}
          onClick={() => onPageChange(1)}
          active={currentPage === 1}
        >
          1
        </BootstrapPagination.Item>
      )
    }

    // Ellipsis if needed
    if (currentPage > 3) {
      items.push(<BootstrapPagination.Ellipsis key="ellipsis1" disabled />)
    }

    // Pages around current page
    for (
      let page = Math.max(1, currentPage - 1);
      page <= Math.min(totalPages, currentPage + 1);
      page++
    ) {
      items.push(
        <BootstrapPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </BootstrapPagination.Item>
      )
    }

    // Ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(<BootstrapPagination.Ellipsis key="ellipsis2" disabled />)
    }

    // Last page
    if (currentPage < totalPages - 1 && totalPages > 1) {
      items.push(
        <BootstrapPagination.Item
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          active={currentPage === totalPages}
        >
          {totalPages}
        </BootstrapPagination.Item>
      )
    }

    // Next button
    items.push(
      <BootstrapPagination.Next
        key="next"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    )

    return items
  }

  return (
    <StyledPagination className="custom-pagination">
      {renderPageItems()}
    </StyledPagination>
  )
}

export default Pagination;

const StyledPagination = styled(BootstrapPagination)`
  &.custom-pagination {
    .page-item {
      margin: 0 4px;
    }

    .page-link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background-color: transparent;
      color: var(--text-light);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s, color 0.3s;
    }

    .page-link:hover {
      background-color: var(--card-background);
    }

    .page-item.active .page-link {
      background-color: var(--primary);
      color: var(--mode-text);
      border: none;
    }

    .page-item.disabled .page-link {
      opacity: 0.4;
      pointer-events: none;
      background-color: transparent;
      border: 1px solid var(--border-color);
    }
  }
`
