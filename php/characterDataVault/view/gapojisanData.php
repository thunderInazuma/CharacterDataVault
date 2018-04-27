<?php
require_once dirname ( __FILE__ ) . '/../../entity/CharacterDataVaultEntity.php';
require_once dirname ( __FILE__ ) . '/../../dao/CharacterDataVaultDao.php';
require_once dirname ( __FILE__ ) . '/../../util/ThunderUtil.php';
header ( 'Content-Type: text/html; charset=UTF-8' );
$id = "";
$imageId = "";
$data = null;
if (isset ( $_GET ["id"] )) {
	$id = $_GET ["id"];
	try {
		$cDao = new CharacterDataVaultDao ();
		$result = $cDao->selectByPk ( $id );
		if (array_key_exists ( 0, $result )) {
			$data = $result [0];
			$imageId = $data->getImageId ();
		} else {
			// データが無い場合は初期表示
			$id = "";
			$imageId = "";
			$data = null;
		}
	} catch ( Exception $e ) {
	}
}

?>
<!DOCTYPE html>
<html>
<head>
<link rel="shortcut icon" href="favicon.ico">
<meta charset="UTF-8">
<title>ギャップおじさん新規作成</title>
<link rel="stylesheet" type="text/css" href="../css/gapojisan.css">
<script type="text/javascript" src="../js/CharacterData.js"></script>
<script type="text/javascript" src="../js/gapojisan.js"></script>
<script type="text/javascript" src="../js/gapojisanSkill.js"></script>
</head>
<body>
	<input type="hidden" id="dataId" value="<?php echo $id;?>"></input>
	<input type="hidden" id="imageId" value="<?php echo $imageId;?>"></input>
	<div id="headerArea">
		<ul id="dropmenu">
			<li><a id="charaDataName">
			<?php
			if ($data != null) {
				echo "キャラ名 : " . ThunderUtil::h ( $data->getPcName () );
			} else {
				echo "新規データ名：";
			}
			?>
			</a>
				<ul>

					<!-- <li><a id="deleteData">データを削除する</a></li> -->
				</ul></li>
<!-- 			<li><a>メニュー</a> -->
<!-- 				<ul> -->
<!-- 					<li id="newSave"><a>新規保存(複製して保存)</a></li> -->
<!-- 					<li id="updateSave" hidden="hidden"><a>更新</a></li> -->
<!-- 					<li><a href="search.php">保管庫Topに戻る</a></li> -->
					<!-- <li><a>保管庫TOPに戻る</a></li> -->
<!-- 				</ul></li> -->
					<li id="newSave"><a>新規保存(複製して保存)</a></li>
					<li id="updateSave" hidden="hidden"><a>更新</a></li>
					<li><a href="search.php">保管庫Topに戻る</a></li>
		</ul>
	</div>
	<!-- 画像変更フラグ -->
	<input type="hidden" id="imageChangeFlg" value="false"></input>
	<div id="contentsArea">
		<div id="charaData"></div>
		<table border="1" cellspacing="0" align="left">
			<tr>
				<td>パスワード</td>
				<td><input id="password" /></td>
				<td>出自(設定・備考)</td>
			</tr>
			<tr>
				<td><input id="passClear" type="button" value="パスワード解除"
					hidden="hidden" /></td>
				<td><input type="checkbox" id="searchFlg" /><label for="searchFlg">一覧に表示しない</label></td>
				<td rowspan="8"><textarea id="syutuji"
						style="height: 210px; width: 350px;"></textarea></td>
			</tr>
			<tr>
				<td class="mainDataHeaderCell">プレイヤー名</td>
				<td><input type="text" class="mainData" id="plName"></td>

			</tr>
			<tr>
				<td>キャラクター名</td>
				<td><input type="text" class="mainData" id="pcName"></td>

			</tr>
			<tr>
				<td>光</td>
				<td><input type="text" class="mainData" id="hikari"></td>
			</tr>
			<tr>
				<td>闇</td>
				<td><input type="text" class="mainData" id="yami"></td>
			</tr>
			<tr>
				<td>経験点</td>
				<td><input type="text" class="mainData" id="exp"></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
			</tr>
			<!--
