const BASE_URL = 'https://swapi.dev/api';

export interface SWAPIResource {
  name?: string;
  title?: string;
  url: string;
  [key: string]: any;
}

export interface ResourceListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SWAPIResource[];
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterValue {
  field: string;
  value: string;
}

export const fetchResourceList = async (
  resourceType: string,
  page = 1,
  search?: string,
  filter?: FilterValue
): Promise<ResourceListResponse> => {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    ...(search && { search }),
  });
  
  const response = await fetch(`${BASE_URL}/${resourceType}/?${searchParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch resource list');
  }
  const data = await response.json();

  // Apply filtering on the client side since SWAPI doesn't support filtering
  if (filter && filter.field && filter.value) {
    data.results = data.results.filter((item: any) => {
      const fieldValue = String(item[filter.field] || '').toLowerCase();
      const filterValue = filter.value.toLowerCase();
      return fieldValue.includes(filterValue);
    });
    data.count = data.results.length;
  }

  return data;
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
