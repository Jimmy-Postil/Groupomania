<template>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
    integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
    crossorigin="anonymous"
  />
  <div class="background">
    <div class="content">
      <label for="content" class="content-title"
        ><h3>
          Ici vous pouvez lire les derniers posts de vos collègues et écrire les
          votres
        </h3>
        <br
      /></label>
      <div class="publish">
        <input
          type="textarea"
          class="publish-explain"
          placeholder="Exprimez-vous"
          v-model="content"
        />
        <div class="publish-explain--separator"></div>
        <div class="post">
          <input type="file" class="post-add" @change="onFileSelected" />
          <button
            type="submit"
            class="post-add--publish"
            v-on:click="createPost"
          >
            Publier
          </button>
        </div>
      </div>
    </div>
    <div class="LookPost"><LookPost /></div>
  </div>
</template>

<script>
import axios from "axios";
import LookPost from "../components/LookPost.vue";
export default {
  name: "CreatePost",
  components: {
    LookPost,
  },
  data() {
    return {
      selectedFile: null,
      userId: "",
      content: "",
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },

    createPost() {
      const userid = parseInt(localStorage.getItem("userId"));
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      fd.append("content", this.content);
      fd.append("userId", userid);
      axios
        .post("http://localhost:3000/api/post/", fd, {
          headers: {
            "content-type": "application/json",
            authorization: "bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-title {
    margin-top: 10px;
  }
}

.publish {
  width: 50%;
  box-shadow: 3px 3px 10px rgb(151, 150, 150);
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  &-explain {
    width: 60%;
    height: 50px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: none;
    color: #7b7782;
    padding-left: 10px;
    background-color: #f0f2f5;
    &--separator {
      margin-bottom: 10px;
      background-color: white;
      width: 100%;
      height: 2px;
    }
  }
}

.post {
  display: flex;
  justify-content: space-around;
  &-add {
    color: #fd2d01;
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 1.1rem;
    &--publish {
      background-color: white;
      color: #fd2d01;
      padding: 5px;
      margin-top: 5px;
    }
  }
}

.file {
  font-size: 1.3rem;
}

.background {
  background-color: rgb(218, 218, 218);
}

@media all and (max-width: 768px) {
  .publish {
    width: 90%;
  }
}
</style>