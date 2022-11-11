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

function final() { //Função refeita no dia 09/11/22 as 00:00
	console.log(num)
	titulo_pag = document.getElementById('titulo_pag').value; // Pega titulo da pagina
	var main_html = ["<!DOCTYPE html><html lang='pt-br'>", '</html>']
	var body_html = ["<body>", '</body>']
	var head_html = [];
	var bootstrap = ['<div class="container-fluid">', '<div class="row">', "<div class='col-sm-10 col-md-10 col-xs-10 col-md-offset-1 col-xs-offset-1 col-sm-offset-1'>"]
	
	var post = []; //Armazena codigo gerado pela função getpost
	var codigo_final = ""; //Cria variavel do tipo string vazia
	var contudo = []; // Cria array responsavel pelo codigo html final
	var final = ""
	// Define valores do <head> html
	head_html[0] = "<head>";
	head_html[1] = "<meta name='viewport' content='width=device-width, initial-scale=1'> <meta charset='utf-8'>";
	head_html[2] = "<title>" + titulo_pag + "</title>"
	head_html[3] = "<link href='https://fonts.googleapis.com/css?family=Josefin+Sans' rel='stylesheet'>" // Importa fonts Jesefin-Sans
	head_html[4] = "<link rel='stylesheet' href='*'>"; // Importa Styleguide.css github
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
	copiar = "<input type='button' class='btn btn-default' value='Copiar' onclick='getConteudo(\"final\")'>"
	final = "<textarea id='final' class='form-control'>" + codigo_final + "</textarea><br>" + copiar ;
	document.getElementById('conteudo').innerHTML = final;
};

function posts() { //Função que gera toda parte editavel 
	var temp = document.getElementById('num_post').value; // Pega o valor do input do numero de postagens 
	num = Number(temp); //Transforma em um numero
	if (isNaN(num) || num < 0 || num == 0) { //Avisa caso não seja um numero positivo
		alert("Somente numeros positivos aqui!");
	}
	else {
		var art_1 = [];//Aqui é impresso os valores da array para gerar um codigo html limpo
		var confirma = "<center><button class='btn btn-success' type='submit' onclick='final()'> GERAR DOCUMENTAÇÃO </button></center>"
		var art = []; //Recebe o codigo html e atribui logo em seguida um valor para cada item 				
		var padrao = "<p>Escreva seu texto usando tags HTML</p>"; //Valor textarea
		var titulo = "Qual o nome da ferramenta?<br><input type='text' id='titulo_pag' class='form-control margem' placeholder='Nome da ferramenta'/></center><hr>";
		art_1 += titulo;
		for (i = 0; i <= num - 1; i++) { //Gera a grade da documentação atribuindo uma id especifica 
			art[i + 1] = i + 1;
			art[i] = "<article id='art_" + art[i + 1] + "'><input type='text' class='form-control margem' id='Titulo_" + art[i + 1] + "' placeholder='Título " + art[i + 1] + "'/><div class='styles'><textarea class='form-control' placeholder='"+ padrao +"' id='cont_" + art[i + 1] + "'></textarea></div></article><br>";
		}
		for (i = 0; i <= num - 1; i++) { //Imprime a grade de maneira completa ao usuario, sem as "," de separação
			art_1 += art[i];
		}
		art_1 += confirma;
		document.getElementById('conteudo').innerHTML = art_1;
	}
};
function getConteudo(id){
	var copy = document.getElementById(id);
	copy.select();
    copy.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(copy.value)
}