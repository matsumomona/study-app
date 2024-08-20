<template>
  <div class="helloWorld">
    <h1>{{ msg }}</h1>    
    <v-img
      :aspect-ratio="16/9"
      src="https://cdn.pixabay.com/photo/2024/05/06/06/43/office-8742641_1280.png"
    ></v-img>

    <h3>学習履歴</h3>
    <v-btn
      @click="goToPreview"
      class="btn"
      depressed
      elevation="2"
      large
      color="#DCBB64"
      dark
    >CLICK</v-btn>

    <h3>資格</h3>
    <v-btn
      @click="goToEdit"
      class="btn"
      depressed
      elevation="2"
      large
      color="#DCBB64"
      dark
    >CLICK</v-btn>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    goToPreview() {
      this.$router.push('/preview'); // Previewページに遷移
    },
    goToEdit() {
      this.$router.push('/edit'); // Editページに遷移
    }
  }
}
</script>

<style scoped>
v-img {
  max-width: 100%; 
  height: auto; 
}
h1{
  margin: 40px 0;
  color: #2c3e50 !important;
  font-family: "Slackside One", cursive;
}
h3 {
  margin: 40px 0 0;
  font-family: "Zen Maru Gothic", serif;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.btn{
  font-family: "Zen Maru Gothic", serif;
}
</style>
