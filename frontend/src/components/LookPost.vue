<template>
  <div v-for="post in posts" :key="post">
    <h1>{{ userId }}</h1>
    <p>{{ pseudo }}</p>
    <p>{{ isAdmin }}</p>
    <p>{{ email }}</p>
    <p>{{ post.content }}</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LookPost",
  data() {
    return {
      isAdmin: localStorage.getItem("isAdmin"),
      posts: [],
      userId: localStorage.getItem("userId"),
      pseudo: localStorage.getItem("pseudo"),
      email: localStorage.getItem("email"),
    };
  },

  beforeMount() {
    axios
      .get("http://localhost:3000/api/post/", {
        method: "GET",
        headers: {
          authorization: "bearer" + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;
        const posts = data.posts;
        console.log(data);
        console.log(posts);
        this.posts = posts;
        const postId = posts[2];
        console.log(postId);
      })
      .catch((error) => console.log({ error }));
  },
};
</script>

<style>
</style>