<template>
  <div id="app">
    <v-app>
      <v-app-bar app>
        <v-row
          align="center"
          no-gutters
          class="w-100"
        >
          <v-col cols="auto">
            <v-toolbar-title>学習履歴アプリ</v-toolbar-title>
          </v-col>

          <v-spacer></v-spacer>
          <v-col cols="auto">
            <!-- <router-link to="/">Home</router-link> -->
          <v-btn to="/">
            Home
          </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-main>
        <v-container class="content-container">
          <router-view/>
        </v-container>
      </v-main>
      
      <v-footer app >
        <v-col class="text-center">フッター</v-col>
      </v-footer>
    </v-app>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* nav  {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */

 /* ヘッダーとフッターの高さを調整 */
.v-app-bar {
  height: 64px; /* Vuetify のデフォルトヘッダー高さ */
}

.v-footer {
  height: 56px; /* Vuetify のデフォルトフッター高さ */
}

.content-container {
  /* margin-top: 64px; ヘッダーの高さと一致させる */
  margin-bottom: 70px; 
}
</style>
