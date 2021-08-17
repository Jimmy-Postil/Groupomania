<template>
  <div class="home">
    <div class="header">
      <img
        class="img-groupomania"
        src="../assets/icon-left-font.png"
        alt="logo Groupomania"
      />
      <h3 class="header-profil">Profil</h3>
    </div>
    <div class="separator"></div>
    <Post />
  </div>
</template>

<script>
import Post from "../components/Post";

export default {
  name: "UserWall",
  components: {
    Post,
  },
};
</script>

<style lang="scss" scoped>

.img-groupomania {
  width: 20%;
  margin-top: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  &-profil {
    margin-top: 30px;
    margin-right: 20px;
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
