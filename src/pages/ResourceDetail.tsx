import {
  Paper,
  Text,
  Title,
  Card,
  Grid,
  Group,
  Stack,
  Button,
  ActionIcon,
  Loader,
  Skeleton,
  Center,
  Box,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { fetchResourceDetail } from '../services/swapi.service';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * ResourceDetail Component
 * Displays detailed information about a specific Star Wars resource
 * Handles loading states and dynamic data rendering
 */
export default function ResourceDetail() {
  // Extract resource type and ID from URL parameters
  const { resourceType = 'people', id = '1' } = useParams();
  const navigate = useNavigate();

  // Fetch resource data using React Query
  const { data: resource, isLoading } = useQuery(
    ['resource', resourceType, id],
    () => fetchResourceDetail(`https://swapi.py4e.com/api/${resourceType}/${id}`)
  );

  // Navigation handler for back button
  const handleBack = () => {
    navigate(-1);
  };

  // Navigation handler for related resources
  const handleRelatedClick = (url: string) => {
    const parts = url.split('/').filter(Boolean);
    const type = parts[parts.length - 2];
    const id = parts[parts.length - 1];
    navigate(`/${type}/${id}`);
  };

  // Extract related URLs for parallel fetching
  const relatedUrls = resource ? Object.entries(resource)
    .filter(([key, value]) => 
      (Array.isArray(value) && value.length > 0 && 
      ['films', 'species', 'vehicles', 'starships', 'pilots', 'residents', 'people', 'characters', 'planets'].includes(key)) ||
      (key === 'homeworld' && value)
    )
    .flatMap(([_, urls]) => Array.isArray(urls) ? urls : [urls])
    : [];

  // Fetch all related resources in parallel
  const relatedQueries = useQueries({
    queries: relatedUrls.map(url => ({
      queryKey: ['related', url],
      queryFn: () => fetch(url).then(res => res.json()),
      staleTime: Infinity,
    })),
  });

  const isLoadingRelated = relatedQueries.some(query => query.isLoading);

  // Loading state UI
  if (isLoading) {
    return (
      <Paper p="md" pos="relative">
        <Center sx={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <Loader size="lg" />
        </Center>
        
        <Box sx={{ opacity: 0.3 }}>
          <Group mb="xl" align="center">
            <ActionIcon variant="subtle" onClick={handleBack}>
              <IconArrowLeft size={18} />
            </ActionIcon>
            <Skeleton height={40} radius="md" width="60%" />
          </Group>

          <Grid gutter="md">
            <Grid.Col xs={12} sm={12} md={6}>
              <Card withBorder p="md" h="100%">
                <Title order={3} size="h4" mb="md">
                  Main Information
                </Title>
                <Stack spacing="xs">
                  {[...Array(6)].map((_, index) => (
                    <Group key={index} position="apart">
                      <Skeleton height={24} radius="md" width="30%" />
                      <Skeleton height={24} radius="md" width="60%" />
                    </Group>
                  ))}
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col xs={12} sm={12} md={6}>
              <Card withBorder p="md" h="100%">
                <Title order={3} size="h4" mb="md">
                  Related Resources
                </Title>
                <Stack spacing="xs">
                  {[...Array(3)].map((_, index) => (
                    <Group key={index} spacing={8}>
                      {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} height={24} radius="xl" width={80} />
                      ))}
                    </Group>
                  ))}
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Box>
      </Paper>
    );
  }

  // Render resource not found message
  if (!resource) {
    return (
      <Paper p="md">
        <Group position="center">
          <Text>Resource not found</Text>
        </Group>
      </Paper>
    );
  }

  // Extract main and related properties from resource data
  const mainProperties = Object.entries(resource).filter(
    ([key, value]) => 
      typeof value !== 'object' && 
      !Array.isArray(value) &&
      key !== 'created' &&
      key !== 'edited' &&
      key !== 'url' &&
      key !== 'homeworld'
  );

  const relatedProperties = Object.entries(resource).filter(
    ([key, value]) => 
      (Array.isArray(value) && value.length > 0 && 
      ['films', 'species', 'vehicles', 'starships', 'pilots', 'residents', 'people', 'characters', 'planets'].includes(key)) ||
      (key === 'homeworld' && value)
  );

  // Create a map of URLs to their fetched data
  const relatedDataMap = new Map();
  relatedQueries.forEach((query, index) => {
    if (query.data) {
      relatedDataMap.set(relatedUrls[index], query.data);
    }
  });

  // Render resource details
  return (
    <Paper p="md">
      {/* Header with back navigation */}
      <Group mb="xl" align="center">
        <ActionIcon variant="subtle" onClick={handleBack}>
          <IconArrowLeft size={18} />
        </ActionIcon>
        <Title order={2}>
          {resource.name || resource.title}
        </Title>
      </Group>

      <Grid gutter="md">
        <Grid.Col xs={12} sm={12} md={6}>
          <Card withBorder p="md" h="100%">
            <Title order={3} size="h4" mb="md">
              Main Information
            </Title>
            <Stack spacing="xs">
              {mainProperties.map(([key, value]: [string, any]) => (
                <Group key={key} position="apart">
                  <Text weight={500} transform="capitalize">
                    {key.replace('_', ' ')}:
                  </Text>
                  <Text>{value}</Text>
                </Group>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col xs={12} sm={12} md={6}>
          <Card withBorder p="md" h="100%">
            <Title order={3} size="h4" mb="md">
              Related Resources
            </Title>
            <Stack spacing="xs">
              {relatedProperties.map(([key, urls]: any) => (
                <div key={key}>
                  <Text weight={500} transform="capitalize" mb="xs">
                    {key.replace('_', ' ')}:
                  </Text>
                  <Group spacing={8}>
                    {isLoadingRelated ? (
                      <Skeleton height={24} radius="xl" width={120} />
                    ) : (
                      Array.isArray(urls) ? (
                        urls.map((url: string) => {
                          const relatedData = relatedDataMap.get(url);
                          return (
                            <Button 
                              key={url} 
                              variant="light" 
                              size="sm"
                              onClick={() => handleRelatedClick(url)}
                            >
                              {relatedData?.name || relatedData?.title || 'Loading...'}
                            </Button>
                          );
                        })
                      ) : (
                        <Button 
                          variant="light" 
                          size="sm"
                          onClick={() => handleRelatedClick(urls)}
                        >
                          {relatedDataMap.get(urls)?.name || relatedDataMap.get(urls)?.title || 'Loading...'}
                        </Button>
                      )
                    )}
                  </Group>
                </div>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
