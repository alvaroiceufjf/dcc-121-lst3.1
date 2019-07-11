const altura = "40px";

var corpo;

var movimentos = 0;

var quadro1 = new quadro(true);
var quadro2 = new quadro(false);
var quadro3 = new quadro(false);

var fichaSelecionada;
var origem;
var destino;

function criarDiv() {
    var caixa = document.createElement("div");
    return caixa;
}

function over1() {
    over(quadro1);
}

function over2() {
    over(quadro2);
}

function over3() {
    over(quadro3);
}

function over(quadro) {
    quadro.caixa.style.backgroundColor = "#ADFAFF";
}

function out1() {
    out(quadro1);
}

function out2() {
    out(quadro2);
}

function out3() {
    out(quadro3);
}

function out(quadro) {
    quadro.caixa.style.backgroundColor = "white";
}

function click1() {
    quadro1.elegido = !quadro1.elegido;
    click(quadro1);
}

function click2() {
    quadro2.elegido = !quadro2.elegido;
    click(quadro2);
}

function click3() {
    quadro3.elegido = !quadro3.elegido;
    click(quadro3);
}

function click(quadro) {
    if (quadro.elegido) {
        selecionarOrigemDestino(quadro);
    } else {
        quadro.caixa.style.borderColor = "black";
        reiniciarOrigemDestino();
    }    
}

function preencherConteudo() {
    var conteudo = new Array();
    
    for (var i = 0; i < 6; i++) {
        conteudo[i] = new enchimento();
    }
    
    return conteudo;
}

function preencherFichas() {
    var conteudo = new Array();
    
    conteudo[0] = new enchimento();
    conteudo[1] = new FichaS();
    conteudo[2] = new FichaM();
    conteudo[3] = new FichaL();
    conteudo[4] = new FichaXL();
    conteudo[5] = new FichaXXL();
    
    return conteudo;
}

function FichaS() {
    this.caixa = criarDiv();
    this.caixa.style.width = "10%";
    this.caixa.style.height = altura;
    this.caixa.style.backgroundColor = "#FF6347";
    this.caixa.style.marginLeft = "auto";
    this.caixa.style.marginRight = "auto";
    this.valor = 0;
}

function FichaM() {
    this.caixa = criarDiv();
    this.caixa.style.width = "30%";
    this.caixa.style.height = altura;
    this.caixa.style.backgroundColor = "#FFA07A";
    this.caixa.style.marginLeft = "auto";
    this.caixa.style.marginRight = "auto";
    this.valor = 1;
}

function FichaL() {
    this.caixa = criarDiv();
    this.caixa.style.width = "50%";
    this.caixa.style.height = altura;
    this.caixa.style.backgroundColor = "#FA8072";
    this.caixa.style.marginLeft = "auto";
    this.caixa.style.marginRight = "auto";
    this.valor = 2;
}

function FichaXL() {
    this.caixa = criarDiv();
    this.caixa.style.width = "70%";
    this.caixa.style.height = altura;
    this.caixa.style.backgroundColor = "#B22222";
    this.caixa.style.marginLeft = "auto";
    this.caixa.style.marginRight = "auto";
    this.valor = 3;
}

function FichaXXL() {
    this.caixa = criarDiv();
    this.caixa.style.width = "90%";
    this.caixa.style.height = altura;
    this.caixa.style.backgroundColor = "#800000";
    this.caixa.style.marginLeft = "auto";
    this.caixa.style.marginRight = "auto";
    this.valor = 4;
}

function enchimento() {
    this.caixa = criarDiv();
    this.caixa.style.width = "100%";
    this.caixa.style.height = altura;
}

function quadro(caixaInicial) {
    this.caixa = criarDiv();
    this.caixa.style.width = "28%";
    this.caixa.style.height = "240px";
    this.caixa.style.marginLeft = "4%";
    this.caixa.style.borderWidth = "2%";
    this.caixa.style.border = "solid black";
    this.caixa.style.float = "left";
    this.elegido = false;
    this.conteudo;
    
    if (caixaInicial) {
        this.conteudo = preencherFichas();
    } else {
        this.conteudo = preencherConteudo();
    }
    
    for (var i = 0; i < this.conteudo.length; i++) {
        this.caixa.appendChild(this.conteudo[i].caixa);
    }
    
    this.temFichas = function() {
        var enchimentos = 0;
        
        for (var i = 0; i < this.conteudo.length; i++) {
            if (this.conteudo[i] instanceof enchimento) {
                enchimentos++;
            }
        }
        
        if (enchimentos == this.conteudo.length) {
            return false;
        } else {
            return true;
        }
    };
    
    this.obterFichaSuperior = function() {
        for (var i = 0; i < this.conteudo.length; i++) {
            if (!(this.conteudo[i] instanceof enchimento)) {
                return this.conteudo[i];
            }
        }    
    };
    
    this.removerFichaSuperior = function() {
        for (var i = 0; i < this.conteudo.length; i++) {
            if (!(this.conteudo[i] instanceof enchimento)) {
                fichaSelecionada = this.conteudo[i];
                this.conteudo[i] = new enchimento();
                break;
            }
        }
    };
    
    this.inserirFichaSuperior = function() {
        for (var i = this.conteudo.length - 1; i >= 0; i--) {
            if (this.conteudo[i] instanceof enchimento) {
                this.conteudo[i] = fichaSelecionada;
                break;
            }    
        }
    };
    
    this.redesenharCaixa = function() {
        while (this.caixa.hasChildNodes()) {
            this.caixa.removeChild(this.caixa.lastChild);
        }
        
        for (var i = 0; i < this.conteudo.length; i++) {
            this.caixa.appendChild(this.conteudo[i].caixa);
        }
    };
}

