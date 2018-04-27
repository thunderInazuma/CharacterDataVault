var URL_BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
// ------------------------------------------------------------
// ドラッグアンドドロップで受け取るファイルのリスト
// ------------------------------------------------------------
var drop_file_list = new Array();
// 匿名関数を即時実行
(function() {

	// ------------------------------------------------------------
	// サポートチェック
	// ------------------------------------------------------------
	if (!(window.addEventListener))
		return;
	if (!(window.File))
		return;
	if (!(window.FormData))
		return;

	// ------------------------------------------------------------
	// 各要素を取得する
	// ------------------------------------------------------------
	// "drop_area" という ID 属性のエレメントを取得する
	var drop_area = document.getElementById("drop_area");

	// "upfile" という ID 属性のエレメントを取得する
	var upfile = document.getElementById("upfile");

	// ------------------------------------------------------------
	// ドラッグ操作中に実行されるイベント（マウスカーソルが要素内に滞在中）
	// ------------------------------------------------------------
	drop_area.addEventListener("dragover", function(e) {
		// ドロップを許可し受け入れを表明
		e.preventDefault();
	});

	// ------------------------------------------------------------
	// ドロップ時に実行されるイベント
	// ------------------------------------------------------------
	drop_area.addEventListener("drop", function(e) {

		// ------------------------------------------------------------
		// デフォルトのドロップ機能を無効化する
		// ------------------------------------------------------------
		e.preventDefault();

		// ------------------------------------------------------------
		// DataTransfer オブジェクトを取得する
		// ------------------------------------------------------------
		var data_transfer = e.dataTransfer;

		// ------------------------------------------------------------
		// ファイルリストを取得する
		// ------------------------------------------------------------
		var file_list = data_transfer.files;
		if (file_list) {
			var i;
			var num = file_list.length;
			for (i = 0; i < num; i++) {
				// File オブジェクトを取得する
				var file = file_list[i];
				drop_file_list = [];
				// リストに追加
				drop_file_list.push(file);
				showFiles(drop_file_list, "drop_area");
				// 画像変更フラグをtrueにする
				document.getElementById("imageChangeFlg").value = "true";
			}
		}
	});
	// "newSave" 保存にイベントを割り付ける
	var newSave = document.getElementById("newSave");
	newSave.addEventListener("click", function(e) {
		if(window.confirm('保存しますか？')){
			insertData();
		}

	});
	// "updateSave" 更新にイベントを割り付ける
	var updateSave = document.getElementById("updateSave");
	updateSave.addEventListener("click", function(e) {
		if(window.confirm('更新しますか？')){
			updateData();
		}
	});
	// "passClear" 更新にイベントを割り付ける
	var passClear = document.getElementById("passClear");
	passClear.addEventListener("click", function(e) {
		if(window.confirm('パスワードを解除しますか？')){
			clearPass();
		}
	});
	// "deleteData" 更新にイベントを割り付ける
//	var deleteData = document.getElementById("deleteData");
//	deleteData.addEventListener("click", function(e) {
//		if(window.confirm('削除しますか？')){
//			if(window.confirm('本当に削除しますか？')){
//				//deleteData();
//			}
//		}
//	});

})();
function createSubmitFormData() {

	// ------------------------------------------------------------
	// 空の FormData オブジェクトを作成する
	// ------------------------------------------------------------
	var formData = new FormData();

	// ------------------------------------------------------------
	// ドラッグアンドドロップで受け取ったファイルリスト
	// ------------------------------------------------------------
	var i;
	var num = drop_file_list.length;
	for (i = 0; i < num; i++) {
		// File オブジェクトを取得する
		var file = drop_file_list[i];
		// 送信データを追加する
		formData.append("upfile", file);
	}

	formData.append("charaData", createFormData());
	return formData
}
function createXMLHttpXMLHttpRequest(submitUrl, callbackFunction) {
	// formDataを作成詰め込み処理まで行う
	var formData = createSubmitFormData();
	// ------------------------------------------------------------
	// XMLHttpRequest オブジェクトを作成
	// ------------------------------------------------------------
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType('charset=UTF-8;');

	// ------------------------------------------------------------
	// XHR 通信に成功すると実行されるイベント
	// ------------------------------------------------------------
	xhr.onload = function(e) {
		console.log(xhr.responseText);
		// コールバック関数
		callbackFunction(xhr);
	};

	// ------------------------------------------------------------
	// 「POST メソッド」「接続先 URL」を指定
	// ------------------------------------------------------------
	xhr.open("POST", submitUrl);

	// ------------------------------------------------------------
	// 「送信データに FormData を指定」「XHR 通信を開始する」
	// ------------------------------------------------------------
	xhr.send(formData);
}
function clearPass() {
	createXMLHttpXMLHttpRequest("../../controller/clearpass.php",
			function(xhr) {
				var data = JSON.parse(xhr.responseText);
				// レスポンスボディを取得する
				if (data["result"] === 'green') {
					alert("パスワードを解除しました");
					document.getElementById("password").value ="";
				} else if (data["result"] === 'yellow') {
					alert(data["message"]);
				}　else if (data["result"] === 'red') {
					alert("サーバーのエラーにより保存に失敗しました");
				}
			});
}
function insertData() {
	createXMLHttpXMLHttpRequest("../../controller/insertCharaData.php",
			function(xhr) {
				var data = JSON.parse(xhr.responseText);
				// レスポンスボディを取得する
				if (data["result"] === 'green') {
					alert("保存しました");
					saveAfter(data);
				} else if (data["result"] === 'yellow') {
					alert(data["message"]);
				} else if (data["result"] === 'red') {
					alert("サーバーのエラーにより保存に失敗しました");
				}
			});
}
function updateData() {
	createXMLHttpXMLHttpRequest("../../controller/updateCharaData.php",
			function(xhr) {
				var data = JSON.parse(xhr.responseText);
				// レスポンスボディを取得する
				if (data["result"] === 'green') {
					alert("更新しました");
					saveAfter(data);
				} else if(data["result"] === 'yellow'){
					// 更新に失敗した場合
					alert(data["message"]);
				} else if (data["result"] === 'red') {
					alert("サーバーのエラーにより更新に失敗しました");
				}
			});
}
function showFiles(files, id) {
	var dom = document.getElementById(id);
	dom.innerHTML = '';

	for (var i = 0, l = files.length; i < l; i++) {
		var file = files[i];
		var elFile = buildElFile(file);
		dom.appendChild(elFile);
	}
}
// 画像ドロップ系 ここから
function buildElFile(file) {
	var elFile = document.createElement('div');
	var text = file.name + ' (' + file.type + ',' + file.size + 'bytes)';
	if (file.type.indexOf('image/') === 0) {
		var elImage = document.createElement('img');
		elImage.src = URL_BLANK_IMAGE;
		elFile.style.width = "100%";
		elFile.style.height = "100%";
		elFile.appendChild(elImage);
		attachImage(file, elImage);
	}

	return elFile;
}
function attachImage(file, elImage) {
	var reader = new FileReader();
	reader.onload = function(event) {
		var src = event.target.result;
		elImage.src = src;
		elImage.setAttribute('title', file.name);
	};
	reader.readAsDataURL(file);
}
// 画像ドロップ系ここまで
/**
 * ギャップおじさんTRPGの送信データを作成します
 *
 * @returns
 */
