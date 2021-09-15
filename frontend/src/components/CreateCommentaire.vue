<template>
  <div class="comment">
    <input
      type="textarea"
      class="comment-content"
      v-model="content"
      placeholder="Votre commentaire"
    />
    <button
      type="submit"
      class="comment-content-post"
      @click="createCommentaire()"
    >
      <i class="fas fa-plus-circle"></i>
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Createcommentaire",
  props: ["postId"],
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
      const userid = parseInt(localStorage.getItem("userId"));
      const fd = new FormData();
      fd.append("postId", this.postId);
      fd.append("content", this.content);
      fd.append("userId", userid);
      axios
        .post("http://localhost:3000/api/commentaires/", fd, {
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Votre commentaire a bien été enregistré !");
          sessionStorage.clear();
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  margin-top: 10px;
  &-content {
    width: 50%;
    color: #7b7782;
    background-color: #f0f2f5;
    height: 40px;
    border-radius: 8px;
    border: 2px solid rgb(172, 172, 172);
    &-post {
      color: #fd2d01;
      background-color: #ffd7d7;
      margin-left: -30px;
      height: 40px;
      border: 2px solid rgb(172, 172, 172);
      border-radius: 0px 8px 8px 0px;
    }
  }
}

@media all and (max-width: 768px) {
  .comment-content{
    width: 80%;
  }
}

@media all and (max-width: 356px) {
  .comment-content{
    width: 90%;
  }
}
</style>