<template>
<div class="img">
  <img
    class="img-groupomania"
    src="../assets/icon-above-font.png"
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
.img{
  text-align: center;
&-groupomania {
  width: 20%;
  margin-top: 10px;
  margin-left: 20px;
}
}
</style>>
