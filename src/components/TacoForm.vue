<template>
  <div>
    
  <Message :msg="msg" v-show="msg"/>
  <div>
    <form id="taco-form" @submit="createTaco">
      <div class="input-container">
        <label for="nome">Nome do cliente:</label>
        <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome" ref='nomeInput'>
      </div>
      <div class="input-container">
        <label for="massa">Escolha a sua massa:</label>
        <select name="massa" id="massa" v-model="massa">
          <option value="">Selecione a sua massa</option>
          <option v-for ="massa in massas" :key="massa.id" :value="massa.tipo">{{massa.tipo}}</option>
          
        </select>
      </div>
      <div class="input-container">
        <label for="recheio">Escolha o recheio do seu Taco</label>
        <select name="recheio" id="recheio" v-model="recheio">
          <option value="">Selecione o tipo recheio</option>
          <option v-for ="recheio in recheios" :key="recheio.id" :value="recheio.tipo">{{recheio.tipo}}</option>
        </select>
      </div>
      <div id="opcionais-container" class="input-container">
        <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
        <div class="checkbox-container" v-for="opcional in opcionaisdata" :key='opcional.id' >
          <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
          <span>{{opcional.tipo}}</span>
        </div>
      </div>
      <div class="input-container">
        <input class="submit-btn" type="submit" value="Criar meu Taco!">
      </div>
    </form>
  </div>
  </div>
</template>
<script>
import Message from './Message.vue'
export default {
    name: 'TacoForm',
    data(){
        return{
            massas: null,
            recheios: null,
            opcionaisdata: null,
            nome: null,
            massa: null,
            recheio: null,
            opcionais: [],
            msg: null

        }
        
    },
    methods: {
        async getIngredientes(){
            const req = await fetch("http://localhost:3000/ingredientes");
            const data = await req.json();

            this.massas = data.massas;
            this.recheios = data.recheios;
            this.opcionaisdata= data.opcionais
        },
        async createTaco (e) {
            e.preventDefault();

            //validar campos

            if (!this.nome || !this.massa || !this.recheio) {
    this.msg = 'Por favor, preencha todos os campos obrigatórios.';
    setTimeout(() => (this.msg = ''), 3000);
    return;
  }
            
            const data ={
                nome: this.nome,
                recheio: this.recheio,
                massa: this.massa,
                opcionais: Array.from(this.opcionais),
                status: 'Solicitado'
            }

           const dataJson = JSON.stringify(data);

           const req = await fetch ("http://localhost:3000/tacos", {
            method: "POST",
            headers:  {"Content-Type": "application/json"},
            body: dataJson 
           })
           const res = await req.json();

          //mensagem de sistema
          this.msg =`Pedido ${res.id} realizado com sucesso!`

          //limpar msg
          
          setTimeout (()=> this.msg ="", 3000)
          //limpar campos
          this.nome= '';
          this.massas =""
          this.recheio=''
          this.opcionais=[]

        }
    }, 
    mounted(){
        this.getIngredientes()
    },

    components: {
    Message}
    
}
</script>
<style>
#taco-form {
    max-width: 400px;
    margin: 0 auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 4px solid #f05c06;
  }

  input, select {
    padding: 5px 10px;
    width: 300px;
  }

  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  #opcionais-title {
    width: 100%;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }

  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }

  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
  }

  .submit-btn {
    background-color: #222;
    color:#f05c06;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }

  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }




.submit-btn{
    font-size: 16px
}

@media screen and (max-width: 600px) {
  .submit-btn {
    font-size: 14px;
  }
}

</style>
