<template>
  <v-app>
    <v-container>
      <v-row 
      class="preview"
      justify="center"
      >
        <h1>study records page</h1>
      </v-row>

      <v-row
      class="mb-3 mt-3"
      justify="center"
      > 
        <v-col cols="12" class="text-center">
          <h3>学習</h3>
        </v-col>
        
        <v-data-table
        :headers="headers1"
        :items="items1"
        item-key="study_record_id"
        class="custom_table table1 elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.study_record_id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.genre }}</td>
            <td>{{ props.item.progress }}</td>
          </template>

          <!-- <template v-slot:[`column.custom`]="{ item }">
            <v-btn @click="deleteItem(item.id)">
              削除
            </v-btn>
            <v-icon
              small
              @click="deleteItem(item.id)"
              class="mr-2"
            >
              mdi-delete
            </v-icon>
          </template> -->

          <!-- <template v-slot:item.actions="{ item }">
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template> -->

          <!-- <template v-slot:item="{ item }">
            <v-icon
              small
              @click="deleteItem(item.study_record_id)" 
            >
              mdi-delete
            </v-icon>
          </template> -->



        </v-data-table>
      </v-row>

      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#DCBB64"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-pencil-plus</v-icon>
              新規追加
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Study Record</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="study_record_id"
                      label="ID"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="name"
                      label="コンテンツタイトル"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-select
                      v-model="genre"
                      :items="['Progate', 'Udemy', 'Language', 'Others']"
                      label="ジャンル"
                      required
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="progress"
                      label="進捗"
                      type="number"
                      min="0"
                      max="100"
                      hint="0~100の数字で入力してください"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="addData1"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row justify="center">
        <v-btn color="#DCBB64" @click="readData1" dark>
          <v-icon>mdi-update</v-icon>
          データを更新
        </v-btn>
      </v-row>

      <v-snackbar v-model="snackbar" :timeout="2000" centered tile>
          データを追加しました
          <v-btn color="#DCBB64" text @click="snackbar = false">
              Close
          </v-btn>
      </v-snackbar> 
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      snackbar: false,
      items1: [], // データ表示用配列
      headers1: [
        { text: 'ID', value: 'study_record_id' },
        { text: 'コンテンツタイトル', value: 'name' },
        { text: 'ジャンル', value: 'genre' },
        { text: '進捗', value: 'progress' },
        { text: '', value: 'actions' } // ごみ箱アイコン用の列
      ],
      study_record_id: '',
      name: '',
      genre: '',
      progress: ''
    };
  },
  created() {
    this.readData1(); // 必要なメソッドを呼び出す
  },
  methods: {
    async readData1() {
      try {
        const response = await axios.get('https://m3h-matsumoto-functionapiapp2.azurewebsites.net/api/SELECTALLSR');
        if (response.data && response.data.List) {
          this.items1 = response.data.List;
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    // DBにデータを追加する関数
    addData1: async function() {
      //IDの入力チェック（空白か数字以外なら終了）
      if(!this.study_record_id || isNaN(this.study_record_id)){
          console.log("IDに数値が入力されていません");
          return;
      }
      //POSTメソッドで送るパラメーターを作成
      const param = {
          study_record_id : this.study_record_id,
          name : this.name,
          genre : this.genre,
          progress : this.progress
      }
       //INSERT用のAPIを呼び出し
      const response = await axios.post('https://m3h-matsumoto-functionapiapp2.azurewebsites.net/api/INSERTSR',param);    
      //結果をコンソールに出力
      console.log(response.data);

      try {
            await axios.post('https://m3h-matsumoto-functionapiapp2.azurewebsites.net/api/INSERTSR', param);
            this.snackbar = true; // Snackbarを表示
            await this.readData1(); // データを再取得
            this.dialog = false; // ダイアログを閉じる
        } catch (error) {
            console.error('データ追加中にエラーが発生しました:', error);
        }
    },
    deleteItem(id) {
      const index = this.items.findIndex(item => item.id === id);
      if (index !== -1) {
        this.items.splice(index, 1); // 該当のアイテムを削除
      }
      
    },
    // async updateData() {
    //   try {
    //     // ここでAPIを呼び出してデータを取得
    //     const response = await axios.get('/api/data-endpoint');
    //     // 取得したデータをitemsに格納
    //     this.items = response.data;
    //   } catch (error) {
    //     console.error('データの更新中にエラーが発生しました:', error);
    //   }
    // }
  }
}
</script>


<style scoped>
  h1{
    margin: 30px;
  }
  .custom_table{
    max-width: 600px
  }
  /* .v-data-footer {
  display: none;
  } */
  .v-btn{
    margin: 20px 0 !important;
  }
</style>