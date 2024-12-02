import { useParams } from 'react-router-dom';
import {
  Paper,
  Title,
  Grid,
  Card,
  Text,
  Skeleton,
  Group,
  Badge,
  Stack,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { fetchResourceDetail, enrichResourceWithRelated } from '../services/swapi.service';

export default function ResourceDetail() {
  const { resourceType = 'people', id = '1' } = useParams();

  const { data: resource, isLoading } = useQuery(
    ['resource', resourceType, id],
    async () => {
      const baseUrl = `https://swapi.dev/api/${resourceType}/${id}/`;
      const resource = await fetchResourceDetail(baseUrl);
      return enrichResourceWithRelated(resource);
    },
    {
      enabled: !!resourceType && !!id,
    }
  );

  if (isLoading) {
    return (
      <Paper p="md">
        <Skeleton height={50} mb="xl" />
        <Grid>
          <Grid.Col span={6}>
            <Skeleton height={200} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={200} />
          </Grid.Col>
        </Grid>
      </Paper>
    );
  }

  if (!resource) {
    return <Text>Resource not found</Text>;
  }

  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  };

  const mainProperties = Object.entries(resource).filter(
    ([key, value]) => 
      typeof value !== 'object' && 
      !Array.isArray(value) &&
      key !== 'created' &&
      key !== 'edited' &&
      key !== 'url'
  );

  const relatedResources = resource.related || {};

  return (
    <Paper p="md">
      <Title order={2} mb="xl">
        {resource.name || resource.title}
      </Title>

      <Grid>
        <Grid.Col span={6}>
          <Card withBorder p="md">
            <Title order={3} size="h4" mb="md">
              Main Information
            </Title>
            <Stack spacing="xs">
              {mainProperties.map(([key, value]) => (
                <Group key={key} position="apart">
                  <Text weight={500} transform="capitalize">
                    {key.replace('_', ' ')}:
                  </Text>
                  <Text>{renderValue(value)}</Text>
                </Group>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card withBorder p="md">
            <Title order={3} size="h4" mb="md">
              Related Resources
            </Title>
            <Stack spacing="xs">
              {Object.entries(relatedResources).map(([key, value]: [string, any]) => (
                <div key={key}>
                  <Text weight={500} transform="capitalize" mb="xs">
                    {key.replace('_', ' ')}:
                  </Text>
                  <Badge size="lg">
                    {value.name || value.title}
                  </Badge>
                </div>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
