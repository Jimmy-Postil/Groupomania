<template>
  <div
    class="commentaire"
    v-for="commentaire in commentaires"
    :key="commentaire.id"
  >
    <p>{{ commentaire.content }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LookCommentaire",
  data() {
    return {
      commentaires: [],
      isAdmin: localStorage.getItem("isAdmin"),
      userId: localStorage.getItem("userId"),
      revele: false,
    };
  },
  beforeMount() {
    axios
      .get("http://localhost:3000/api/commentaires/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "bearer" + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        this.commentaires = data;
      })
      .catch((error) => console.log({ error }));
  },
  methods: {
    viewModale() {
      this.revele = !this.revele;
    },
    deletePost(id) {
      axios
        .delete("http://localhost:3000/api/commentaires/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer" + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Votre post a bien été supprimé");
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
    modifyPost(id) {
      axios
        .get("http://localhost:3000/api/commentaires/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer" + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("postId", parseInt(response.data.id));
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>