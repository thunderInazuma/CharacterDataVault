<?php
require_once dirname(__FILE__) . '/IAdapter.php';
require_once dirname(__FILE__) . '/../entity/ImageSaveEntity.php';


class ImageSaveAdapter extends IAdapter {


	public function setEntity($resultRow) {
		$entity = new ImageSaveEntity();
		if (isset($resultRow['imageId'])) {
			$entity->setImageId($resultRow['imageId']);
		}
		if (isset($resultRow['imageData'])) {
			$entity->setImageData($resultRow['imageData']);
		}
		if (isset($resultRow['imageName'])) {
			$entity->setImageName($resultRow['imageName']);
		}
		return $entity;
	}
	/**
	 * pdoにマッピングする
	 * @param unknown $pdo
	 * @param unknown $bindValue
	 */
	public function setBaindValue($pdo ,$bindValue) {
		$pdo->bindValue(':imageId', $bindValue[0], PDO::PARAM_STR);
		$pdo->bindValue(':imageData', $bindValue[1], PDO::PARAM_LOB);
		$pdo->bindValue(':imageName', $bindValue[2], PDO::PARAM_STR);
	}
}

