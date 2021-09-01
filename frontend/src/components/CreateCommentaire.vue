<template>
  <input type="textarea" v-model="content" placeholder="Votre commentaire" />
  <button type="submit" @click="createCommentaire()">Poster</button>
</template>

<script>
import axios from "axios";
export default {
  name: "Createcommentaire",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },

    createCommentaire() {
      const postId = parseInt(sessionStorage.getItem("postId"));
      const userid = parseInt(localStorage.getItem("userId"));
      const fd = new FormData();
      fd.append("postId", postId);
      fd.append("content", this.content);
      fd.append("userId", userid);
      axios
        .post("http://localhost:3000/api/commentaires/", fd, {
          headers: {
            "content-type": "application/json",
            authorization: "bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>