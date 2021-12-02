import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useState, useEffect } from "react";
const Articles = (props) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const loadPosts = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    console.log(data);
    setPosts(data);
  };
  useEffect(() => {
    props.setSideToggle(false);
    loadPosts();
  }, [page]);
  return (
    <div>
      <Container component={Box} py={3} className="mt-5">
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item sm={3}>
              <Card key={post.id} style={{ height: 150 }}>
                <CardContent>
                  <Typography variant="h6">
                    {post.id}. {post.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box py={3} display="flex" justifyContent="center">
          <Pagination
            count={13}
            color="primary"
            variant="text"
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Articles;
