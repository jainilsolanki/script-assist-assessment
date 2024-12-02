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
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchResourceList, SWAPIResource } from '../services/swapi.service';

export default function ResourceList() {
  const { resourceType = 'people' } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery(
    ['resources', resourceType, page, debouncedSearch],
    () => fetchResourceList(resourceType, page, debouncedSearch),
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
        <TextInput
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </Group>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.results.map((resource) => (
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
          ))}
        </tbody>
      </Table>

      {data && (
        <Group position="center" mt="md">
          {/* <Pagination
            total={Math.ceil(data.count / 10)}
            page={page}
            onChange={setPage}
          /> */}
        </Group>
      )}
    </Paper>
  );
}
