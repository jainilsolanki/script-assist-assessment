import { useState, useEffect } from 'react';
import filtersConfig from '../config/filters.json';

/**
 * Type definitions for filter configuration
 */
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

/**
 * Custom hook for managing resource filters
 * Provides filter state management and data filtering functionality
 * @param resourceType - The type of resource to filter (e.g., 'people', 'planets')
 */
export function useFilters(resourceType: string) {
  // State for tracking active filters
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  // Reset filters when resource type changes
  useEffect(() => {
    setActiveFilters({});
  }, [resourceType]);

  // Get available filters for the current resource type
  const availableFilters = (filtersConfig as FiltersConfig)[resourceType] || {};

  /**
   * Updates a single filter value
   * Removes filter if value is empty
   */
  const updateFilter = (field: string, value: string) => {
    setActiveFilters((prev) => {
      if (!value) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [field]: value };
    });
  };

  // Clear all active filters
  const clearFilters = () => {
    setActiveFilters({});
  };

  /**
   * Filters data based on active filters
   * Performs case-insensitive comparison
   */
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
