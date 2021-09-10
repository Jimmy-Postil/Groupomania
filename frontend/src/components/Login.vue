<template>
  <div class="login">
    <h2 class="login-title">Bienvenue sur Groupomania</h2>
    <h3 class="login-title--login">Connectez-vous</h3>
    <p v-if="errors.length">
    <b>Veuillez corriger les erreurs suivantes:</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    <input
      type="text"
      placeholder="Adresse e-mail"
      required
      v-model="email"
      @change="checkForm($event)"
    />
    <input
      type="password"
      placeholder="Mot de passe"
      required
      v-model="password"
      @change="checkForm($event)"
    />
    <input
      type="button"
      class="login-title--login_connected"
      value="Se connecter"
      v-on:click="userLogin"
    />
    <p class="login-title--login_connected__noaccount">
      Pas de compte?
      <router-link to="/" class="login-title--login_connected__noaccount__link"
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
      errors: [],
      email: "",
      password: "",
    };
  },
  methods: {
    checkForm(event) {
      this.errors = [];

      if (!this.email) {
        this.errors.push("Veuillez rentrer votre adresse email");
      }

      if (!this.password) {
        this.errors.push("Veuillez rentrer votre mot de passe");
      }

      if (!this.errors.length) {
        return true;
      }

      event.preventDefault();
    },
    userLogin() {
      let dataLogin = JSON.stringify({
        email: this.email,
        password: this.password,
      });
      const router = this.$router;
      async function sendLogin(dataLogin) {
        try {
          let response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: dataLogin,
          });
          //Enregistrement dans le localStorage
          if (response.ok) {
            let responseData = await response.json();
            localStorage.setItem("userId", responseData.userId);
            localStorage.setItem("email", responseData.email);
            localStorage.setItem("pseudo", responseData.pseudo);
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