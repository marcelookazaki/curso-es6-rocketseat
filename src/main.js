//parte 1
/* Const Muntação sobre a const */
// const usuario = {nome: "marcelo"};

// usuario.nome = "teste";

// console.log(usuario);

// -------------------------------------------------------------------------------------

/* MAP */
// const array = [1 ,2 ,3 , 5, 9, 10];

// const newArray = array.map((item) => {
//     return item * 2;
// });

// const newArray = array.map((item, index) => {
//     return item + index;
// });

// console.log(newArray);

/* reducer correr todo o vetor e transformar e uma unica informação */
// const sum =  array.reduce(function(total, next){
//     return total + next;
// });

// console.log(sum);

/* Para filtrar dentro do array, ex: somente nuemeros pares */
// const filter = array.filter(function(item){
//     return item % 2 === 0;
// });

// console.log(filter);

/* Find para verificar ou se existe esse informação dentro do array */
// const find = array.find(function(item){
//     return item === 10;
// })

// console.log(find);

// -------------------------------------------------------------------------------------

/* ARROW FUNCTIONS */

// const array = [1 ,2 ,3 , 5, 9, 10];
// const newArray = array.map(item => item * 2);
// console.log(newArray);

// const teste = () => ({nome: "MARCELO"});
// console.log(teste());


// -------------------------------------------------------------------------------------

/* VALORS PADRÃO PARA FUNÇÃO */
// function soma(a = 3, b = 6){
//     return a + b;
// } 

/* em arrow function */
// const soma = (a = 3, b = 6) => a + b;

// console.log(soma(1));
// console.log(soma());

// -------------------------------------------------------------------------------------

/* DESESTRUTURAÇÃO */

// const usuario = {
//     nome: 'Marcelo',
//     idade: 23,
//     endereco: {
//         cidade: 'Mogi',
//         estado: 'sp'
//     }
// }

// const {nome, idade, endereco: {cidade} } = usuario;
// console.log(nome);
// console.log(idade);
// console.log(cidade);

//Desestruração em função
// function monstraNome({ nome, idade }){
//     console.log(nome, idade);
// }

// monstraNome(usuario);   

// -------------------------------------------------------------------------------------

/* OPERADORES REST E SPREAD */
/* REST */
//Pegar o resto das propriedades

// const usuario = {
//     nome: 'Marcelo',
//     idade: 23,
//     empresa: "teste"
// }

// const {nome, ...resto} = usuario;
// console.log(nome);
// console.log(resto);

//aplicando REST em vetor
// const array = [1 ,2 ,3 , 5, 9, 10];

// const [a, b, ...c] = array;
// console.log(a);
// console.log(b);
// console.log(c);

/* SPREAD */
//junta as informações

// const arr1 = [1, 2, 3, 4];
// const arr2 = [1, 2, 3, 4];

// const arr3 = [...arr1, ...arr2];
// console.log(arr3);

//sobrepondo valor de um obj com spread
// const usuario1 = {
//     nome: 'Marcelo',
//     idade: 23,
//     empresa: 'teste'
// }

// const usuario2 = {...usuario1, nome: 'Nome Teste'};
// console.log(usuario2);

// -------------------------------------------------------------------------------------

/* TEMPLATE LITERALS */

// const nome = 'Marcelo';
// const idade = 23;
// console.log(`Meu nomo é ${nome} e tenho ${idade} anos`);

// -------------------------------------------------------------------------------------

/* OBJECT SHORT SYNTAX */// 

// const nome = 'Marcelo';
// const idade = 23;

// const usuario = {
//     nome,
//     idade,
//     emprese: 'teste'
// }

// console.log(usuario);

//fim parte 1
//parte 2

/* Configurando WEB PACK */
// import {soma} from '../funcoes';

// console.log(soma(1, 2));

/* EXPORT E IMPORT  */

/* Web pack dev server  */
// alert('aop');
//fim parte 2

//inicio parte 3
/* Async - Await */
/* AXIOS */
// import axios from 'axios';

// class Api{
//     static async getUsuario(username){
//         try{
//             const response = await axios.get(`https://api.github.com/users/${username}`);
//             console.log(response);
//         }catch(error){
//             console.warn('erro na api')
//         }
    
//     }
// }

// Api.getUsuario('diego3g');
import api from './api';

class App {
    constructor(){
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEL = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers(){
        this.formEl.onsubmit = event => this.addRespository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }

    async addRespository(event){
        event.preventDefault();

        const repoInput = this.inputEL.value;

        if(repoInput === 0){
            return;
        }

        this.setLoading();

        try{
            const response = await api.get(`repos/${repoInput}`);
            
            const {name, description, html_url, owner:{avatar_url}} = response.data;
    
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });
    
            this.inputEL.value = '';
    
            this.render();
        }catch(error){
            alert('O repositório não existe');
            this.inputEL.value = '';
        }

        this.setLoading(false);
    }

    render(){
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        })
    }
}
new App();