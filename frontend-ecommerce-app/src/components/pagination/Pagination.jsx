import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginationSection = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages >= 1 && (
      <section>
        <Pagination className="justify-content-center">
          {[...Array(pages).keys()].map((pageIndex) => (
            <LinkContainer
              key={pageIndex + 1}
              to={
                isAdmin
                  ? `/admin/products/page/${pageIndex + 1}`
                  : keyword
                  ? `/search/${keyword}/page/${pageIndex + 1}`
                  : `/page/${pageIndex + 1}`
              }
            >
              <Pagination.Item active={+pageIndex + 1 === +page}>
                {pageIndex + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      </section>
    )
  );
};

export default PaginationSection;
