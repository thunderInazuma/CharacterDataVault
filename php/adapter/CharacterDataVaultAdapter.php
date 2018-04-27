<?php
require_once dirname(__FILE__) . '/IAdapter.php';
require_once dirname(__FILE__) . '/../entity/CharacterDataVaultEntity.php';
/**
 * 汎用キャラデータ保管テーブルへアクセスするためのアダプター
 * @author thunder-PC
 *
 */
class CharacterDataVaultAdapter extends IAdapter {

	public function setEntity($resultRow) {
		$entity = new CharacterDataVaultEntity();
		if (isset($resultRow['id'])) {
			$entity->setId($resultRow['id']);
		}
		if (isset($resultRow['plName'])) {
			$entity->setPlName($resultRow['plName']);
		}
		if (isset($resultRow['pcName'])) {
			$entity->setPcName($resultRow['pcName']);
		}
		if (isset($resultRow['data'])) {
			$entity->setData($resultRow['data']);
		}
		if (isset($resultRow['imageId'])) {
			$entity->setImageId($resultRow['imageId']);
		}
		if (isset($resultRow['password'])) {
			$entity->setPassword($resultRow['password']);
		}
		if (isset($resultRow['searchFlg'])) {
			$entity->setSearchFlg($resultRow['searchFlg']);
		}
		return $entity;
	}


	public function setBaindValue($pdo ,$bindValue) {
		$pdo->bindValue(':id', $bindValue[0], PDO::PARAM_STR);
		$pdo->bindValue(':plName', $bindValue[1], PDO::PARAM_STR);
		$pdo->bindValue(':pcName', $bindValue[2], PDO::PARAM_STR);
		$pdo->bindValue(':data', $bindValue[3], PDO::PARAM_STR);
		$pdo->bindValue(':imageId', $bindValue[4], PDO::PARAM_STR);
		$pdo->bindValue(':password', $bindValue[5], PDO::PARAM_STR);
		$pdo->bindValue(':searchFlg', $bindValue[6], PDO::PARAM_INT);
	}
}
