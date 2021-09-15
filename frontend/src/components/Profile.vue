<template>
  <div class="content">
    <div class="user">
      <input id="fileUpload" type="file" hidden @change="onFileSelected" />
      <img
        class="img-profil"
        :src="user.image || AnonymousUser"
        @click="chooseFiles()"
      />
      <h2>Bonjour {{ user.pseudo }}</h2>
      <h3>Voici les informations concernant votre compte</h3>
      <h4>email: {{ user.email }}</h4>
      <h4>pseudo: {{ user.pseudo }}</h4>
      <div class="flex-column">
        <div class="flex-row">
          <input
            type="text"
            placeholder="Changer de pseudo"
            v-model="user.pseudo"
          />
          <button type="submit" class="change" @click="updatePseudo(user.id)">
            Changer
          </button>
        </div>
        <div class="flex-row">
          <input
            type="password"
            placeholder="Changer votre mot de passe"
            v-model="password"
          />
          <button type="submit" class="change" @click="updatePassword(user.id)">
            Changer
          </button>
        </div>
      </div>
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
import AnonymousUser from "../assets/photo-avatar-profil.png";
export default {
  name: "Profile",
  data() {
    return {
      user: "",
      password: "",
      isAdmin: "",
      selectedFile: null,
      AnonymousUser,
    };
  },
  beforeMount() {
    const Admin = localStorage.getItem("isAdmin");
    this.isAdmin = Admin;
    this.findUser();
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      const id = localStorage.getItem("userId");
      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      axios
        .put("http://localhost:3000/api/auth/" + id + "/set-image", fd, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.user.image = response.data.image;
          localStorage.setItem("imageProfil", response.data.image);
        })
        .catch((error) => console.log(error));
    },
    chooseFiles() {
      document.getElementById("fileUpload").click();
    },
    findUser() {
      const id = localStorage.getItem("userId");
      axios
        .get("http://localhost:3000/api/auth/" + id, {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
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
      const router = this.$router;
      axios
        .delete("http://localhost:3000/api/auth/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Attention cet action est irréversible");
          router.push({ name: "Signup" });
        })
        .catch((error) => console.log(error));
    },
    updatePseudo(id) {
      axios
        .put(
          "http://localhost:3000/api/auth/" + id,
          { pseudo: this.user.pseudo },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          alert("Pseudo modifié");
        })
        .catch((error) => console.log(error));
    },
    updatePassword(id) {
      axios
        .put(
          "http://localhost:3000/api/auth/" + id + "/set-password",
          { password: this.password },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          alert("Mot de passe modifié");
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
  width: 40%;
}
.button {
  display: flex;
  justify-content: space-evenly;
}
button {
  color: #fd2d01;
}

.change {
  margin-left: 3px;
}

.img-profil {
  border-radius: 50%;
  width: 225px;
  height: 225px;
}

.flex-column{
  display: flex;
  flex-direction: column;
}

@media all and (max-width: 642px) {
  .button {
    flex-wrap: wrap-reverse;
    &-delete {
      margin-top: 5px;
    }
  }
  input {
    width: 50%;
  }
  .change {
    margin-left: 0;
  }
}

@media all and (max-width: 542px){
  .img-profil{
    width: 150px;
    height: 150px;
  }
    input{
    width: 80%;
  }
  input::placeholder{
    font-size: 0.7rem;
  }
  button{
    margin-bottom: 10px;
    width: 80%;
  }
}

@media all and (max-width: 388px){
  .img-profil{
    width: 100px;
    height: 100px;
  }
}
</style>