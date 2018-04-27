<?php
require_once dirname(__FILE__) . '/../entity/IEntity.php';
abstract class IAdapter {

	/**
	 * データベースから取得した戻り値を返す
	 * @param $resut
	 */
	public function resultSet($result) {
		$entityList = array();
		if (null == $result) {
			return array();
		}
		// PDO形式に変更
		while ($resultRow = $result->fetch(PDO::FETCH_ASSOC)){
			array_push($entityList, $this->setEntity($resultRow));
		}
		return $entityList;
	}
	// setEntityは継承先のクラスごとに実装
	abstract public function setEntity($resultRow);
}