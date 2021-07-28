<template>
  <div class="home">
    <img
      class="img-groupomania"
      src="../assets/icon-above-font.png"
      alt="logo groupomania"
    />
    <div class="login">
      <h2>Bienvenue sur Groupomania</h2>
      <h3>Inscrivez-vous</h3>
      <input type="text" placeholder="Pseudo" />
      <input type="text" placeholder="Adresse e-mail" />
      <input type="password" placeholder="Mot de passe" />
      <input type="button" class="connected" value="Se connecter" />
      <p>
        Vous avez déjà un compte?
        <router-link to="/login" class="link">Connectez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
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
  background-color: #e4e4e4;
  box-shadow: 1px 1px 10px rgb(151, 150, 150);
  border-radius: 10px;
  width: 40%;
}

.login h3 {
  margin: 0;
}

.login p {
  margin-top: 8%;
}

.login h2 {
  width: 100%;
}

input {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
}

input:hover {
  border-color: blue;
  cursor: pointer;
}

.connected {
  background-color: blue;
  color: white;
  font-size: 1rem;
}

.link {
  text-decoration: none;
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
