<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="viewModale"></div>

    <div class="modale card">
      <div v-on:click="viewModale" class="btn-modale btn btn-danger">X</div>
      <h2 class="title">Modifier votre commentaire</h2>
      <div class="flex">
        <div class="content">
          <input
            class="title-content"
            type="textarea"
            v-model="content"
            placeholder="Modifier le message"
          />
        </div>
        <button
          class="title-content-publish"
          type="submit"
          @click="modifyCommentaire()"
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
  name: "ModifyCommentaire",
  props: ["revele", "viewModale", "commentaire"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    modifyCommentaire() {
      const fd = new FormData();
      fd.append("userId", this.commentaire.UserId);
      fd.append("CommentaireId", this.commentaire.id);
      fd.append("content", this.content);
      axios
        .put(
          "http://localhost:3000/api/commentaires/" + this.commentaire.id,
          fd,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          alert("Votre Commentaire à bien été modifié");
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

.flex {
  display: flex;
  margin-top: 5px;
}

.title {
  color: #fd2d01;
  text-align: center;
  &-content {
    width: 80%;
    margin-bottom: 20px;
    font-size: 1.2rem;
    &-publish {
      font-size: 1.2rem;
      color: #fd2d01;
      height: 35px;
    }
  }
}
</style>