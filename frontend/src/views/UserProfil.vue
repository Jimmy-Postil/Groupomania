<template>
  <div class="img">
    <img
      class="img-groupomania"
      src="../assets/icon-left-font.png"
      alt="logo groupomania"
    />
  </div>
  <Profile />
</template>

<script>
import Profile from "../components/Profile.vue";

export default {
  name: "UserProfil",
  components: {
    Profile,
  },
};
</script>
<style lang="scss" scoped>
.img {
  text-align: center;
  &-groupomania {
    width: 20%;
    margin-top: 10px;
  }
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
