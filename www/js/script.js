	document.addEventListener("deviceready", onDeviceReady, false);
	console.log("teste");
	
	var db;
	function onDeviceReady(){
			console.log("ondevice ready");
			db = window.openDatabase("Medidor2", "1.0", "medidorbd2", 2*1024*1024);
			db.transaction(createDb, erroCB, successCB);
		}

	function createDb(tx){
			tx.executeSql('DROP TABLE IF EXISTS BEBIDAS');
			tx.executeSql('CREATE TABLE IF NOT EXISTS BEBIDAS(nome,qtdalcool,litragem)');

		}

	function erroCB(err){
			alert('Problema com o banco de dados' + err.code );
		}

	function successCB(){
			console.log("sucesso db");
			alert('Tudo certo, conectou' );
		}

	function insertDB(tx){
		alert("na função de insersão");
		var _nome = $("[name='nome-bebida']").val();			
		var _qtdalcool = $("[name='qdt-alcool']").val();			
		var _litragem = $("[name='litragem-bebida']").val();		
		var sql = 'INSERT INTO BEBIDAS(nome,qtdalcool,litragem) VALUES(?,?,?)';
		tx.executeSql(sql, [_nome,_qtdalcool,_litragem], sucessQueryDB, erroCB);
		alert("sql" + sql + " nome"+ _nome);
		}
		
	function renderList(tx, results){
		alert("entrou no render list");
			var htmlstring = '';
			var len = results.rows.length;
					
			for (var i=0; i<len; i++){
				htmlstring += '<li>' + results.rows.item(i).nome + '<li>';
				}
			$('#listview').html(htmlstring);
			$('#listview').listview('refresh');	
		
		}
				
	function sucessQueryDB(tx, results){
		alert("success" + results.rows.lenght);
		tx.executeSql('SELECT nome FROM BEBIDAS', [], renderList, erroCB);	
		}

	function submitform(){
		alert("na função de no submit");
		db.transaction(insertDB, erroCB);
		$.mobile.changePage("#confirmacaocadastro", {reverse: false, transition:"slide"});
		return false;
		}
