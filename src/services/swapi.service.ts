const BASE_URL = 'https://swapi.dev/api';

export interface SWAPIResource {
  name?: string;
  title?: string;
  url: string;
}

export interface ResourceListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SWAPIResource[];
}

export const fetchResourceList = async (
  resourceType: string,
  page = 1,
  search?: string
): Promise<ResourceListResponse> => {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    ...(search && { search }),
  });
  
  const response = await fetch(`${BASE_URL}/${resourceType}/?${searchParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch resource list');
  }
  return response.json();
};

export const fetchResourceDetail = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch resource detail');
  }
  return response.json();
};

export const enrichResourceWithRelated = async (resource: any) => {
  const relatedData: Record<string, any> = {};
  
  // Get all URL properties that need to be fetched
  const urlProperties = Object.entries(resource)
    .filter(([_, value]) => 
      typeof value === 'string' && 
      value.startsWith('https://swapi.dev/api/')
    );

  // Fetch related resources
  await Promise.all(
    urlProperties.map(async ([key, url]) => {
      try {
        const response = await fetch(url as string);
        if (response.ok) {
          relatedData[key] = await response.json();
        }
      } catch (error) {
        console.error(`Failed to fetch related resource for ${key}:`, error);
      }
    })
  );

  return {
    ...resource,
    related: relatedData,
  };
};
