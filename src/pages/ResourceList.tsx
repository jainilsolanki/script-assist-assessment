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
  Skeleton,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchResourceList, SWAPIResource } from '../services/swapi.service';
import { useFilters } from '../hooks';

export default function ResourceList() {
  const { resourceType = 'people' } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterField, setFilterField] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | null>(null);

  const {
    availableFilters,
    filterData,
  } = useFilters(resourceType);

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

  const {
    data,
    isLoading,
    isFetching,
  } = useQuery(
    ['resources', resourceType, page, debouncedSearch],
    () =>
      fetchResourceList(resourceType, {
        page,
        search: debouncedSearch || undefined,
      }),
    {
      keepPreviousData: true,
    }
  );

  const isLoadingData = isLoading || isFetching;

  const handleRowClick = (resource: SWAPIResource) => {
    const id = resource.url.split('/').filter(Boolean).pop();
    navigate(`/${resourceType}/${id}`);
  };

  // Apply client-side filtering
  const filteredResults = data?.results ? filterData(data.results.filter(item => {
    if (!filterField || !filterValue) return true;
    const itemValue = (item as any)[filterField]?.toString().toLowerCase();
    if (!itemValue) return false;
    
    // Handle comma-separated values
    const itemValues = itemValue.split(',').map((v: string) => v.trim());
    return itemValues.includes(filterValue.toLowerCase());
  })) : [];

  return (
    <Paper p="md" radius="lg" withBorder>
      <LoadingOverlay visible={isLoadingData} />
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
              data={Object.entries(availableFilters).map(([key, filter]) => ({
                value: key,
                label: filter.label
              }))}
              clearable
              style={{ width: 200 }}
            />
            {filterField && availableFilters[filterField] && (
              <Select
                placeholder="Select value"
                value={filterValue}
                onChange={setFilterValue}
                data={availableFilters[filterField].options}
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
          {isLoadingData ? (
            Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton height={36} radius="sm" />
                </td>
                <td>
                  <Skeleton height={36} width={100} radius="sm" />
                </td>
              </tr>
            ))
          ) : filteredResults.length === 0 ? (
            <tr>
              <td colSpan={2}>
                <Text align="center" color="dimmed" py="xl">
                  No results found. Try adjusting your search or filters.
                </Text>
              </td>
            </tr>
          ) : (
            filteredResults.map((resource) => (
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

      <Group position="center" mt="md">
        {isLoadingData ? (
          <Skeleton height={36} width={300} radius="sm" />
        ) : (
          data && (
            <Pagination
              value={page}
              onChange={setPage}
              total={Math.ceil(data.count / 10)}
              radius="md"
              withEdges
              disabled={isLoadingData}
            />
          )
        )}
      </Group>
    </Paper>
  );
}
