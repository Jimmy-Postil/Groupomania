<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="viewModale"></div>

    <div class="modale card">
      <div v-on:click="viewModale" class="btn-modale btn btn-danger">X</div>
      <h2 class="title">Modifier votre post</h2>
      <div class="content">
        <input
          class="title-content"
          type="textarea"
          v-model="content"
          placeholder="Modifier le message"
        />
      </div>
      <div class="flex">
        <input
          type="file"
          class="title-content-image"
          @change="onFileSelected"
        />
        <button
          class="title-content-image-publish"
          type="submit"
          @click="modifyPost()"
        >
          Modifier
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ModifyPost",
  props: ["revele", "viewModale", "post"],
  data() {
    return {
      content: "",
      selectedFile: null,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },
    modifyPost() {
      const fd = new FormData();
      fd.append("userId", this.post.userId);
      fd.append("postId", this.post.id);
      fd.append("content", this.content);
      fd.append("image", this.selectedFile, this.selectedFile.name);
      axios
        .put("http://localhost:3000/api/post/" + this.post.id, fd, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Votre Post à bien été modifié");
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}
//fenêtre Modale
.content {
  text-align: center;
}

.flex {
  display: flex;
  width: 100%;
}
.title {
  color: #fd2d01;
  text-align: center;
  &-content {
    width: 80%;
    margin-bottom: 20px;
    font-size: 1.2rem;
    &-image {
      font-size: 1.2rem;
      color: #fd2d01;
      &-publish {
        font-size: 1.2rem;
        color: #fd2d01;
      }
    }
  }
}
</style>