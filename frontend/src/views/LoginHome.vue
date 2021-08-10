<template>
  <div class="home">
    <img
      class="img-groupomania"
      src="../assets/icon-above-font.png"
      alt="logo groupomania"
    />
    <Login />
  </div>
</template>

<script>
import Login from "../components/Login";

export default {
  name: "LoginHome",
  components: {
    Login,
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.img-groupomania {
  width: 30%;
}

@media all and (max-width: 768px) {
  .img-groupomania {
    width: 80%;
  }
}
</style>