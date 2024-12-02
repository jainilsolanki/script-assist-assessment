import { useParams, useNavigate } from 'react-router-dom';
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
  Button,
  ActionIcon,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { fetchResourceDetail, enrichResourceWithRelated } from '../services/swapi.service';

export default function ResourceDetail() {
  const { resourceType = 'people', id = '1' } = useParams();
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(`/${resourceType}`);
  };

  if (isLoading) {
    return (
      <Paper p="md">
        <Group mb="xl">
          <ActionIcon variant="subtle" onClick={handleBack}>
            <IconArrowLeft size={18} />
          </ActionIcon>
          <Skeleton height={50} sx={{ flex: 1 }} />
        </Group>
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
    return (
      <Paper p="md">
        <Group mb="xl">
          <ActionIcon variant="subtle" onClick={handleBack}>
            <IconArrowLeft size={18} />
          </ActionIcon>
          <Text>Resource not found</Text>
        </Group>
      </Paper>
    );
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
      <Group mb="xl" align="center">
        <ActionIcon variant="subtle" onClick={handleBack}>
          <IconArrowLeft size={18} />
        </ActionIcon>
        <Title order={2}>
          {resource.name || resource.title}
        </Title>
      </Group>

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
