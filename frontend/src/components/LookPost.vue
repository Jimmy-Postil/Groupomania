<template>
  <div class="article">
    <div class="content" v-for="post in posts" :key="post.userId">
      <div class="headerPost">
        <div class="post">
          <img
            class="img-profil"
            :src="post.User.image || AnonymousUser"
            width="100"
          />
          <div class="column">
            <p class="post-pseudo">{{ post.User.pseudo }}</p>
            <p class="post-pseudo--create">
              {{ $filters.formatDate(post.createdAt) }}
            </p>
          </div>
        </div>

        <div class="icon">
          <i
            class="far fa-trash-alt icon-delete"
            @click="deletePost(post.id)"
            v-if="post.userId == userId || isAdmin == 'true'"
          ></i>
          <ModifyPost
            :post="posts.find((p) => p.id === modalPostId)"
            :revele="revele"
            :viewModale="viewModale"
            v-if="modalPostId"
          />
          <i
            class="fas fa-edit icon-delete--update"
            @click="viewModale(post)"
            v-if="post.userId == userId"
          ></i>
        </div>
      </div>
      <p class="description">{{ post.content }}</p>
      <div class="img">
        <img :src="post.image" img-alt="Image du post" class="img-post" />
      </div>
      <LookCommentaire
        :postId="post.id"
        :commentaires="filterComment(post.id)"
      />
      <CreateCommentaire
        :createComment="createComment(post.id)"
        :postId="post.id"
      />
    </div>
  </div>
</template>
<script>
import ModifyPost from "../components/ModifyPost.vue";
import CreateCommentaire from "../components/CreateCommentaire.vue";
import LookCommentaire from "../components/LookCommentaire.vue";
import AnonymousUser from "../assets/photo-avatar-profil.png";
import axios from "axios";
export default {
  name: "LookPost",
  components: {
    ModifyPost,
    CreateCommentaire,
    LookCommentaire,
  },
  data() {
    return {
      AnonymousUser,
      image: localStorage.getItem("imageProfil"),
      modalPostId: null,
      posts: [],
      commentaires: [],
      isAdmin: localStorage.getItem("isAdmin"),
      userId: localStorage.getItem("userId"),
      revele: false,
    };
  },
  beforeMount() {
    axios
      .get("http://localhost:3000/api/post/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;
        const posts = data.posts;
        this.posts = posts;
      })
      .catch((error) => console.log({ error }));
    axios
      .get("http://localhost:3000/api/commentaires/", {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
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
    viewModale(post = null) {
      this.revele = !this.revele;
      if (this.revele === false) {
        this.modalPostId = null;
      }
      if (post !== null) {
        this.modalPostId = post.id;
      }
    },
    createComment(id) {
      axios
        .get("http://localhost:3000/api/post/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          sessionStorage.setItem("postId", parseInt(response.data.id));
        })
        .catch((error) => console.log(error));
    },
    filterComment(postId) {
      return this.commentaires.filter(
        (commentaire) => commentaire.PostId === postId
      );
    },
    deletePost(id) {
      axios
        .delete("http://localhost:3000/api/post/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Votre post a bien été supprimé");
          document.location.reload();
        })
        .catch((error) => console.log(error));
    },
    modifyPost(id) {
      this.modalPostId = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
.content {
  width: 50%;
  box-shadow: 3px 3px 10px rgb(151, 150, 150);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  background-color: white;
}

.headerPost {
  display: flex;
  justify-content: space-between;
}

.column{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  margin-top: 20px;
}
.post {
  display: flex;
  margin-bottom: 20px;
  &-pseudo {
    margin-bottom: 0;
    font-style: italic;
    color: rgb(43, 43, 241);
    &--create {
      font-style: italic;
    }
  }
}

.description {
  font-weight: 600;
  font-size: 1.1rem;
}

.icon {
  font-size: 1.5rem;
  &-delete {
    color: red;
    cursor: pointer;
    &--update {
      margin-left: 5px;
      color: rgb(43, 43, 241);
      cursor: pointer;
    }
  }
}
.img {
  text-align: center;
  &-post {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
}

.img-profil {
  width: 80px;
  height: 80px;
}
@media all and (max-width: 768px) {
  .content {
    width: 90%;
  }
}
</style>>
