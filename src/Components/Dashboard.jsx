import React, { useEffect, useState } from "react";
import { AppBar,Toolbar,Typography,Drawer,List,ListItem,ListItemText,Box,
CssBaseline,Divider,Card,CardContent,Grid,Paper,} from "@mui/material";
const drawerWidth = 240;
function Dashboard() {
const [users, setUsers] = useState([]);
const [posts, setPosts] = useState([]);

useEffect(() => {
const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
setUsers(storedUsers);
setPosts(storedPosts);}, []);

  return (
<Box sx={{ display: "flex", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
<CssBaseline />
<AppBar position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#333",
        }}  >
        <Toolbar>
        <Typography variant="h6" noWrap>
    Blog Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu items"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#212121",
              color: "white",
            },
          }}
          open
        >
          <Toolbar>
            <Typography variant="h6" sx={{ color: "white" }}>
              My Blog App
            </Typography>
          </Toolbar>
          <Divider sx={{ borderColor: "#444" }} />
          <List>
            <ListItem button>
              <ListItemText primary="Add Blog" sx={{ color: "white" }} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Manage Blogs" sx={{ color: "white" }} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Profile" sx={{ color: "white" }} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Logout" sx={{ color: "white" }} />
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
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
    </Box>
  );
}

export default Dashboard;