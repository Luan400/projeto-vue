<template>
    <div id='taco-table'>
        <Message :msg="msg" v-show="msg"/>
        <div>
         <div id= 'taco-table-heading'>
            <div class='order-id'>#:</div>
            <div>Cliente:</div>
            <div>Massa:</div>
            <div>Recheio:</div>
            <div>Opcionais:</div>
            <div>Ações:</div>
        
         </div>
        </div>
        <div id='taco-table-rows'> 
            <div class='taco-table-row' v-for="taco in tacos" :key="taco.id">
                <div class='order-number'>1</div>
                <div>{{taco.nome}}</div>
                <div>{{taco.Massa}}</div>
                <div>{{taco.recheio}}</div>
                <div>
                    <ul>
                        <li v-for="(opcional,index) in taco.opcionais" :key="index">
                            {{opcional}}
                        </li>
                       
                        
                    </ul>
                </div>
                <div>
                <select name='status' class='status' @change="updatedTaco($event, taco.id)">
                    
                    <option v-for='s in status' :key='s.id' :value = 's.tipo' :selected='taco.status == s.tipo'>
                        {{s.tipo}}</option>
                </select>
                <button class='delete-btn' @click='deleteTaco(taco.id)'>Cancelar</button>
                </div>
                </div>
        </div>
    </div>
    
    
    
</template>

<script>
import Message from './Message.vue'

export default {
    name: "Dashboard",

    data(){
        return{
            tacos: null,
            tacos_id:null,
            status: [],
            msg: null
        }
    }, 
    components: {

        Message
    },
    methods:{
        async getPedidos(){

            const req = await fetch ("http://localhost:3000/tacos");

            const data = await req.json();

            this.tacos= data;


            //resgatar status
            this.getStatus();
        },
        async getStatus(){

const req = await fetch ("http://localhost:3000/status");
const data = await req.json();

this.status = data;
        },
        async deleteTaco (id){

            const req = await fetch (`http://localhost:3000/tacos/${id}`, {
                method: 'DELETE'
            });

            const res = await req.json();

            //mensagem de sistema
          this.msg =`Pedido removido com sucesso!`

          //limpar msg
          
          setTimeout (()=> this.msg ="", 3000)

            this.getPedidos();
            
        },
        async updatedTaco(event, id){

            console.log("@",id);

            const option = event.target.value;

            console.log("option", option);

            const dataJson = JSON.stringify({status: option});

            const req = await fetch(`http://localhost:3000/tacos/${id}`, {
                method: "PATCH",
                headers: {'Content-Type' : 'application/json'},
                body: dataJson
            });

            const res = await req.json();

            //mensagem de sistema
            this.msg = 'Statu do pedido atualizado com sucesso!'
          //this.msg =`Pedido ${res.id} foi atualizado para ${res.status}`

          //limpar msg
          
          setTimeout (()=> this.msg ="", 3000)

            console.log(res)
        }
    },
    mounted(){
        this.getPedidos();
    }
}
</script>

<style scoped>

#taco-table {
    max-width: 1200px;
    margin: 0 auto;
}

#taco-table-heading,
#taco-table-rows,
.taco-table-row{
    display: flex;
    flex-wrap: wrap;
}

#taco-table-heading{
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
}

#taco-table-heading div,
.taco-table-row div {
    width: 19%;
}

.taco-table-row{
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
}

#taco-table-heading .order-id,
.taco-table-row .order-number {
    width: 5%;
}

select{
    padding: 12px 6px;
    margin-right: 12px;
    width: 100px;
    

}



.taco-table-row{
    align-items: center;
    padding: 5px;
}

.delete-btn{
    background-color: #222;
    color: #f05c06;
    font-weight: bold;
    border: 2px solid#222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;

}

.delete-btn:hover{
background-color: transparent;
color: #222;
}


</style>