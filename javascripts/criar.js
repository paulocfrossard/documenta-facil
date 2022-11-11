/*
  _____                                        _           __           _ _ 
 |  __ \                                      | |         / _|         (_) |
 | |  | | ___   ___ _   _ _ __ ___   ___ _ __ | |_ __ _  | |_ __ _  ___ _| |
 | |  | |/ _ \ / __| | | | '_ ` _ \ / _ \ '_ \| __/ _` | |  _/ _` |/ __| | |
 | |__| | (_) | (__| |_| | | | | | |  __/ | | | || (_| | | || (_| | (__| | |
 |_____/ \___/ \___|\__,_|_| |_| |_|\___|_| |_|\__\__,_| |_| \__,_|\___|_|_|

Criado por: Paulo Frossard
Criado com javascript puro em modelo C-like
*/

// variaveis globais
var num;
var titulo_pag;

function getPost(titulo, conteudo) { //Gera codigo html de cada postagem
	var html_titulo, html_cont;
	html_titulo = "<article><p><h2>" + titulo + "</h2>";
	html_cont = "<div class='styles'>" + conteudo + "</p></div></article>"; 
	cont_final = html_titulo + html_cont;
	return cont_final;
};

function final() {
	console.log(num)
	titulo_pag = document.getElementById('titulo_pag').value;
	var main_html = ["<!DOCTYPE html><html lang='pt-br'>", '</html>']
	var body_html = ["<body>", '</body>']
	var head_html = [];
	var bootstrap = ['<div class="container-fluid">', '<div class="row">', "<div class='col-sm-10 col-md-10 col-xs-10 col-md-offset-1 col-xs-offset-1 col-sm-offset-1'>"]
	
	var post = []; //Armazena codigo gerado pela função getpost
	var contudo = []; 
	var codigo_final = "";
	var final = ""
	head_html[0] = "<head>";
	head_html[1] = "<meta name='viewport' content='width=device-width, initial-scale=1'> <meta charset='utf-8'>";
	head_html[2] = "<title>" + titulo_pag + "</title>"
	head_html[3] = "<link href='https://fonts.googleapis.com/css?family=Josefin+Sans' rel='stylesheet'>" // Importa fonts Jesefin-Sans
	head_html[4] = "<link rel='stylesheet' href='https://raw.githubusercontent.com/paulocfrossard/documenta-facil/main/styleguide.css'>"; // Importa Styleguide.css github
	head_html[5] = "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'>"; // Bootstrap 3.2
	head_html[6] = "</head>";
	contudo[0] = "<div class='page-header'><h1>" + titulo_pag + "</h1></div>" //  Cabeçalho
	contudo[1] = "<section><div id='conteudo'>"
	contudo[2] = "</div></section>"

	for (i = 0; i <= num - 1; i++) {
		post[i + 1] = i + 1;
		post[i] = getPost(document.getElementById('Titulo_' + post[i + 1]).value, document.getElementById('cont_' + post[i + 1]).value);
	}

	codigo_final += main_html[0];
	for (i = 0; i <= [head_html.length - 1]; i++) {
		codigo_final += head_html[i];
	}
	codigo_final += body_html[0];
	for (i = 0; i <= [bootstrap.length - 1]; i++){
		codigo_final += bootstrap[i];
	}
	codigo_final += contudo[0];
	codigo_final += contudo[1];
	for (i = 0; i <= num - 1; i++) {
		codigo_final += post[i];
	}
	codigo_final += contudo[2];
	codigo_final += "</div></div></div>";
	codigo_final += body_html[1]
	codigo_final += main_html[1]
	copiar = "<input type='button' class='btn btn-primary' value='Copiar' onclick='getConteudo(\"final\")'>"
	final = "<textarea id='final' class='form-control'>" + codigo_final + "</textarea><br>" + copiar ;
	document.getElementById('corpo').innerHTML = final;
};

function posts() { //Função que gera toda parte editavel 
	var temp = document.getElementById('num_post').value; // Pega o numero de postagens 
	num = Number(temp); //Transforma em um numero
	if (isNaN(num) || num < 0 || num == 0) { 
		alert("Somente numeros positivos aqui!");
	}
	else {
		var conteudo = [];//Aqui é impresso os valores da array para gerar um codigo html limpo
		var confirma = "<center><button class='btn btn-success uppercase' type='submit' onclick='final()'> gerar documentação </button></center>"
		var art = []; //Recebe o codigo html e atribui logo em seguida um valor para cada item 				
		var padrao = "<p>Escreva seu texto usando tags HTML</p>"; //Valor textarea
		var titulo = "Qual o nome da ferramenta?<br><input type='text' id='titulo_pag' class='form-control margem' placeholder='Nome da ferramenta'/></center><hr>";
		conteudo += titulo;
		for (i = 0; i <= num - 1; i++) { //Gera a grade da documentação atribuindo uma id especifica 
			art[i + 1] = i + 1;
			art[i] = "<article id='art_" + art[i + 1] + "'><input type='text' class='form-control margem' id='Titulo_" + art[i + 1] + "' placeholder='Título " + art[i + 1] + "'/><div class='styles'><textarea class='form-control' placeholder='"+ padrao +"' id='cont_" + art[i + 1] + "'></textarea></div></article><br>";
		}
		for (i = 0; i <= num - 1; i++) { //Imprime a grade de maneira completa ao usuario, sem as "," de separação
			conteudo += art[i];
		}
		conteudo += confirma;
		document.getElementById('corpo').innerHTML = conteudo;
	}
};
function getConteudo(id){
	var copy = document.getElementById(id);
	copy.select();
    copy.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(copy.value)
}