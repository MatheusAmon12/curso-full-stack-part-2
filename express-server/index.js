//criar repositório
//criar as outras rotas


const exp = require('constants')
const express = require('express')//express aqui é uma função, então temos que chamá-la para retornar uma aplicação express
const path = require('path')//biblioteca para manipular caminhos de pastas
const fs = require('fs')//todos requires devem estar no início

const app = express()

//definindo o template engine
app.set('view engine', 'ejs')


/*
//definindo os arquivos estáticos
const staticFolder = path.join(__dirname, 'views')//concatenação
const expressStatic = express.static(staticFolder)
app.use(expressStatic)

//ou

app.use(express.static(path.join(__dirname, 'views')))
*/


//definindo os arquivos públicos
const publicFolder = path.join(__dirname, 'public')
const expressPublic = express.static(publicFolder)
app.use(expressPublic)//passando para o middleware

app.use(express.urlencoded({extended: true}))//habilitando o servidor para receber dados via POST (formulário), feito apenas uma vez

//MVC - Model View Controller

//rotas
app.get('/', (request, response) => {//rota /, nada mais são que endpoints
    response.render('index', {
        title: "Digital Tech - Home"//passando valores para o HTML, aqui no caso estou criando uma variável que receberá o título de cada página
    })//não precisa do .html

})

app.get('/posts', (req, res) => {//rota /sobre
    res.render('posts', {
        title: 'Digital Tech - Posts',
        posts: [//dica de treino: consumir esse conteúdo por meio de JSON
            {
                title: 'Novidades no mundo da tecnologia',
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, laudantium commodi nulla excepturi, fugiat quos unde beatae iusto illum animi ex odio? Harum doloribus laboriosam sit minima architecto a quod.',
                stars: 2
            },
            {
                title: 'Criando servidor com Node.js',
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, laudantium commodi nulla excepturi, fugiat quos unde beatae iusto illum animi ex odio? Harum doloribus laboriosam sit minima architecto a quod.'
            },
            {
                title: 'JavaScript é a linguagem mais utilizada no mundo!',
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, laudantium commodi nulla excepturi, fugiat quos unde beatae iusto illum animi ex odio? Harum doloribus laboriosam sit minima architecto a quod.',
                stars: 3
            },
        ]
    })
})

app.get('/cadastro-posts', (req, res) => {
    const { c } = req.query//como o método é post capturamos o parâmetro da url pelo query

    res.render('cadastro-posts', {
        title: "Digital Tech - Cadastrar Post",
        cadastrado: c,
    })

})

app.post('/salvar-post', (req, res) => {
    const {titulo, texto} = req.body//capturando os valores do formulário

    const data = fs.readFileSync('./store/posts.json')//aqui o método read é síncrono, porque assim não é preciso usar um callback, ele retorna um valor em string

    const posts = JSON.parse(data)//passando para JSON

    posts.push({
        titulo,//como chave e valor são iguais, é permitido fazer assim no JS
        texto,
    })
    
    const postsString = JSON.stringify(posts)

    fs.writeFileSync('./store/posts.json', postsString)//aqui defino o arquivo em que o conteúdo será salvo e o segundo parâmetro é o conteúdo em si

    res.redirect('/cadastro-posts?c=1')//o caractere ? indica que será passado parâmetros na url, no caso C = 1, é posssível capturá-lo
})

app.get('/quem-somos', (req, res) => {
    res.render('quem-somos', {
        title: 'Digital Tech - Quem Somos'
    })
})

app.get('/produtos', (req, res) => {
    res.render('produtos', {
        title: 'Digital Tech - Produtos'
    })
})

app.get('/servicos', (req, res) => {
    res.render('servicos', {
        title: 'Digital Tech - Serviços'
    })
})

app.get('/contato', (req, res) => {
    res.render('contato', {
        title: 'Digital Tech - Contato'
    })
})

//404 error (not found), é executado quando o endpoint requisitado pelo client não existe
app.use((req, res) => {//middleware, isso significa que é executado antes do cliente solicitar qualquer rota.
    res.send('Error 404 - Page not found')
})

const port = process.env.PORT || 8080//o servidor determina qual porta irá rodar o projeto, caso haja erro no processo a porta padrão será 8080.
app.listen(port, () => console.log(`Server is listening on port ${port}`))