<?php
require_once dirname ( __FILE__ ) . '/../entity/CharacterDataVaultEntity.php';
require_once dirname ( __FILE__ ) . '/../dao/CharacterDataVaultDao.php';
require_once dirname ( __FILE__ ) . '/../util/ThunderUtil.php';

header ( 'Content-Type: application/xhtml+xml; charset=utf-8' );
if ($_SERVER ['REQUEST_METHOD'] === 'POST') {
	$cDao = new CharacterDataVaultDao ();
	$charaData = json_decode ( $_POST ['charaData'] ,true);
	$pass = $charaData["password"];
	$id = $charaData["dataId"];

	// yellow
	// パスワードが設定されている場合、チェック
	$passcheck = $cDao->selectByPk( $charaData ['dataId'] );
	if (count ($passcheck) == 0) {
		$msgs = array(
				"result"=>'yellow',
				"message" =>'該当するデータが存在しません。',

		);
		echo json_encode($msgs);
		return ;
	}
	// 結果からパスワードチェック
	$dbPass = $passcheck[0]->getPassword();
	if ($pass != $dbPass) {
		$msgs = array(
				"result"=>'yellow',
				"message" =>'パスワードが異なります。',

		);
		echo json_encode($msgs);
		return ;
	}
	$cDao->passClear($id);

	$msgs = array(
			"result"=>'green',
			"message" =>'パスワードを解除しました'

	);
	echo json_encode($msgs);

}
