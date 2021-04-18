<?php
require_once dirname ( __FILE__ ) . '/../entity/CharacterDataVaultEntity.php';
require_once dirname ( __FILE__ ) . '/../dao/CharacterDataVaultDao.php';
require_once dirname ( __FILE__ ) . '/../entity/ImageSaveEntity.php';
require_once dirname ( __FILE__ ) . '/../dao/ImageSaveDao.php';
require_once dirname ( __FILE__ ) . '/../util/ThunderUtil.php';
header ( 'Content-Type: application/xhtml+xml; charset=utf-8' );
if ($_SERVER ['REQUEST_METHOD'] === 'POST') {
	try {
		// キャラクター保管庫Dao
		$charaData = json_decode ( $_POST ['charaData'] ,true);
		$cDao = new CharacterDataVaultDao ();
		$cEntity = new CharacterDataVaultEntity ();
		$cEntity->setId ( $charaData ['dataId'] );
		$cEntity->setPlName ($charaData ['plName']);
		$cEntity->setPcName ( $charaData ['pcName'] );
		$cEntity->setData (  json_encode($charaData ['data']) );
		$cEntity->setPassword ( $charaData ['password'] );
		$cEntity->setSearchFlg ( $charaData ['searchFlg'] );
		$cEntity->setImageId($charaData ['imageId']);

		// yellow
		// パスワードが設定されている場合、チェック
		$passcheck = $cDao->selectByPk( $charaData ['dataId'] );
		if (count ($passcheck) == 0) {
			$msgs = array(
					"result"=>'yellow',
					"message" =>'該当するデータが存在しません。',
					"id"=>$cEntity->getId()

			);
			echo json_encode($msgs);
			return ;
		}
		// 結果からパスワードチェック
		$dbPass = $passcheck[0]->getPassword();
		// passwordが設定されているかつパスワードが間違っている場合
		if ($dbPass !="" && $charaData ['password'] != $dbPass) {
			$msgs = array(
					"result"=>'yellow',
					"message" =>'パスワードが異なります。',
					"id"=>$cEntity->getId()

			);
			echo json_encode($msgs);
			return ;
		}


		// 画像に変更があった場合
		if ($charaData ['imageChangeFlg'] == "true") {
			// 画像を新しく保存した場合
			$imageId = $charaData ['imageId'];
			if ($charaData ['imageId'] == "" ||$charaData ['imageId'] == "undefined") {
				$imageId = ThunderUtil::getUniqueId_img(); // ユニークキー取得
			}
			if (isset ( $_FILES ['upfile'] ['error'] ) && is_int ( $_FILES ['upfile'] ['error'] )) {
				$imageEntity = new ImageSaveEntity();
				$imageEntity->setImageId($imageId);
				// 紐づけを行う
				$cEntity->setImageId($imageId);
				// dataをセット
				$imageEntity->setImageName( $_FILES ['upfile'] ['name'] );
				$imageEntity->setImageData( file_get_contents($_FILES['upfile']['tmp_name']) );
				// Daoを用意する
				$imagePdo = new ImageSaveDao();
				$imagePdo->update( $imageEntity );
			}
		}
		$result = $cDao->update ( $cEntity );
		// 画面に返す値を設定する
		$msgs = array(
				"result"=>'green',
				"message" =>'更新しました',
				"id"=>$cEntity->getId()

		);
		echo json_encode($msgs);
	} catch ( PDOException $e ) {
		http_response_code ( 500 );
		$msgs = array(
				"result"=>'red',
				"message" =>$e->getMessage (),
				"ExceptionType"=>"PDOException"

		);
		echo json_encode($msgs);
	}
}
