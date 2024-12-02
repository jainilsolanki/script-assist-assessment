import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Table,
  Group,
  TextInput,
  Button,
  Paper,
  Title,
  LoadingOverlay,
  Pagination,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchResourceList, SWAPIResource, FilterOption, FilterValue } from '../services/swapi.service';

const getFilterOptions = (resourceType: string): FilterOption[] => {
  switch (resourceType) {
    case 'people':
      return [
        { value: 'gender', label: 'Gender' },
        { value: 'hair_color', label: 'Hair Color' },
        { value: 'eye_color', label: 'Eye Color' },
      ];
    case 'planets':
      return [
        { value: 'climate', label: 'Climate' },
        { value: 'terrain', label: 'Terrain' },
      ];
    case 'starships':
      return [
        { value: 'manufacturer', label: 'Manufacturer' },
        { value: 'starship_class', label: 'Starship Class' },
      ];
    case 'vehicles':
      return [
        { value: 'manufacturer', label: 'Manufacturer' },
        { value: 'vehicle_class', label: 'Vehicle Class' },
      ];
    case 'species':
      return [
        { value: 'classification', label: 'Classification' },
        { value: 'designation', label: 'Designation' },
        { value: 'language', label: 'Language' },
      ];
    default:
      return [];
  }
};

const getFilterValues = (field: string): FilterOption[] => {
  switch (field) {
    case 'gender':
      return [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'n/a', label: 'N/A' },
      ];
    case 'hair_color':
      return [
        { value: 'black', label: 'Black' },
        { value: 'brown', label: 'Brown' },
        { value: 'blonde', label: 'Blonde' },
        { value: 'red', label: 'Red' },
        { value: 'white', label: 'White' },
        { value: 'none', label: 'None' },
      ];
    case 'eye_color':
      return [
        { value: 'blue', label: 'Blue' },
        { value: 'brown', label: 'Brown' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'red', label: 'Red' },
      ];
    case 'climate':
      return [
        { value: 'arid', label: 'Arid' },
        { value: 'temperate', label: 'Temperate' },
        { value: 'tropical', label: 'Tropical' },
        { value: 'frozen', label: 'Frozen' },
      ];
    case 'terrain':
      return [
        { value: 'desert', label: 'Desert' },
        { value: 'grasslands', label: 'Grasslands' },
        { value: 'mountains', label: 'Mountains' },
        { value: 'jungle', label: 'Jungle' },
        { value: 'ocean', label: 'Ocean' },
      ];
    case 'manufacturer':
      return [
        { value: 'sienar fleet systems', label: 'Sienar Fleet Systems' },
        { value: 'kuat drive yards', label: 'Kuat Drive Yards' },
        { value: 'corellian engineering corporation', label: 'Corellian Engineering' },
        { value: 'incom corporation', label: 'Incom Corporation' },
      ];
    case 'starship_class':
      return [
        { value: 'star destroyer', label: 'Star Destroyer' },
        { value: 'starfighter', label: 'Starfighter' },
        { value: 'transport', label: 'Transport' },
        { value: 'cruiser', label: 'Cruiser' },
      ];
    case 'vehicle_class':
      return [
        { value: 'wheeled', label: 'Wheeled' },
        { value: 'repulsorcraft', label: 'Repulsorcraft' },
        { value: 'walker', label: 'Walker' },
        { value: 'airspeeder', label: 'Airspeeder' },
      ];
    case 'classification':
      return [
        { value: 'mammal', label: 'Mammal' },
        { value: 'reptile', label: 'Reptile' },
        { value: 'amphibian', label: 'Amphibian' },
        { value: 'sentient', label: 'Sentient' },
      ];
    case 'designation':
      return [
        { value: 'sentient', label: 'Sentient' },
        { value: 'reptilian', label: 'Reptilian' },
        { value: 'mammalian', label: 'Mammalian' },
      ];
    case 'language':
      return [
        { value: 'galactic basic', label: 'Galactic Basic' },
        { value: 'huttese', label: 'Huttese' },
        { value: 'wookiee', label: 'Wookiee' },
        { value: 'rodian', label: 'Rodian' },
      ];
    default:
      return [];
  }
};

export default function ResourceList() {
  const { resourceType = 'people' } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterField, setFilterField] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | null>(null);

  // Reset filters when resource type changes
  useEffect(() => {
    setFilterField(null);
    setFilterValue(null);
    setPage(1);
  }, [resourceType]);

  // Reset filter value when filter field changes
  useEffect(() => {
    setFilterValue(null);
  }, [filterField]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filter: FilterValue | undefined = filterField && filterValue
    ? { field: filterField, value: filterValue }
    : undefined;

  const { data, isLoading } = useQuery(
    ['resources', resourceType, page, debouncedSearch, filterField, filterValue],
    () => fetchResourceList(resourceType, page, debouncedSearch, filter),
    {
      keepPreviousData: true,
    }
  );

  const handleRowClick = (resource: SWAPIResource) => {
    const id = resource.url.split('/').filter(Boolean).pop();
    navigate(`/${resourceType}/${id}`);
  };

  return (
    <Paper p="md" pos="relative">
      <LoadingOverlay visible={isLoading} />
      <Group position="apart" mb="md">
        <Title order={2} transform="capitalize">
          {resourceType}
        </Title>
        <Group align="flex-start">
        <TextInput
            label="Search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 300 }}
          />
          <Stack spacing="xs">
            <Select
              label="Filter by"
              placeholder="Select field"
              value={filterField}
              onChange={setFilterField}
              data={getFilterOptions(resourceType)}
              clearable
              style={{ width: 200 }}
            />
            {filterField && (
              <Select
                placeholder="Select value"
                value={filterValue}
                onChange={setFilterValue}
                data={getFilterValues(filterField)}
                clearable
                style={{ width: 200 }}
              />
            )}
          </Stack>
          
        </Group>
      </Group>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.results.length === 0 ? (
            <tr>
              <td colSpan={2}>
                <Text align="center" color="dimmed" py="xl">
                  No results found. Try adjusting your search or filters.
                </Text>
              </td>
            </tr>
          ) : (
            data?.results.map((resource) => (
              <tr
                key={resource.url}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(resource)}
              >
                <td>{resource.name || resource.title}</td>
                <td>
                  <Button
                    variant="subtle"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(resource);
                    }}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {data && (
        <Group position="center" mt="md">
          <Pagination
            value={page}
            onChange={setPage}
            total={Math.ceil(data.count / 10)}
            radius="md"
            withEdges
          />
        </Group>
      )}
    </Paper>
  );
}
