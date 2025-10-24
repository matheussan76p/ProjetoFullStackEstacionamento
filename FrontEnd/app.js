const express = require("express");
const cors = require("cors");
// O cons vai fazer o projeto aceitar requisições externas xomo chamar outro arquivo
const porta = 3000
const app = express();
app.use(express.json());
app.use(cors());
let VEICULOS = [{
    id: 1, placa: "ABC-1234", modelo: "Seden",
    hora_entrada: new Date().toISOString(),
    pago: true
},
{
    id: 2, placa: "DEF-5678", modelo: "SUV",
    hora_entrada: new Date().toISOString(),
    pago: false
}];


app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello" })
});

app.get("/lerveiculos", (req, res) => {
    res.status(200).json(VEICULOS)
})

app.get("/lerveiculos/:id", (req, res) => {
    const id = Number(req.params.id);
    const carro = VEICULOS.find(veiculo => veiculo.id === Number(id))
    res.status(200).json(carro)
})

app.patch("/atualizarpagamento/:id", (req, res) => {
    const veiculo = VEICULOS.find(x => x.id === Number(req.params.id));
    console.log(veiculo)
    if (!veiculo) return res.status(404).json({ erro: "Não achei" })

    const { pago } = req.body;

    if (pago !== undefined) veiculo.pago = pago;

    res.json(veiculo)
})

app.listen(porta, () => {
    console.log(`servidor rodando no http://localhost:${porta}`);
})

























console.log("App.js funcionando")
const API = "http://localhost:3000/lerveiculos";
const APIPagamento = "http://localhost:3000/atualizarpagamento"

async function carregar() {
    const res = await fetch(API);
    const dados = await res.json();

    const tabela = document.getElementById("tabela");

    tabela.innerHTML = "";
    console.log(dados)

    dados.forEach((carro) => {
        tabela.innerHTML += `
    <tr>
        <td>${carro.id}</td>
        <td>${carro.placa}</td>
        <td>${carro.modelo}</td>
        <td>${carro.pago ? "✅Sim" : "❌Não"}</td>
        <td>
            <button onclick="pagar(${carro.id}, ${carro.pago})">
                  ${carro.pago ? '<span style="color:blue">cancelar</span>' : '<span style="color:green">pagar</span>'}
            </button>
             <button onclick="Deletar(${carro.id}, ${carro.pago})">
                  ${carro.pago ? '<span style="color:blue">cancelar</span>' : '<span style="color:green">pagar</span>'}
            </button>
        </td>
    </tr>
    `
    })

}

async function pagar(id, pagoAtual) {
    console.log(id)
    console.log(pagoAtual)
    await fetch(`${APIPagamento}/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ pago: !pagoAtual })
    })
    //Ao abrir a pagina, chama a função carregar
    carregar();
}


carregar();
//------------------------------------------
carregar();