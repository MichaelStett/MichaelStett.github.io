import React from "react";

type BreadcrumbProps = {
  breadcrumbList: { name: string, path: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbList }) => {
  return (
    <div>
      {breadcrumbList.map((item, index) => {
        const isLastItem = index === breadcrumbList.length - 1;
        return (
          <span key={index}>
            <a href={item.path}>{item.name}</a>
            {!isLastItem && " > "}
          </span>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
