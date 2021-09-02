<template>
  <div class="article">
    <div class="content" v-for="post in posts" :key="post.userId">
      <div class="headerPost">
        <div class="post">
          <p class="post-pseudo">{{  }}</p>
          <p class="post-pseudo--create">
            {{ $filters.formatDate(post.createdAt) }}
          </p>
        </div>

        <div class="icon">
          <i
            class="far fa-trash-alt icon-delete"
            @click="deletePost(post.id)"
            v-if="post.userId == userId || isAdmin == isAdmin"
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
      <p>{{ post.content }}</p>
      <div class="img">
        <img :src="post.image" img-alt="Image du post" class="img-post" />
      </div>
      <CreateCommentaire />
      <LookCommentaire />
    </div>
  </div>
</template>
<script>
import ModifyPost from "../components/ModifyPost.vue";
import CreateCommentaire from "../components/CreateCommentaire.vue";
import LookCommentaire from "../components/LookCommentaire.vue";
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
      modalPostId: null,
      posts: [],
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
          authorization: "bearer" + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;
        const posts = data.posts;
        console.log(data);
        console.log(posts);
        this.posts = posts;
      })
      .catch((error) => console.log({ error }));
  },
  createComment(id) {
    axios
      .get("http://localhost:3000/api/post/" + id, {
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
    deletePost(id) {
      axios
        .delete("http://localhost:3000/api/post/" + id, {
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

.post {
  &-pseudo {
    margin-bottom: 0;
  }
}

.icon {
  font-size: 1.5rem;
  display: flex;
  &-delete {
    color: red;
    cursor: pointer;
    &--update {
      margin-left: 5px;
      color: blue;
      cursor: pointer;
    }
  }
}
.img {
  text-align: center;
  &-post {
    width: 100%;
  }
}
@media all and (max-width: 768px) {
  .content {
    width: 90%;
  }
}
</style>>
