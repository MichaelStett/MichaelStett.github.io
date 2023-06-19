import { useState } from 'react';
import { BreadcrumbProp } from '../types/BreadcrumbTypes';

export const useBreadcrumbs = (props : BreadcrumbProp[]) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbProp[]>(props);

  const addBreadcrumb = (breadcrumbToAdd: BreadcrumbProp) => {
    setBreadcrumbs([...breadcrumbs, breadcrumbToAdd]);
  };

  const addBreadcrumbs = (breadcrumbsToAdd: BreadcrumbProp[]) => {
    setBreadcrumbs([...breadcrumbs, ...breadcrumbsToAdd]);
  };

  const removeBreadcrumb = (breadcrumbToRemove: BreadcrumbProp) => {
    setBreadcrumbs(breadcrumbs.filter(breadcrumb => breadcrumb !== breadcrumbToRemove));
  };

  const removeLastBreadcrumb = () => {
    setBreadcrumbs(breadcrumbs.slice(0, -1))
  };

  return { breadcrumbs, addBreadcrumb, addBreadcrumbs, removeBreadcrumb, removeLastBreadcrumb };
};