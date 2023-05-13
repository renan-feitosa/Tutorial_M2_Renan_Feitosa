// ENDPOINTS TABELA HABILIDADES - NOME DA HABILIDADE, NÍVEL

const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = './curriculo.db';

const app = express();
app.listen(3000)

app.use(express.static("../frontend/"));
app.use(express.json());


// Inserir habilidade - Create
app.post('/inserir_habilidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO Tbl_Habilidades (nome_habilidade, nivel, id_perfil) VALUES ('" + req.body.nome + "', '" + req.body.nivel + "', '" + req.body.id_perfil  + ")";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});


// Mostrar todas as habilidades (Read)
app.get('/habilidades', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM Tbl_Habilidades ORDER BY NOME_HABILIDADE COLLATE NOCASE';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});


// Monta o formulário (Update)
app.get('/atualiza_habilidade', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM Tbl_Habilidades WHERE ID_HABILIDADES="+ req.query.id_habilidade;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// Atualiza campo (Update)
app.post('/atualiza_habilidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE Tbl_Habilidades SET nome_habilidade='" + req.body.habilidade + "', nivel = '" + req.body.nivel + "' WHERE ID_HABILIDADES='" + req.body.id_habilidades + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>HABILIDADE ATUALIZADA COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// Exclui uma habilidade (Delete)
app.get('/remove_habilidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM Tbl_Habilidade WHERE ID_HABILIDADES='" + req.query.id_habilidade + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>HABILIDADE REMOVIDA COM SUCESSO!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});