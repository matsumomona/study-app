<template>
  <v-app>
    <v-container>
      
      <v-row 
      class="preview"
      justify="center"
      >
        <h1>学習履歴</h1>        
      </v-row>
      <v-row 
      class="preview"
      justify="center"
      >
      <h5>学習したコンテンツを記録しましょう</h5>
      </v-row>

      <v-row
      class="mb-3 mt-3"
      justify="center"
      > 
        <v-data-table
        :headers="headers1"
        :items="items1"
        item-key="study_record_id"
        class="custom_table table1 elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon 
              small 
              class="mr-2" 
              @click="showDeleteDialog(item.study_record_id)"
            >
              mdi-delete
            </v-icon>
          </template>
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
              <span class="card-title-text">新規追加</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model=nextId
                      label="ID"
                      type="number"
                      required
                      readonly
                      class="id-text-field"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    class="card-text-cols"
                  >
                    <v-text-field
                      v-model="name"
                      label="コンテンツタイトル"
                      required
                      class="custom-text-field"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    class="card-text-cols"
                  >
                    <v-select
                      v-model="genre"
                      :items="['Progate', 'Udemy', 'Language', 'Others']"
                      label="ジャンル"
                      required
                      class="custom-text-field"
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    class="card-text-cols slider-cols"
                  >
                    <v-slider
                      v-model="progress"
                      color="orange"
                      label="進捗(%)"
                      min="1"
                      max="100"
                      thumb-label
                    ></v-slider>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="#DCBB64"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="#DCBB64"
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
        <v-btn 
          color="#DCBB64"  
          @click="readData1" 
          dark
        >
          <v-icon>mdi-update</v-icon>
          データを更新
        </v-btn>
      </v-row>

      <v-snackbar 
        v-model="snackbar" 
        top
      >
        データを追加しました
        <v-card-actions class="pa-0">
            <v-btn 
              color="#DCBB64" 
              text 
              @click="snackbar = false"
            >
              Close
            </v-btn>
        </v-card-actions>
      </v-snackbar>

      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card dark>
            <v-card-title class="delete-title-text">本当に削除して良いですか?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#DCBB64" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="#DCBB64" text @click="deleteItem1">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
      nextId: null,
      dialogDelete: false, 
      idToDelete: null, 
      items1: [], 
      headers1: [
        // { text: 'ID', value: 'study_record_id' },
        { text: 'コンテンツタイトル', value: 'name', sortable: false },
        { text: 'ジャンル', value: 'genre', sortable: false },
        { text: '進捗(%)', value: 'progress', sortable: false },
        { text: '削除', value: 'actions', sortable: false } // ごみ箱アイコン用の列
      ],
      study_record_id: '',
      name: '',
      genre: '',
      progress: '', 
    };
  },

  created() {
    this.readData1();
  },

  methods: {
    //データ参照  
    async readData1() {
      try {
        const response = await axios.get('https://m3h-matsumoto-functionapiapp2.azurewebsites.net/api/SELECTALLSR');
        if (response.data && response.data.List) {
          this.items1 = response.data.List;

          const ids = this.items1.map(item => Number(item.study_record_id));
          this.nextId = ids.length ? Math.max(...ids) + 1 : 1;

        } else {
          console.error('Unexpected response format:', response.data);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    //データ追加  
    addData1: async function() {
      if(!this.nextId || isNaN(this.nextId)){
          console.log("IDに数値が入力されていません");
          return;
      }
      //POSTメソッドで送るパラメーターを作成
      const param = {
          study_record_id : this.nextId,
          name : this.name,
          genre : this.genre,
          progress : this.progress
      }
      //INSERT用のAPIを呼び出し
      const response = await axios.post('https://m3h-matsumoto-functionapiapp2.azurewebsites.net/api/INSERTSR',param);    
      console.log(response.data);

      //フロントエンドのデータを更新
      try {
            await axios.post('https://m3h-matsumoto-functionapiapp2.azurewebsites.net/api/INSERTSR', param);
            this.snackbar = true;
            await this.readData1(); // データを再取得
            this.dialog = false;
        } catch (error) {
            console.error('データ追加中にエラーが発生しました:', error);
        }
    },

    //データ削除
    showDeleteDialog(item) {
      this.idToDelete = item; // 削除対象アイテムのIDを入れる変数
      this.dialogDelete = true; // ダイアログを表示
      //console.log('ID:', this.idToDelete);
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    async deleteItem1() {
      this.dialogDelete = false; // ダイアログを閉じる
      if (this.idToDelete === null) {
        console.error('削除対象のIDが設定されていません');
        return;
      }

      try {
        const param = {
          study_record_id: this.idToDelete
        }
        //DELETE用のAPI呼び出し
        const response = await axios.post('https://m3h-matsumoto-functionapiapp2.azurewebsites.net/api/DELETESR',param);
        console.log(response.data);

        if (response.status === 200) {
          if (!this.items) {
            this.items = [];
          }
          // フロントエンドのデータ更新
          if (this.items) {
            this.items = this.items.filter(item => item.study_record_id !== this.idToDelete);
            await this.readData1(); // データを再取得
            console.log('アイテムを削除しました:', this.idToDelete);
          } else {
            console.error('itemsがundefinedまたはnullです');
          }
        } 

      } catch (error) {
      console.error('削除中にエラーが発生しました:', error.message, error.stack);
      }      
    }
  }
}  
</script>


<style scoped>
h1{
  margin: 30px;
  font-family: "Zen Maru Gothic", serif;
}
h5{
  margin-bottom: 20px;
  font-family: "Zen Maru Gothic", serif;
}
.custom_table{
  max-width: 600px;
  font-family: "Zen Maru Gothic", serif;
}
/* .v-data-footer {
display: none;
} */
.v-btn{
  margin: 20px 0 !important;
  font-family: "Zen Maru Gothic", serif;
}
.pa-0 {
  justify-content: flex-end !important; /* 右寄せにする */
}
.id-text-field{
  display: none;
}
.card-title-text{
  font-family: "Zen Maru Gothic", serif;
  color: #2c3e50;
}
.card-text-cols{
  padding: 20px 70px;
}
.slider-cols{
  padding-top: 35px;
}
.delete-title-text{
  font-family: "Zen Maru Gothic", serif;
  color: #fff;
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>