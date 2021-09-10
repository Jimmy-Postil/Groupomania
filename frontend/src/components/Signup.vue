<template>
  <div class="login">
    <h2 class="login-title">Bienvenue sur Groupomania</h2>
    <h3 class="login-title--signup">Inscrivez-vous</h3>
    <p v-if="errors.length">
    <b>Veuillez corriger les erreurs suivantes:</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    <input type="text" placeholder="Pseudo" required v-model="pseudo" @change="checkForm"/>
    <input
      type="text"
      placeholder="Adresse e-mail"
      required
      v-model="email"
      @change="checkForm($event)"
      id="email"
    />
    <input
      type="password"
      placeholder="Mot de passe"
      required
      v-model="password"
       @change="checkForm($event)"
      id="password"
    />
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
      errors: [],
      pseudo: "",
      email: null,
      password: null,
    };
  },
  methods: {
    checkForm(event) {
      this.errors = [];

      if (!this.email) {
        this.errors.push("Email manquant");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Veuillez rentrer un email valide");
      }

      if (!this.password) {
        this.errors.push("Mot de passe manquant");
      } else if (!this.validPassword(this.password)) {
        this.errors.push("Votre mot de passe doit contenir au minimum 8 caractères avec au moins une minuscule, une majuscule, un chiffre et un caractère spécial.");
      }

      if (!this.errors.length) {
        return true;
      }

      event.preventDefault();
    },
    validEmail(email) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },
    validPassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?-_]){8,}/;
      return regex.test(password);
    },
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
