const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.sendFile(__dirprod + "/Front/index.html");
});

app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});

let produtos = [];

// CREATE
app.post("/cadastroNomeProduto", (req, res) => {
    const { prod } = req.body;
    produtos.push(prod);
    console.log("Produto cadastrado:", prod);
    res.sendFile(__dirprod + "/Front/index.html");
});

// UPDATE
app.post("/atualizarProduto", (req, res) => {
    const { produtoParaAtualizar, produtoAtualizado } = req.body;

    const index = produtos.findIndex((prod) => prod=== produtoParaAtualizar);

    if (index !== -1) {
        produtos[index] = produtoAtualizado;
        console.log("Produto atualizado para:", produtoAtualizado);
    } else {
        console.log("Produto não encontrado:", produtoParaAtualizar);
    }

    res.sendFile(__dirprod + "/Front/index.html");
});

// DELETE
app.post("/deletarProduto", (req, res) => {
    const { produtoParaDeletar } = req.body;
    const index = produtos.findIndex((prod) => prod === produtoParaDeletar);
    if (index !== -1) {
        produtos.splice(index, 1);
        console.log("Produto deletado:", produtoParaDeletar);
    } else {
        console.log("Produto não encontrado:", produtoParaDeletar);
    }
    res.sendFile(__dirprod + "/Front/index.html");
});

// READ
app.get("/mostrarProduto", (req, res) => {
    console.log("Produtos cadastrados:", prod);
    const produtosToDisplay = produtos.join(', ');

    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="ptb-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crud Cadastro de Produto</title>
        <link rel="stylesheet" href="/styles.css"/>
    </head>
    
    <body>
        <h1>Cadastro de Produtos de Caixa</h1>
        <form action="/cadastroProduto" method="post">
            <label for="produto">Produto:</label>
            <input type="text" name="produto" id="produto" placeholder="Produto"><br>
            <label for="valorProduto">Valor do Produto:</label>
            <input type="text" name="valorProduto" id="valorProduto" placeholder="Valor">
            <button type="submit">Enviar</button>
        </form>
        
        <form action="/mostrarProduto" method="get">
            <span id="mostrar"></span>
            <button type="submit">Mostrar Produto</button>
        </form>
    
        <h2>Atualizar Produto</h2>
        <form action="/atualizarProduto" method="post">
            <input type="hidden" name="_method" value="post">
            <label for="nomeParaAtualizar">Produto para Atualizar:</label>
            <label for="valorProduto">Valor do Produto:</label>
            <input type="text" name="valorProduto" id="valorProduto" placeholder="Valor">
            <input type="text" name="produtoParaAtualizar" id="produtoParaAtualizar" placeholder="Produto"><br>
            <label for="produtoAtualizado">Produto Atualizado:</label>
            <label for="valorProduto">Valor do Atualizado:</label>
            <input type="text" name="valorProduto" id="valorProduto" placeholder="Valor">
            <input type="text" name="produtoAtualizado" id="produtoAtualizado" placeholder="Produto">
            <button type="submit">Atualizar</button>
        </form>
    
        <h2>Deletar Produto</h2>
        <form action="/deletarProduto" method="post">
            <input type="hidden" name="_method" value="delete">
            <label for="produtoParaDeletar">Produto para Deletar:</label>
            <input type="text" name="produtoParaDeletar" id="produtoParaDeletar" placeholder="Produto">
            <button type="submit">Deletar</button>
        </form>
    </body>
    </html>
    `;

    res.send(htmlResponse); 
});
