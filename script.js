//variaveis
let qtd_caixas = 0;
let caixas_per_second = 0;
let multiplier = 1;
const naodisponivel = document.getElementById("cant");

//funções
function getCookie(){
    qtd_caixas += multiplier;
    refresh();
}

function refresh(){
    document.querySelector("h1").innerHTML = `${qtd_caixas.toLocaleString("pt-br")} caixas`;
}

function cria_upgrade(id){
    const upgrades_create = document.getElementById("upgrades");

    const upgrade_div = document.createElement("div");
    upgrade_div.className = "upgrade";
    upgrade_div.onclick = () => comprar(upgrades[id].id)

    const upgrade_text = document.createElement("p");
    upgrade_text.textContent = upgrades[id].texto;

    const upgrade_price = document.createElement("p");
    upgrade_price.id = `price${id}`
    upgrade_price.textContent = `Preço: ${upgrades[id].preco}`

    const upgrade_cps = document.createElement("p");
    upgrade_cps.textContent = `Caixas por segundo: ${upgrades[id].cps}`

    const upgrade_qtd = document.createElement("p");
    upgrade_qtd.id = id
    upgrade_qtd.textContent = `Quantidade: ${upgrades[id].qtd}`

    upgrade_div.append(upgrade_text, upgrade_price, upgrade_cps, upgrade_qtd)
    upgrades_create.appendChild(upgrade_div)
}

function update_upgrade_status(item_id, qtd){
    document.getElementById(`${item_id}`).innerHTML = `${default_texts.qtd} ${upgrades[item_id].qtd}`
    document.getElementById(`price${item_id}`).innerHTML = `${default_texts.price} ${upgrades[item_id].preco}`
    document.querySelector("h3").innerHTML = `${default_texts.cps} ${caixas_per_second.toLocaleString("pt-br")}`;
}

function comprar(item_id){
    if (qtd_caixas < upgrades[item_id].preco){
        naodisponivel.play()
    }
    else{
        let qtd_upgrades = upgrades[item_id].qtd;
        qtd_caixas -= upgrades[item_id].preco
        qtd_upgrades += 1
        upgrades[item_id].qtd = qtd_upgrades
        caixas_per_second += upgrades[item_id].cps
        upgrades[item_id].preco = Math.floor(upgrades[item_id].preco * 1.15);
        update_upgrade_status(item_id, upgrades[item_id].qtd)
        refresh()
    }
}

//objetos, listas, etc
const default_texts = {
    cps: "por segundo: ",
    qtd: "Quantidade: ",
    price: "Preço: "
}

const upgrades = [
    {
        id: 0,
        texto: "Produção automatica",
        cps: 1,
        preco: 10,
        qtd: 0
    },
    {
        id: 1,
        texto: "Caixas rapidas",
        cps: 5,
        preco: 100,
        qtd: 0
    },
    {
        id: 2,
        texto: "Caixas bem rapidas",
        cps: 10,
        preco: 1000,
        qtd: 0
    },
];

const itens  = [
    {
        id: 0,
        itenframe: ".\source\images\itens\crate.png",
        multi: 1,
        price: 5000
    },
    {
        id: 1,
        itenframe: ".\source\images\itens\companioncube.png",
        multi: 2,
        price: 50000
    }
]


//aqui embaixo vai ficar o codigo que vai criar as divs de upgrade
for (let i = 0; i < upgrades.length; i++){
    cria_upgrade(i)
}

//essa função fica repetindo o codigo toda hora pra atualizar os cps
setInterval(() =>{
    qtd_caixas += caixas_per_second * multiplier;
    refresh();
}, 1000)