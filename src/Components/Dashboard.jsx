import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Card,
  CardContent,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  // Retrieve data from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setUsers(storedUsers);
    setPosts(storedPosts);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh",  }}>
    <Container maxWidth='lg'>
      
      
      <Box component="main" sx={{ p: 3 }}>
        {/* Dashboard Stats */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#e0f7fa", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: "#00796b" }}>
                  Registered Users
                </Typography>
                <Typography variant="h4" sx={{ color: "#004d40" }}>
                  {users.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#fff3e0", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: "#e65100" }}>
                  Total Posts
                </Typography>
                <Typography variant="h4" sx={{ color: "#bf360c" }}>
                  {posts.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Post Titles */}
        <Box mt={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Post Titles
          </Typography>
          <Paper sx={{ padding: 2, boxShadow: 3, backgroundColor: "#ffffff" }}>
            <List>
              {posts.map((post) => (
                <React.Fragment key={post.id}>
                  <ListItem>
                    <ListItemText
                      primary={post.title}
                      secondary={post.content.slice(0, 50) + "..."}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Container>
    </Box>
  );
}

export default Dashboard;
