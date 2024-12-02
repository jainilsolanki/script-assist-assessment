import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


const fetchResource = async (type: string, id?: string) => {
  const baseUrl = 'https://swapi.dev/api';
  const url = id ? `${baseUrl}/${type}/${id}` : `${baseUrl}/${type}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch resource');
  }
  return response.json();
};

export const useResource = () => {
  const { resourceType, id } = useParams();

  const { data: resourceList, isLoading: isListLoading } = useQuery(
    ['resources', resourceType],
    () => fetchResource(resourceType!),
    {
      enabled: !!resourceType && !id,
    }
  );

  const { data: resource, isLoading: isResourceLoading } = useQuery(
    ['resource', resourceType, id],
    () => fetchResource(resourceType!, id),
    {
      enabled: !!resourceType && !!id,
    }
  );

  return {
    resourceList,
    resource,
    isLoading: isListLoading || isResourceLoading,
    resourceType,
  };
};