const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const sqlite3 = require('sqlite3').verbose();
const DBPATH = './data/DBapp_41.db';

/* Servidor aplicação */
const hostname = '127.0.0.1';
const port = 3071;
const app = express();
app.use(express.static("./frontend/"));
function obterColID(nome_col) {
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var id_col = 0;
	var sql = "SELECT ID_COLETOR FROM TblColetor WHERE NOME_COLETOR = " + 
									     	"'" + nome_col + "'";
	  console.log(sql);
	  db.all(sql, [],  (err, rows ) => {
		  if (err) {
			  throw err;
		  }
		  id_col = rows[0]['ID_COLETOR'];
		  console.log("Objeto 0 - ID_COLETOR:" + rows[0]['ID_COLETOR']);
	  });
	  db.close(); // Fecha o banco	
	  return(id_col);
};
/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());
// Retorna todos registros (é o R do CRUD - Read)
app.get('/coletores', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	console.log("EndPoint /coletores");
	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM TblColetor';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});
app.get('/protocolos', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM TblPROTOCOLO';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});
////////////////////////////////////////////////
// Insere um registro (é o C do CRUD - Create)
app.post('/colinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS	
	sql = "INSERT INTO TblColetor (ID_COLETOR, NOME_COLETOR) " + 
	                      "VALUES (" + req.body.id  + 
						       ", '" + req.body.nome + "')";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
			console.log("Erro de inserção:" + err);
		}
	});
	db.close(); // Fecha o banco
	res.end();
});
// Insere um registro (é o C do CRUD - Create)
app.post('/protinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "INSERT INTO TblPROTOCOLO (ID_PROTOCOLO,ID_COLETOR, NOME_PROTOCOLO) " + 
	                      "VALUES (" + req.body.id_prot  +  ", " +
						               req.body.id_col   +  ", '" + 
									   req.body.nome_prot + "')";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
			console.log("Erro de inserção:" + err);
		}
	});
	db.close(); // Fecha o banco
	res.end();
});
// Insere um registro (é o C do CRUD - Create)
app.post('/protinsertcol', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var idcol = obterColID(req.body.nome_col);	
	sql = "INSERT INTO TblPROTOCOLO (ID_PROTOCOLO,ID_COLETOR, NOME_PROTOCOLO) " + 
	                      "VALUES (" + req.body.id_prot  +  ", " +
										  idcol   + 
						       ", '" + req.body.nome_prot + "')";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});
// Atualiza um registro (é o U do CRUD - Update)
app.post('/colupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	//res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "UPDATE TblColetor SET nome = '" + req.body.nome + 
	    "' WHERE ID_COLETOR = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});
// Exclui um registro (é o D do CRUD - Delete)
app.post('/coldelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM TblColetor WHERE ID_COLETOR = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});
// Exclui um registro (é o D do CRUD - Delete)
app.post('/coldelete_nome', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "DELETE FROM TblColetor WHERE NOME_COLETOR = '" + req.body.nome_col + "'";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});
// Exclui um registro (é o D do CRUD - Delete)
app.post('/protdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM TblPROTOCOLO WHERE ID_PROTOCOLO = " + req.body.id_prot;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});
app.post('/protdeletecol', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var idcol = obterColID(req.body.nome_col);	
	sql = "DELETE FROM TblPROTOCOLO WHERE ID_COLETOR = " + idcol;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});
/* Servidor aplicação */
app.listen(port, hostname, () => {
  console.log("Endpoints:");
  console.log(`Page server running at http://${hostname}:${port}/coletores`);
  console.log(`Page server running at http://${hostname}:${port}/protocolos`);
  console.log(`Page server running at http://${hostname}:${port}/colinsert`);
  console.log(`Page server running at http://${hostname}:${port}/colupdate`);
  console.log(`Page server running at http://${hostname}:${port}/coldelete`);
  console.log(`Page server running at http://${hostname}:${port}/protinsert`);
  console.log(`Page server running at http://${hostname}:${port}/protinsertcol`);
  console.log(`Page server running at http://${hostname}:${port}/protdelete`);
  console.log(`Page server running at http://${hostname}:${port}/protdeletecol`);
});