<template>
  <div
    class="commentaire"
    v-for="commentaire in commentaires"
    :key="commentaire.id"
  >
    <div class="image">
      <img
        class="img-profil"
        :src="commentaire.User.image || AnonymousUser"
        width="50"
        height="50"
      />
      <div class="content">
        <div class="flex">
          <p class="flex-pseudo">{{ commentaire.User.pseudo }}</p>
          <p class="flex-pseudo-date">
            le {{ $filters.formatDate(commentaire.createdAt) }}
          </p>
        </div>
        <div class="comment">
          <p class="comment-content">
            {{ commentaire.content }}
          </p>
        </div>
      </div>
      <div class="icon">
        <i
          class="far fa-trash-alt icon-delete"
          @click="deleteCommentaire(commentaire.id)"
          v-if="commentaire.userId == userId || isAdmin == 'true'"
        ></i>
        <ModifyCommentaire
          :commentaire="commentaires.find((p) => p.id === modalCommentaireId)"
          :revele="revele"
          :viewModale="viewModale"
          v-if="modalCommentaireId"
        />
        <i
          class="fas fa-edit icon-delete--update"
          @click="viewModale(commentaire)"
          v-if="commentaire.userId == userId"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import ModifyCommentaire from "../components/ModifyCommentaire.vue";
import axios from "axios";
import AnonymousUser from "../assets/photo-avatar-profil.png";
export default {
  name: "LookCommentaire",
  components: {
    ModifyCommentaire,
  },
  props: ["postId", "commentaires"],
  data() {
    return {
      AnonymousUser,
      image: localStorage.getItem("imageProfil"),
      modalCommentaireId: null,
      isAdmin: localStorage.getItem("isAdmin"),
      userId: localStorage.getItem("userId"),
      revele: false,
    };
  },
  beforeMount() {},
  methods: {
    viewModale(commentaire = null) {
      this.revele = !this.revele;
      if (this.revele === false) {
        this.modalCommentaireId = null;
      }
      if (commentaire !== null) {
        this.modalCommentaireId = commentaire.id;
      }
    },
    deleteCommentaire(id) {
      axios
        .delete("http://localhost:3000/api/commentaires/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Votre Commentaire a bien été supprimé");
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
    modifyCommentaire(id) {
      this.modalCommentaireId = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  margin-top: 10px;
  margin-left: 20px;
  &-delete {
    font-size: 1.2rem;
    color: red;
    background-color: #ffd7d7;
    padding: 5px;
    border-radius: 5px;
    margin-right: 5px;
    &--update {
      font-size: 1.2rem;
      color: rgb(43, 43, 241);
      background-color: #c3dcec;
      padding: 5px;
      border-radius: 5px;
    }
  }
}

.flex {
  display: flex;
  margin-top: 10px;
  margin-bottom: -18px;
  &-pseudo {
    margin-right: 5px;
    font-style: italic;
    color: rgb(43, 43, 241);
    &-date {
      font-style: italic;
    }
  }
}

.content{
  margin-left: 5px;
}

.image {
  display: flex;
}

.img-profil {
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 5px;
  object-fit: cover;
}
</style>