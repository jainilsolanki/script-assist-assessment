import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

/**
 * Helper function to fetch resource data from SWAPI
 * param type - The type of resource to fetch (e.g., 'people', 'planets')
 * param id - Optional ID to fetch a specific resource
 * returns Promise resolving to the fetched resource data
 */
const fetchResource = async (type: string, id?: string) => {
  const baseUrl = 'https://swapi.dev/api';
  const url = id ? `${baseUrl}/${type}/${id}` : `${baseUrl}/${type}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch resource');
  }
  return response.json();
};

/**
 * Custom hook for fetching Star Wars resources
 * Handles both list and detail views using React Query
 * Automatically manages loading states and caching
 * returns Object containing resource data, loading state, and current resource type
 */
export const useResource = () => {
  // Extract resource type and ID from URL parameters
  const { resourceType, id } = useParams();

  // Fetch resource list when no ID is provided
  const { data: resourceList, isLoading: isListLoading } = useQuery(
    ['resources', resourceType],
    () => fetchResource(resourceType!),
    {
      // Only fetch list when resource type is available and no ID is specified
      enabled: !!resourceType && !id,
    }
  );

  // Fetch single resource when ID is provided
  const { data: resource, isLoading: isResourceLoading } = useQuery(
    ['resource', resourceType, id],
    () => fetchResource(resourceType!, id),
    {
      // Only fetch resource when both type and ID are available
      enabled: !!resourceType && !!id,
    }
  );

  return {
    resourceList,      // List of resources when viewing index page
    resource,         // Single resource when viewing detail page
    isLoading: isListLoading || isResourceLoading,  // Combined loading state
    resourceType,     // Current resource type from URL
  };
};