//variaveis
let qtd_caixas = 0;
let caixas_per_second = 0;
let multiplier = 1;
const naodisponivel = document.getElementById("cant");

//funções
function getCookie() {
    qtd_caixas += multiplier;
    refresh();
}

function refresh() {
    document.querySelector("h1").innerHTML = `${Math.floor(qtd_caixas).toLocaleString("pt-br")} caixas`;
}

function cria_upgrade(id) {
    const upgrades_create = document.getElementById("upgrades");

    const upgrade_div = document.createElement("div");
    upgrade_div.className = "upgrade";
    upgrade_div.onclick = () => comprar_upgrade(upgrades[id].id)

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

function update_upgrade_status(id, qtd) {
    document.getElementById(`${id}`).innerHTML = `${default_texts.qtd} ${upgrades[id].qtd}`
    document.getElementById(`price${id}`).innerHTML = `${default_texts.price} ${upgrades[id].preco}`
    document.querySelector("h3").innerHTML = `${default_texts.cps} ${caixas_per_second.toLocaleString("pt-br")}`;
}

function comprar_upgrade(id) {
    if (qtd_caixas < upgrades[id].preco) {
        naodisponivel.play()
    }
    else {
        let qtd_upgrades = upgrades[id].qtd;
        qtd_caixas -= upgrades[id].preco
        qtd_upgrades += 1
        upgrades[id].qtd = qtd_upgrades
        caixas_per_second += upgrades[id].cps
        upgrades[id].preco = Math.floor(upgrades[id].preco * 1.15);
        update_upgrade_status(id, upgrades[id].qtd)
        refresh()
    }
}

function cria_item(id) {
    const item = document.getElementById("itens")

    const div = document.createElement("div");
    div.className = "item"
    div.id = `$item_${id}`

    const img = document.createElement("img");
    img.src = itens[id].frame

    div.append(img)
    item.appendChild(div)
}

function create_text(text, id_name){
    const x = document.getElementById(id_name);
    const texto = document.createElement("p");
    texto.textContent = text;
    x.appendChild(texto)
}

function name_appear(id_name){
    switch (id_name){
        case "nameitens":
            create_text("Melhorias", id_name);
            break;
        case "nameupgrades":
            create_text("Construções", id_name);
            break;
    }
}

function name_desappear(id_name){
    const remove = document.getElementById(id_name);
    const element = remove.querySelector("p")
    remove.removeChild(element)
}

//objetos, listas, etc
const default_texts = {
    cps: "por segundo: ",
    qtd: "Quantidade: ",
    price: "Preço: "
}

function save(){
    const save = {
        qtd_caixas,
        caixas_per_second,
        multiplier,
        upgrades,
        itens
    }

    localStorage.setItem("save", JSON.stringify(save));
    console.log("GAME SAVED")
}

function load_save(){
    const save = localStorage.getItem("save")
    if (save){
        const data = JSON.parse(save)

        qtd_caixas = data.qtd_caixas;
        caixas_per_second = data.caixas_per_second;
        multiplier = data.multiplier

        for (let i = 0; i < upgrades.length; i++){
            upgrades[i] = data.upgrades[i]
            update_upgrade_status(upgrades[i].id, upgrades[i].qtd)
        }

        for (let i = 0; i < itens.length; i++){
            itens[i] = data.itens[i]
        }

        refresh()
    }
}

const upgrades = [
    {
        id: 0,
        texto: "Produção automatica",
        cps: 0.1,
        preco: 10,
        qtd: 0,
        img: ".\\source\\images\\placeholder.png",
    },
    {
        id: 1,
        texto: "Caixas rapidas",
        cps: 5,
        preco: 100,
        qtd: 0,
        img: ".\\source\\images\\placeholder.png",
    },
    {
        id: 2,
        texto: "Caixas bem rapidas",
        cps: 10,
        preco: 1000,
        qtd: 0,
        img: ".\\source\\images\\placeholder.png",
    },
];

const itens = [
    {
        id: 0,
        frame: ".\\source\\images\\placeholder.png",
        multi: 1,
        price: 5000
    },
    {
        id: 1,
        frame: ".\\source\\images\\placeholder.png",
        multi: 2,
        price: 50000
    },
    {
        id: 0,
        frame: ".\\source\\images\\placeholder.png",
        multi: 1,
        price: 5000
    },
    {
        id: 1,
        frame: ".\\source\\images\\placeholder.png",
        multi: 2,
        price: 50000
    },
    {
        id: 0,
        frame: ".\\source\\images\\placeholder.png",
        multi: 1,
        price: 5000
    },
    {
        id: 1,
        frame: ".\\source\\images\\placeholder.png",
        multi: 2,
        price: 50000
    },
    {
        id: 0,
        frame: ".\\source\\images\\placeholder.png",
        multi: 1,
        price: 5000
    },
    {
        id: 1,
        frame: ".\\source\\images\\placeholder.png",
        multi: 2,
        price: 50000
    },
    {
        id: 0,
        frame: ".\\source\\images\\placeholder.png",
        multi: 1,
        price: 5000
    },
    {
        id: 1,
        frame: ".\\source\\images\\placeholder.png",
        multi: 2,
        price: 50000
    },
    {
        id: 0,
        frame: ".\\source\\images\\placeholder.png",
        multi: 1,
        price: 5000
    },
    {
        id: 1,
        frame: ".\\source\\images\\placeholder.png",
        multi: 2,
        price: 50000
    },
]

const frases = ["Você ganha caixas se clicar na caixa", "Cookie clicker é muito melhor que esse jogo", "Schrodinger amaria esse jogo"]

//vai criar os upgrades
for (let i = 0; i < upgrades.length; i++) {
    cria_upgrade(i)
}

//vai criar os itens da loja
for (let i = 0; i < itens.length; i++) {
    cria_item(i)
}

load_save()

//essa função fica repetindo o codigo toda hora pra atualizar os cps
setInterval(() => {
    qtd_caixas += caixas_per_second
    refresh()
}, 1000)

setInterval(() => {
    save()
}, 10000)

setInterval(() =>{
    frase_escolhida = Math.floor(Math.random() * frases.length)
    document.getElementById("frase").innerHTML = frases[frase_escolhida];
},2000)