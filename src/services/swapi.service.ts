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

interface FetchParams {
  page: number;
  search?: string;
  filter?: FilterValue;
}

export async function fetchResourceList(
  resourceType: string,
  params: FetchParams
): Promise<{ results: SWAPIResource[]; count: number }> {
  const { page, search, filter } = params;
  let url = `${BASE_URL}/${resourceType}/?page=${page}`;
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
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
  const relatedData: Record<string, any[]> = {};
  
  // Fields that contain URLs to other resources
  const relatedFields = ['films', 'species', 'vehicles', 'starships', 'pilots', 'residents', 'people', 'characters', 'planets'];

  for (const field of relatedFields) {
    if (resource[field] && Array.isArray(resource[field]) && resource[field].length > 0) {
      try {
        const results = await Promise.all(
          resource[field].map((url: string) => fetch(url).then(res => res.json()))
        );
        relatedData[field] = results;
      } catch (error) {
        console.error(`Error fetching ${field}:`, error);
      }
    }
  }

  return { ...resource, related: relatedData };
};
