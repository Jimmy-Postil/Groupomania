<template>
  <div class="login">
    <h2 class="login-title">Bienvenue sur Groupomania</h2>
    <h3 class="login-title--login">Connectez-vous</h3>
    <input type="text" placeholder="Adresse e-mail" v-model="email" />
    <input type="password" placeholder="Mot de passe" v-model="password" />
    <input
      type="button"
      class="login-title--login_connected"
      value="Se connecter"
      v-on:click="userLogin"
    />
    <p class="login-title--login_connected__noaccount">
      Pas de compte?
      <router-link
        to="/signup"
        class="login-title--login_connected__noaccount__link"
        >Inscrivez-vous</router-link
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    userLogin() {
      let dataLogin = JSON.stringify({
        email: this.email,
        password: this.password,
      });
      const router = this.$router;
      async function sendLogin(dataSend) {
        try {
          let response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: dataSend,
          });
          if (response.ok) {
            let responseData = await response.json();
            localStorage.setItem("Id", responseData.userId);
            localStorage.setItem("email", responseData.email);
            localStorage.setItem("token", responseData.token);
            localStorage.setItem("isAdmin", responseData.isAdmin);
            router.push({ name: "UserWall" });
          } else {
            console.error("Retour du serveur : " + response.status);
          }
        } catch (error) {
          console.log(error);
        }
      }
      sendLogin(dataLogin);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  box-shadow: 3px 3px 10px rgb(151, 150, 150);
  border-radius: 10px;
  width: 40%;
  &-title {
    width: 100%;
    &--login {
      margin-top: 0;
      &_connected {
        background-color: rgba(253, 41, 0, 255);
        color: white;
        font-size: 1rem;
        &__noaccount {
          margin-top: 8%;
          &__link {
            text-decoration: none;
            color: black;
            font-weight: bold;
          }
        }
      }
    }
  }
}

input {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #e1e1e1;
  &:hover {
    border-color: rgba(253, 41, 0, 255);
    cursor: pointer;
  }
}

@media all and (max-width: 768px) {
  .login {
    width: 80%;
  }
}
</style>