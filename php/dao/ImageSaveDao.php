<?php
require_once dirname(__FILE__) . '/AbstractDao.php';
require_once dirname(__FILE__) . '/DBAccessor.php';
require_once dirname(__FILE__) . '/../entity/ImageSaveEntity.php';
require_once dirname(__FILE__) . '/../adapter/ImageSaveAdapter.php';

class ImageSaveDao extends AbstractDao {

	/**
	 * コンストラクタ
	 * 初期化時にテーブルの選択
	 */
	public function __construct() {
		$this->DBAccessor = new DBAccessor(new ImageSaveAdapter());
	}

	/**
	 * 汎用SQL窓口
	 * @param string $sql
	 */
	public function sql($sql){
		return $this->DBAccessor->dbAcsess($sql,false);
	}
	/**
	 * 全件検索
	 */
	public function serectAll(){
		return $this->DBAccessor->dbAcsess("SELECT * FROM `imagesave`",false);
	}
	/**
	 * PK検索
	 * @param string $id
	 * @return unknown
	 */
	public function selectByPk( $imageId) {
		return $this->DBAccessor->dbAcsess("SELECT * FROM `imagesave`"." WHERE `imageId`='".$imageId."'",false);
	}
	/**
	 * 検索
	 * @param string $sql
	 */
	public function select(IEntity $entity){
		// 		$sql = "INSERT INTO `characterdatavault`(`id`, `plName`, `pcName`, `data`, `imageId`, `password`, `searchFlg`) VALUES (?,?,?,?,?,?,?)";
		// 		$bindValue = $entity->createBaindValue();
		// 		return $this->DBAccessor->dbAcsess($sql, $bindValue);
	}

	/**
	 * 更新
	 * @param IEntity $entity
	 */
	public function update(IEntity $entity){
		$sql = "UPDATE `imagesave` SET `imageData`=:imageData,`imageName`=:imageName WHERE `imageId`=:imageId";
		$bindValue = $entity->createBaindValue();
		return $this->DBAccessor->dbAcsess($sql, $bindValue);
	}
	/**
	 * 追加
	 * @param IEntity $entity
	 */
	public function insert(IEntity $entity) {
		$sql = "INSERT INTO `imagesave`(`imageId`, `imageData`, `imageName`) VALUES (:imageId,:imageData,:imageName) ";
		$bindValue = $entity->createBaindValue();
		return $this->DBAccessor->dbAcsess($sql, $bindValue);
	}

	/**
	 * 削除
	 * @param IEntity $entity
	 */
	public function delete(IEntity $entity) {
		;
	}
}