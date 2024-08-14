<template>
    <v-app>
        <v-container>
            <v-row 
            class="preview"
            justify="center"
            >
                <h1>certificate page</h1>
            </v-row>
                
                <v-row
                class="mb-3 mt-3"
                justify="center"
                >
                    <v-col cols="12" class="text-center">
                        <h3>資格</h3>
                    </v-col>

                    <v-data-table
                        :headers="headers2"
                        :items="items2"
                        item-key="certificate_id"
                        class="custom_table table2 elevation-1"
                    >
                        <template v-slot:items="props">
                            <td>{{ props.item.certificate_id }}</td>
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.status }}</td>
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
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >
                        新規追加
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                        <span class="text-h5">Certificate</span>
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
                                v-model="certificate_id"
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
                                label="資格名"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                            >
                                <v-select
                                v-model="status"
                                :items="['取得済', '学習中']"
                                label="ステータス"
                                required
                                ></v-select>
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
                            @click="addData2"
                        >
                            Save
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>   
        </v-container>
    </v-app>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            dialog: false,
            items2: [],
            headers2: [
                { text: 'ID', value: 'certificate_id' },
                { text: '資格名', value: 'name' },
                { text: 'ステータス', value: 'status' },
            ],
            certificate_id: '',
            name: '',
            status: ''
        }
    },
    created() {
    this.readData2(); 
    },
    methods: {
        async readData2() {
            try {
                const response = await axios.get('https://m3h-matsumoto-functionapiapp2.azurewebsites.net/api/SELECTALLC');
                if (response.data && response.data.List) {
                this.items2 = response.data.List;
                } else {
                console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        // DBにデータを追加する関数
        addData2: async function() {
            //IDの入力チェック（空白か数字以外なら終了）
            if(!this.certificate_id || isNaN(this.certificate_id)){
                console.log("IDに数値が入力されていません");
                return;
            }
            //POSTメソッドで送るパラメーターを作成
            const param = {
                certificate_id : this.certificate_id,
                name : this.name,
                status : this.status
            };
            //INSERT用のAPIを呼び出し
            const response = await axios.post('https://m3h-matsumoto-functionapiapp2.azurewebsites.net/api/INSERTC',param);
            //結果をコンソールに出力
            console.log(response.data);
        },
    }
}
</script>

<style>
    h1{
        margin: 30px;
    }
    .custom_table{
        max-width: 600px
    }
    .v-data-footer {
        display: none;
    }
</style>