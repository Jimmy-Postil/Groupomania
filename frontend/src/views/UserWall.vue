<template>
  <div class="home">
    <div class="header">
      <img
        class="img-groupomania"
        src="../assets/icon-left-font.png"
        alt="logo Groupomania"
      />
      <h3 v-on:click="OpenProfil">Profil</h3>
    </div>
    <div class="separator"></div>
    <CreatePost />
  </div>
</template>

<script>
import CreatePost from "../components/CreatePost";

export default {
  name: "UserWall",
  components: {
    CreatePost,
  },
  methods: {
    OpenProfil() {
      const router = this.$router;
      router.push({ name: "UserProfil" });
    },
  },
};
</script>

<style lang="scss" scoped>
.img-groupomania {
  width: 20%;
  margin-top: 10px;
  margin-left: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  &-profil {
    margin-top: 30px;
    margin-right: 20px;
    color: black;
    text-decoration: none;
  }
}
.separator {
  border: 1px solid grey;
  margin-top: 20px;
}

@media all and (max-width: 768px) {
  .img-groupomania {
    width: 50%;
  }
}

@media all and (max-width: 450px) {
  .img-groupomania {
    width: 60%;
  }
}
</style>
