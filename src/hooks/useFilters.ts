import { useState, useEffect } from 'react';
import filtersConfig from '../config/filters.json';

type FilterOption = {
  value: string;
  label: string;
};

type FilterConfig = {
  label: string;
  options: FilterOption[];
};

type ResourceFilters = {
  [key: string]: FilterConfig;
};

type FiltersConfig = {
  [key: string]: ResourceFilters;
};

export function useFilters(resourceType: string) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  // Reset filters when resource type changes
  useEffect(() => {
    setActiveFilters({});
  }, [resourceType]);

  // Get available filters for the current resource type
  const availableFilters = (filtersConfig as FiltersConfig)[resourceType] || {};

  // Update a single filter
  const updateFilter = (field: string, value: string) => {
    setActiveFilters((prev) => {
      if (!value) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [field]: value };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
  };

  // Filter the data based on active filters
  const filterData = <T extends Record<string, any>>(data: T[]): T[] => {
    if (Object.keys(activeFilters).length === 0) return data;

    return data.filter((item) =>
      Object.entries(activeFilters).every(([field, value]) => {
        const itemValue = item[field]?.toString().toLowerCase();
        return itemValue === value.toLowerCase();
      })
    );
  };

  return {
    activeFilters,
    availableFilters,
    updateFilter,
    clearFilters,
    filterData,
  };
}
