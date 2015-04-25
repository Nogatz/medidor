	document.addEventListener("deviceready", onDeviceReady, false);
	console.log("teste");
	
	var db;
	function onDeviceReady(){
			console.log("ondevice ready");
			db = window.openDatabase("Medidor", "1.0", "medidorbd", 2*1024*1024);
			db.transaction(createDb, erroCB, successCB);
		}

	function createDb(tx){
		console.log("create");
			//tx.executeSql('DROP TABLE IF EXISTS BEBIDAS');
			tx.executeSql('CREATE TABLE IF NOT EXISTS BEBIDAS(nome,qtdalcool,litragem)');
		}

	function erroCB(err){
			console.log("error db" +  err.code);
			alert('Problema com o banco de dados' + err.code );
		}

	function successCB(){
			console.log("sucesso db");
			//alert('Tudo certo, conectou' );
		}

	function insertDB(tx){
		var _nome = $("[name='nome-bebida']").val();			
		var _qtdalcool = $("[name='qdt-alcool']").val();			
		var _litragem = $("[name='litragem-bebida']").val();		
		var sql = 'INSERT INTO BEBIDAS(nome,qtdalcool,litragem) VALUES(?,?,?)';
		tx.executeSql(sql, [_nome,_qtdalcool,_litragem], sucessQueryDB, erroCB);
		}
		
		var htmlstring="";
	function renderList(tx, results){
			var htmlstring = '';
			
			var len = results.rows.length;
					
			for (var i=0; i<len; i++){
				htmlstring += '<li>' + results.rows.item(i).nome + '<li>';
				}
		}
		
	$('#ListView').html(htmlstring);
	$('#ListView').listview('refresh');	
		
	function sucessQueryDB(){
		tx.executeSql('SELECT * FROM BEBIDAS', [], renderList, erroCB);
				
		}

	function submitform(){
		console.log("teste2");
		db.transaction(insertDB, erroCB);
				console.log("teste3");
		$.mobile.changePage("#confirmacaocadastro", {reverse: false, transition:"slide"});
		return false;
		}
