<template>
  <v-app>
    <v-container>
      <v-row 
      class="preview"
      justify="center"
      >
        <h1>preview page</h1>
      </v-row>

      <v-row
      class="mb-3 mt-3"
      justify="center"
      > 
        <v-col cols="12" class="text-center">
          <h3>学習</h3>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn @click="readData" rounded>
            現在の登録内容を表示する
          </v-btn>
        </v-col>
        <v-col
        :key="data.StudyRecordID"
        cols="12"
        v-for="data in dataList">
          ID:{{ data.StudyRecordID }},Name:{{ data.Name }},Genre:{{ data.Genre }},Progress:{{ data.Progress }}
        </v-col>
      </v-row>


      <v-row>
        <v-col cols="12" class="text-center">
          <h3>資格</h3>
        </v-col>
      </v-row>


      
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      StudyRecordId: '', // 初期値を設定
      Name: '',
      Genre: '',
      Progress: '',
      dataList: [] // データ表示用配列
    };
  },
  created() {
    this.readData(); // 必要なメソッドを呼び出す
  },
  methods: {
    async readData() {
      try {
        const response = await axios.get('https://m3h-matsumoto-functionapiapp2.azurewebsites.net/api/SELECTALLSR');
        console.log(response.data);
        this.dataList = response.data.List;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>


<style>
  h1{
    margin: 30px;
  }
</style>