<tr>
<td>どどんとふ連携URL</td>
<td><input type="text" class="mainData"></td>
</tr>
<tr>
<td>部屋No.</td>
<td><input type="text" class="mainData"></td>
</tr>
<tr>
<td>部屋パスワード</td>
<td><input type="text" class="mainData"></td>
</tr>
<tr>
<td></td>
<td><button>コマ作成</button></td>
</tr>
-->
		</table>
		<table border="1" cellspacing="0">
			<tr>
				<td>キャラクター画像 画像をドロップ</td>
			</tr>
			<tr>
				<td rowspan="4" valign="top"><div id="drop_area"
						style="width: 230px; height: 230px; background: #bce2e8;">
						<?php

						if ($imageId != "") {
							echo "<img src=\"../../controller/dispImage.php?imageId=" . $imageId . "\">";
						}
						?>
						</div>

			</tr>
		</table>
		<br clear="all">
		<!-- 封印テーブル -->
		<div class="sealedTable" id="sealedTable"></div>
		<div class="sfTable" id="sfTable"></div>
		<div class="nitijouTable" id="nitijouTable"></div>
		<div class="yoriTable" id="yoriTable"></div>
		<br clear="all">
		<br clear="all">
		<input type="button" value="日常行追加" onclick="nitijo.addRow();"/>
		<input type="button" value="日常行削除" onclick="nitijo.removeLastRow();"/>
		<input type="button" value="拠所行追加" onclick="yoridokoro.addRow();" style="left: 220px;position: relative;"/>
		<input type="button" value="拠所行削除" onclick="yoridokoro.removeLastRow();"style="left: 220px;position: relative;" />
		<div class=nitijo id="nitijo"></div>
		<div class="yoridokoro" id="yoridokoro"></div>

		<br clear="all"> <br clear="all">
		<div class="skillTable" id="skillTable"></div>
		<datalist id='skillDataList'>
			<option value='根回し'></option>
			<option value='馬鹿め、影武者だ'></option>
			<option value='今だ！'></option>
			<option value='エキスパート'></option>
			<option value='私だ'></option>
			<option value='補給'></option>
			<option value='揉み消し'></option>
			<option value='私につけ'></option>
			<option value='セーフハウス'></option>
			<option value='仕込み'></option>
			<option value='情報戦'></option>
			<option value='戦場操作'></option>
			<option value='ワイヤー'></option>
			<option value='身代わり'></option>
			<option value='ダメ押し'></option>
			<option value='カタストロフ'></option>
			<option value='神出鬼没'></option>
			<option value='サトリ'></option>
			<option value='因果応報'></option>
			<option value='煉獄'></option>
			<option value='暗器'></option>
			<option value='鎧袖一触'></option>
			<option value='飛礫'></option>
			<option value='常在戦場'></option>
			<option value='プレコグ'></option>
			<option value='ポゼッション'></option>
			<option value='サモン'></option>
			<option value='オーダー'></option>
			<option value='フォース'></option>
			<option value='カノン'></option>
			<option value='ガーディアン'></option>
			<option value='ワールド・イズ・マイン'></option>
			<option value='アクセラレーター'></option>
			<option value='リミットブレイク'></option>
			<option value='ナイトビジョン'></option>
			<option value='ボディミミック'></option>
			<option value='フルアーマー'></option>
			<option value='アタッチメント'></option>
			<option value='ハードワイヤード'></option>
			<option value='フランケンシュタイン'></option>
			<option value='パターン：ガイスト'></option>
			<option value='パターン：カメレオン'></option>
			<option value='パターン：ゴリラ'></option>
			<option value='パターン：フェニックス'></option>
			<option value='※パターン：インスマス'></option>
			<option value='パターン:クルースニク'></option>
			<option value='パターン：エンタングル'></option>
			<option value='パターン：ノスフェラトゥ'></option>
		</datalist>

		<input type="button" value="行追加" id="addButton"
			onclick="skillTable.addRow()"> <input type="button" value="末尾行削除"
			id="removeButton" onclick="skillTable.removeLastRow()"> <br
			clear="all"> <br clear="all"> <br clear="all"> <a href="search.php">保管庫Topに戻る</a>
		<a
			href="http://inazuma-project.raindrop.jp/wordPress_inazuma/2017/02/23/%E3%82%AE%E3%83%A3%E3%83%83%E3%83%97%E3%81%8A%E3%81%98%E3%81%95%E3%82%93trpg%E3%81%AE%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC%E4%BF%9D%E7%AE%A1%E5%BA%AB%E3%82%92%E4%BD%9C%E3%82%8D/">
			InazumaProject 作った人のホームページ</a>
	</div>
	<script type="text/javascript" src="../js/fileUpload.js"></script>
	<script type="text/javascript">
				function inputData() {
				<?php
				if ($data != null) {
					echo "var data = {";
					echo "id : '" . $data->getId () . "',\r\n";
					echo "plName : '" . $data->getPlName () . "',\r\n";
					echo "pcName : '" . $data->getPcName () . "',\r\n";
					echo "data :" . $data->getData () . ",\r\n";
					if ("" != $data->getPassword ()) {
						echo "password : true,\r\n";
					}
					// echo "password : '" . $data->getPassword () . "',\r\n";
					echo "searchFlg : '" . $data->getSearchFlg () . "',\r\n";
					echo "imageId : '" . $data->getImageId () . "',\r\n";
					echo "};\r\n";
					echo "whiteGapojisanData(data);";
				}
				?>
				}

    </script>
</body>
</html>