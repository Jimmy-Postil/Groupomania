<template>
  <div class="article">
    <div class="content" v-for="post in posts" :key="post.id">
      <div class="headerPost">
        <div class="post">
          <p class="post-pseudo">Pseudo</p>
          <p class="post-pseudo--create">
            {{ $filters.formatDate(post.createdAt) }}
          </p>
        </div>
        <div class="icon">
          <i
            class="far fa-trash-alt icon-delete"
            @click="deletePost(post.id)"
          ></i>
          <ModifyPost :revele="revele" :toggleModale="toggleModale" />
          <div>
            <i
              class="fas fa-edit"
              @click="toggleModale"
              :modifyPost="modifyPost(post.id)"
            ></i>
          </div>
        </div>
      </div>
      <p>{{ post.content }}</p>
      <div class="img">
        <img :src="post.image" img-alt="Image du post" class="img-post" />
      </div>
    </div>
  </div>
</template>
<script>
import ModifyPost from "../components/ModifyPost.vue";
import axios from "axios";
export default {
  name: "LookPost",
  components: {
    ModifyPost,
  },
  data() {
    return {
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
  methods: {
    toggleModale() {
      this.revele = !this.revele;
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
}

.headerPost {
  display: flex;
  justify-content: space-around;
}

.post {
  margin-left: 15px;
  &-pseudo {
    margin-bottom: 0;
  }
}

.icon {
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  &-delete {
    color: red;
    &--update {
      color: blue;
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
