import React from "react";
import { BreadcrumbProps } from "../types/Book";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbList }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {breadcrumbList.map((item, index) => {
        const isLastItem = index === breadcrumbList.length - 1;
        return (
          <span key={index}>
            <a onClick={() => location.pathname == item.breadcrumb.path || item.breadcrumb.path == '' ? null : navigate(item.breadcrumb.path)}>
              {item.breadcrumb.name.length > 40 ? item.breadcrumb.name.substring(0, 37) + '...' : item.breadcrumb.name}
            </a>
            {!isLastItem && " / "}
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
