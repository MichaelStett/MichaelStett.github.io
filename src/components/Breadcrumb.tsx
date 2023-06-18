import React, {useEffect, useState, useRef } from "react";
import { BreadcrumbProps } from "../types/Book";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbList }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = useRef<any>();

  useEffect(() => {
    if (!elementRef?.current?.clientHeight) {
      return;
    }
    setHeight(elementRef?.current?.clientHeight);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (!isScrolled && window.pageYOffset > height) {
        setIsScrolled(true);
      } else if (isScrolled && window.pageYOffset <= height) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    
    // Cleanup - remove the listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [isScrolled]);

  return (
    <div ref={elementRef} className={`${isScrolled ? 'rounded-bl-lg rounded-br-lg' : 'rounded-lg'} sticky top-0 z-10 text-sm sm:text-base md:text-lg px-4 py-4 mx-auto w-full border border-gray-400 border-solid bg-white`}>
      {breadcrumbList.map((item, index) => {
        const isLastItem = index === breadcrumbList.length - 1;
        return (
          <span key={index}>
            <a onClick={() => location.pathname == item.breadcrumb.path || item.breadcrumb.path == '' ? null : navigate(item.breadcrumb.path)}
                className={`${ item.breadcrumb.path != '' ? 'cursor-pointer' : ''}`}>
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
