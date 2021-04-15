<?php
require_once dirname ( __FILE__ ) . '/../../entity/CharacterDataVaultEntity.php';
require_once dirname ( __FILE__ ) . '/../../dao/CharacterDataVaultDao.php';
require_once dirname ( __FILE__ ) . '/../../util/ThunderUtil.php';
header ( 'Content-Type: text/html; charset=UTF-8' );
?>
<!DOCTYPE html>
<html lang="jp">
<link rel="shortcut icon" href="../favicon/favicon.ico">
<meta charset="UTF-8">
<title>ギャップおじさんキャラシ保管庫</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css"></link>
<script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
<script src="../js/CharacterData.js"></script>
<script src="../js/search.js"></script>
<style type="text/css">
.tablePagination {
	padding-left: 0;
	margin-top: 1em;
}

.tablePagination:before {
	content: "Seiten: ";
}

.tablePagination li {
	cursor: pointer;
	display: inline-block;
	list-style: none;
	padding: 2px 9px;
}

.tablePagination li:hover {
	background: #eee;
}

.tablePagination .current {
	background: #26b;
	color: #fff;
}
</style>
</head>
<body>
	<h2>ギャップおじさんTRPG キャラクターシート作成</h2>
	煙草屋さん製作
	<a target="_blank"
		href="https://tabakoya-3.jimdo.com/%E3%82%B5%E3%82%A4%E3%82%B3%E3%83%AD%E3%83%95%E3%82%A3%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3/%E3%82%AE%E3%83%A3%E3%83%83%E3%83%97%E3%81%8A%E3%81%98%E3%81%95%E3%82%93trpg/">
		「ギャップおじさんTRPG」 </a> に対応したオンラインキャラクターシート保管庫です。
	<br />
	<div style="font-size: 12px;">
		キャラクター作成や、おじさんの設定自慢などお好きに使ってください。<br />
		画像は「png」「jpg」「jpeg」が使えるはずですが、動作確認はあまりしていません。<br />
		保存したら、そのURLをブックマークすることで簡単に見返すことができます。<br />
		パスワード設定したり、一覧に非表示にしたりもできます。<br />
		異能スキル表などの右上にある「編集OK」「編集NG」を切り替えることで、クリックミスを防げます。<br />
	</div>
	<br />
	<a href="gapojisanData.php" target="_blank">キャラクターシート新規作成</a>
	<table id="table" border="1" cellspacing="0">
		<thead>
			<tr>
				<th>id</th>
				<th>プレイヤー名</th>
				<th>キャラクター名</th>
			</tr>
		</thead>
		<tbody>
	<?php
			$cDao = new CharacterDataVaultDao ();
			$data = $cDao->sql ( "SELECT `id`, `plName`, `pcName` FROM `characterdatavault` WHERE `searchFlg` =0" );
			foreach ( $data as $test ) :
				?>
			<tr>
				<td><?php echo htmlspecialchars($test->id);?></td>
				<td><?php echo htmlspecialchars($test->plName);?></td>
				<td><a
					href="gapojisanData.php?id=<?php echo htmlspecialchars($test->id);?>"
					target="_blank"><?php echo htmlspecialchars($test->pcName);?></a></td>
			</tr>
<?php endforeach; ?>
</tbody>
	</table>
	<br /> 「編集NG」状態だと、表をクリックしても色が付きません
	<br /> 意見・要望・質問に関しては
	<a href="https://twitter.com/Thunder_meikyou" target="_blank">@Thunder_meikyou</a>までお願いします。<br />
	<a
		href="http://inazuma-project.raindrop.jp/wordPress_inazuma/2017/02/23/%E3%82%AE%E3%83%A3%E3%83%83%E3%83%97%E3%81%8A%E3%81%98%E3%81%95%E3%82%93trpg%E3%81%AE%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC%E4%BF%9D%E7%AE%A1%E5%BA%AB%E3%82%92%E4%BD%9C%E3%82%8D/">
		InazumaProject 作った人のホームページ</a>
</body>
</html>