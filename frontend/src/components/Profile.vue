<template>
  <h2>Bonjour {{ pseudo }}</h2>
  <h3>Voici les informations concernant votre compte</h3>
  <h4>pseudo: {{ pseudo }}</h4>
  <input type="text" placeholder="Changer de pseudo" v-model="pseudo" />
  <h4 @click="newUser">email: {{ email }}</h4>
  <input type="text" placeholder="Changer d'email" v-model="email" />
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      pseudo: localStorage.getItem("pseudo"),
      email: localStorage.getItem("email"),
      password: localStorage.getItem("token"),
      isAdmin: "",
    };
  },
  methods: {
    beforeMount() {
      const Admin = localStorage.getItem("isAdmin");
      this.isAdmin = Admin;
      this.newUser();
    },
    newUser() {
      const id = parseInt(localStorage.getItem("userId"));
      axios
        .get("http://localhost:3000/api/auth/", id, {
          method: "GET",
          headers: {
            authorization: "bearer" + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          const data = res.data;
          this.users = data;
          console.log(data);
        })
        .catch((error) => console.log({ error }));
    },
  },
};
</script>

<style>
</style>