function createFormData() {
	var obj = {};
	// 一意のID
	obj["dataId"] = document.getElementById("dataId").value;
	// 一意の画像ID
	obj["imageId"] = document.getElementById("imageId").value;
	obj["plName"] = document.getElementById("plName").value;
	obj["pcName"] = document.getElementById("pcName").value;
	obj["data"] = JSON.stringify(createGapOjisanFomData());
	obj["password"] = document.getElementById("password").value;
	obj["searchFlg"] = 0 + document.getElementById("searchFlg").checked;
	// 画像変更フラグ
	obj["imageChangeFlg"] = document.getElementById("imageChangeFlg").value;
	return JSON.stringify(obj);
}
function createGapOjisanFomData() {
	var obj = {};
	// 異能テーブル
	obj["inouTable"] = inouTable.getData();
	// 日常テーブル
	obj["nitijouTable"] = nitijouTable.getData();
	// 拠り所テーブル
	obj["yoriTable"] = yoriTable.getData();
	// スキルテーブル
	obj["skillTable"] = skillTable.getData();
	// 日常設定テーブル
	obj["nitijo"] = nitijo.getData();
	// 拠所設定テーブル
	obj["yoridokoro"] = yoridokoro.getData();
	// 封印テーブル
	obj["sealedTable"] = sealedTable.getData();
	// 光
	obj["hikari"] = document.getElementById("hikari").value;
	// 闇
	obj["yami"] = document.getElementById("yami").value;
	// 出自
	obj["syutuji"] = document.getElementById("syutuji").value;
	// 経験点
	obj["exp"] = document.getElementById("exp").value;
	return obj;
}
/**
 * 共通保存後処理
 */
function saveAfter(data) {
	window.history.pushState('', '', 'gapojisanData.php?id=' + data["id"]);
	var charaDataName = document.getElementById("charaDataName");
	charaDataName.innerText = "キャラ名 : "
			+ document.getElementById("pcName").value;
	// id imageIdをhiddenにセット
	document.getElementById("dataId").value = data["id"];
	document.getElementById("imageId").value = data["imageId"];
	document.title = document.getElementById("pcName").value;
	document.getElementById("updateSave").hidden = false;


	if ("" !== document.getElementById("password")) {
		document.getElementById("passClear").hidden = false;
	}
}
function whiteGapojisanData(data) {
	document.getElementById("plName").value = data["plName"];
	document.getElementById("pcName").value = data["pcName"];
	//document.getElementById("password").value = data["password"];
	document.getElementById("searchFlg").checked = (data["searchFlg"] == "1");
	document.title = data["pcName"];

	var tableData =JSON.parse(data["data"]) ;

	// 光
	document.getElementById("hikari").value = tableData["hikari"];
	// 闇
	document.getElementById("yami").value = tableData["yami"];
	// 出自
	document.getElementById("syutuji").value = tableData["syutuji"];
	// 経験点
	document.getElementById("exp").value = tableData["exp"];
	// 異能テーブル
	inouTable.setData(tableData["inouTable"]);
	//
	nitijouTable.setData(tableData["nitijouTable"]);
	yoriTable.setData(tableData["yoriTable"]);
	skillTable.setData(tableData["skillTable"]);
	nitijo.setData(tableData["nitijo"]);
	yoridokoro.setData(tableData["yoridokoro"]);
	// 封印テーブル
	sealedTable.setData(tableData["sealedTable"]);
	document.getElementById("updateSave").hidden = false;
	if (data["password"] === true) {
		document.getElementById("passClear").hidden = false;
	}
}