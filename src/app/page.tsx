import { NAV_HEIGHT } from "@/constants";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', pb: '48px', height: `calc(100vh - ${NAV_HEIGHT}px)` }} >
      <Typography variant="h1" gutterBottom sx={{ color: 'black', textAlign: 'center' }}>
        The Book Store™
      </Typography>
      <Typography variant="h3" sx={{ textAlign: 'center', color: 'black' }} gutterBottom>
        A magical land where you can store all of your favorite books
      </Typography>
    </Box>
  );
}
