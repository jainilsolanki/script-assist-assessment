import { Container, Title, Text, Button, createStyles, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  title: {
    fontWeight: 900,
    fontSize: rem(34),
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function NotFound() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title className={classes.title}>404 - Page Not Found</Title>
        <Text color="dimmed" size="lg" align="center" mb={rem(20)}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Text>
        <Button
          variant="outline"
          size="md"
          onClick={() => navigate('/people')}
          className={classes.control}
        >
          Take me back to home page
        </Button>
      </div>
    </Container>
  );
}
