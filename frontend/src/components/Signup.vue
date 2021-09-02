<template>
  <div class="login">
    <h2 class="login-title">Bienvenue sur Groupomania</h2>
    <h3 class="login-title--signup">Inscrivez-vous</h3>
    <input type="text" placeholder="Pseudo" v-model="pseudo" />
    <input type="text" placeholder="Adresse e-mail" v-model="email" />
    <input type="password" placeholder="Mot de passe" v-model="password" />
    <input
      type="submit"
      class="login-title--signup_connected"
      value="Inscription"
      @click="signupUser"
    />
    <p class="login-title--signup_connected__account">
      Vous avez déjà un compte?
      <router-link
        to="/login"
        class="login-title--signup_connected__account__link"
        >Connectez-vous</router-link
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      pseudo: "",
      password: "",
    };
  },
  methods: {
    signupUser() {
      let dataSignup = JSON.stringify({
        email: this.email,
        pseudo: this.pseudo,
        password: this.password,
      });
      const router = this.$router;
      async function signup(dataSignup) {
        try {
          let response = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: dataSignup,
          });
          if (response.ok) {
            let responseId = await response.json();
            console.log(responseId);
            router.push({ name: "Login" });
          } else {
            console.error("Retour du serveur : " + response.status);
          }
        } catch (error) {
          console.log(error);
        }
      }
      signup(dataSignup);
    },
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
.login {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 350px;
  padding: 20px;
  background-color: white;
  box-shadow: 3px 3px 10px rgb(151, 150, 150);
  border-radius: 10px;
  width: 40%;
  &-title {
    width: 100%;
    &--signup {
      margin-top: 0;
      &_connected {
        background-color: rgba(253, 41, 0, 255);
        color: white;
        font-size: 1rem;
        &__account {
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
  .img-groupomania {
    width: 80%;
  }

  .login {
    width: 80%;
  }
}
</style>
