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
            <v-btn to="/" color="#DCBB64" dark>
              <v-icon>mdi-home</v-icon>
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
        <v-row justify="center">
          <v-col class="v-footer-text text-center">
            © 2024 Study App Sample. All rights reserved.
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.custom-app-bar {
  height: 64px; 
  color: bisque;
}
.custom-toolbar-title{
  font-weight: bold;
  color: #2c3e50;
  font-family: "Slackside One", cursive;
  font-size: 2rem !important;
  padding-bottom: 15px;
}
.v-footer {
  height: 56px; 
}
.v-footer-text{
  color: #2c3e50 !important;
  font-family: "Slackside One", cursive;
}
.content-container {
  margin-bottom: 70px; 
}
</style>
