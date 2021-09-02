<template>
  <div class="content">
    <div class="user">
      <h2>Bonjour {{ user.pseudo }}</h2>
      <h3>Voici les informations concernant votre compte</h3>
      <h4>pseudo: {{ user.pseudo }}</h4>
      <input
        type="text"
        placeholder="Changer de pseudo"
        v-model="user.pseudo"
      />
      <h4>email: {{ user.email }}</h4>
      <input type="text" placeholder="Changer d'email" v-model="user.email" />
      <h4>
        Création de votre compte le {{ $filters.formatDate(user.createdAt) }}
      </h4>
      <div class="button">
        <button
          type="submit"
          class="button-delete"
          @click="deleteUser(user.id)"
        >
          Supprimer le compte
        </button>
        <button @click="logout()">Déconnexion</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      user: "",
      password: localStorage.getItem("token"),
      isAdmin: "",
    };
  },
  beforeMount() {
    const Admin = localStorage.getItem("isAdmin");
    this.isAdmin = Admin;
    this.newUser();
  },
  methods: {
    newUser() {
      const id = localStorage.getItem("userId");
      axios
        .get("http://localhost:3000/api/auth/" + id, {
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer" + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          const data = res.data;
          this.user = data;
          console.log(data);
        })
        .catch((error) => console.log({ error }));
    },
    deleteUser(id) {
      const token = localStorage.getItem("usertoken");
      const router = this.$router;
      axios
        .delete("http://localhost:3000/api/auth/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert("Attention cet action est irréversible");
          router.push({ name: "Signup" });
        })
        .catch((error) => console.log(error));
    },
    logout() {
      localStorage.clear();
      const router = this.$router;
      router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  width: 50%;
  text-align: center;
  box-shadow: 3px 3px 10px rgb(151, 150, 150);
  border-radius: 10px;
  margin-top: 10px;
  padding: 20px;
}

.content {
  display: flex;
  justify-content: center;
}

input {
  margin-bottom: 10px;
}
.button {
  display: flex;
  justify-content: space-evenly;
}
button {
  color: #fd2d01;
}

@media all and (max-width: 642px) {
  .button {
    flex-wrap: wrap-reverse;
    &-delete {
      margin-top: 5px;
    }
  }
input{
  width: 50%;
}
}
</style>