function selecionarOrigemDestino(quadro) {
    if (origem == undefined) {
        if (quadro.temFichas()) {
            quadro.caixa.style.borderColor = "red";
            origem = quadro;
            origem.elegido = true;
        }
    } else if(origem != undefined && destino == undefined) {
        destino = quadro;
        destino.elegido = true;
        
        if (origem != destino) {
            if (!destino.temFichas() || (origem.obterFichaSuperior().valor < destino.obterFichaSuperior().valor)) {
                origem.removerFichaSuperior();
                origem.redesenharCaixa();
                destino.inserirFichaSuperior();
                destino.redesenharCaixa();
                movimentos++;
                atualizarContador();        
            }    
        }
    }
    
    if (destino != undefined && origem != undefined) {
        reiniciarOrigemDestino();    
    }
    
    if (checaVitoria()) {
        vitoria();
    }
}

function checaVitoria() {
    if (quadro3.conteudo[0] instanceof enchimento &&
        quadro3.conteudo[1] instanceof FichaS &&
        quadro3.conteudo[2] instanceof FichaM &&
        quadro3.conteudo[3] instanceof FichaL &&
        quadro3.conteudo[4] instanceof FichaXL &&
        quadro3.conteudo[5] instanceof FichaXXL) {
            return true;    
        } else {
            return false;
        }
}

function vitoria() {
    var textoTitulo = document.createTextNode("Parabens! Você venceu!");
    var textoSubtitulo = document.createTextNode("Movimentos utilizados: " + movimentos);
    var textoConselho = document.createTextNode("Pressione F5 para jogar novamente.");
    
    corpo.removeChild(quadro1.caixa);
    corpo.removeChild(quadro2.caixa);
    corpo.removeChild(quadro3.caixa);
    corpo.removeChild(document.getElementById("contador"));
    
    var titulo = document.createElement("h1");
    titulo.style.color = "red";
    titulo.appendChild(textoTitulo);
    
    var subtitulo = document.createElement("h2");
    subtitulo.appendChild(textoSubtitulo);
    
    var conselho = document.createElement("h3");
    conselho.appendChild(textoConselho);
    
    corpo.appendChild(titulo);
    corpo.appendChild(subtitulo);
    corpo.appendChild(conselho);
}

function reiniciarOrigemDestino() {
    if (origem != undefined) {
        origem.caixa.style.borderColor = "black";
        origem.elegido = false;
    }
    if (destino != undefined) {
        destino.caixa.style.borderColor = "black";
        destino.elegido = false;    
    }       
    
    origem = undefined;
    destino = undefined;
    
    quadro1.elegido = false;
    quadro2.elegido = false;
    quadro3.elegido = false;
}

function atualizarContador() {
    var paragrafo = document.getElementById("contador");
    paragrafo.innerHTML = "Movimentos: " + movimentos;    
}

function iniciar() {
    corpo = document.getElementsByTagName("body")[0];
    corpo.style.textAlign = "center";
    
    corpo.appendChild(quadro1.caixa);
    corpo.appendChild(quadro2.caixa);
    corpo.appendChild(quadro3.caixa);
    
    quadro1.caixa.addEventListener("mouseover", over1, false);
    quadro2.caixa.addEventListener("mouseover", over2, false);
    quadro3.caixa.addEventListener("mouseover", over3, false);
    
    quadro1.caixa.addEventListener("mouseout", out1, false);
    quadro2.caixa.addEventListener("mouseout", out2, false);
    quadro3.caixa.addEventListener("mouseout", out3, false);
    
    quadro1.caixa.addEventListener("click", click1, false);
    quadro2.caixa.addEventListener("click", click2, false);
    quadro3.caixa.addEventListener("click", click3, false);
    
    var texto = document.createTextNode("Movimentos: " + movimentos);
    var paragrafo = document.createElement("p");
    paragrafo.style.clear = "both";
    paragrafo.style.paddingTop = "3em";
    paragrafo.setAttribute("id", "contador");
    paragrafo.appendChild(texto);
    corpo.appendChild(paragrafo);    
}

window.addEventListener("load", iniciar, false);
