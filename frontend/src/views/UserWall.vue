<template>
    <header>
        <div class="container">
            <div class="row">
                <nav class="col navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand" href=""><img class="img-groupomania" src="../assets/icon-left-font.png"
                            alt="Logo Groupomania"></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarContent" class="collapse navbar-collapse">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link text-primary" href="index.html">Accueil</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href=""><i
                                        class=""></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    <Post />
</template>

<script>
import Post from "../components/Post";

export default {
  name: "UserWall",
  components: {
    Post,
  },
};
</script>

<style lang="scss" scoped>

.img-groupomania{
  width: 80%;
}
</style>
