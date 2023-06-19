import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BreadcrumbPresentation from "../Dumb/BreadcrumbPresentation";
import { BreadcrumbProps } from "../../types/BreadcrumbTypes";

const BreadcrumbContainer: React.FC<BreadcrumbProps> = ({ breadcrumbList }) => {
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
    <BreadcrumbPresentation 
      breadcrumbList={breadcrumbList} 
      navigate={navigate} 
      location={location} 
      isScrolled={isScrolled}
      elementRef={elementRef}
    />
  );
}

export default BreadcrumbContainer;
