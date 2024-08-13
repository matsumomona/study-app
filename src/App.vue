<template>
  <div id="app">
    <v-app>
      <v-app-bar 
      app
      class="custom-app-bar">
        <v-row
          align="center"
          no-gutters
          class="w-100"
        >
          <v-col cols="auto">
            <v-toolbar-title class="custom-toolbar-title">StudyApp</v-toolbar-title>
          </v-col>

          <v-spacer></v-spacer>
          <v-col cols="auto">
            <!-- <router-link to="/"><v-icon>mdi-home</v-icon></router-link> -->
            <v-btn to="/">
              HOME<!-- <v-icon>mdi-home</v-icon> -->
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-main>
        <v-container class="content-container">
          <router-view/>
        </v-container>
      </v-main>
      
      <v-footer 
      app
      >
        <v-col class="text-center"></v-col>
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

.custom-app-bar {
  height: 64px; /* Vuetify のデフォルトヘッダー高さ */
  color: bisque;
}
.custom-toolbar-title{
  font-weight: bold;
  color: #2c3e50
}
.v-footer {
  height: 56px; /* Vuetify のデフォルトフッター高さ */
}

.content-container {
  /* margin-top: 64px; ヘッダーの高さと一致させる */
  margin-bottom: 70px; 
}
</style>
