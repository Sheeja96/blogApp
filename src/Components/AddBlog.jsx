import React from "react";
import { Box, Button, Container, TextField, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import './styles/style.css'

function AddPost({ posts, setPosts }) {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });


  const handleAddPost = (values, { resetForm }) => {
    const newPost = { id: posts.length + 1, ...values };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    resetForm();
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Update localStorage
  };

  return (
    <Box className="add-blog-page">
      <Container maxWidth="md" sx={{ pt: 4 }} className="blog-form-container" >
        <Typography variant="h4" gutterBottom className="h4">
          Add New Post
        </Typography>
        <Formik
          initialValues={{ title: "", content: "" }}
          validationSchema={validationSchema}
          onSubmit={handleAddPost}
        >
          {({ touched, errors }) => (
            <Form>
              <Field
                as={TextField}
                name="title"
                label="Title"
                fullWidth
                margin="normal"
                error={touched.title && Boolean(errors.title)}
                helperText={<ErrorMessage name="title" />}
              />
              <Field
                as={TextField}
                name="content"
                label="Content"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                error={touched.content && Boolean(errors.content)}
                helperText={<ErrorMessage name="content" />}
              />
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Add Post
              </Button>
            </Form>
          )}
        </Formik>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          All Posts
        </Typography>
        <List>
          {posts.map((post) => (
            <ListItem key={post.id} sx={{ display: "flex", justifyContent: "space-between" }}>
              <ListItemText
                primary={post.title}
                secondary={post.content}
              />
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/edit/${post.id}`)}
                  sx={{ mr: 2 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(post.id)}
                  sx={{ mr: 2 }}
                >
                  Delete
                </Button>

              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>

  );
}

export default AddPost;
