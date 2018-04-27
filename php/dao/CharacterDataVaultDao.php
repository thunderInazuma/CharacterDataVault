<?php
require_once dirname(__FILE__) . '/../entity/CharacterDataVaultEntity.php';
require_once dirname(__FILE__) . '/AbstractDao.php';
require_once dirname(__FILE__) . '/DBAccessor.php';
require_once dirname(__FILE__) . '/../adapter/CharacterDataVaultAdapter.php';

/**
 * CharacterDataVaultテーブルへのアクセスを行うDao
 * @author thunder-PC
 *
 */
class CharacterDataVaultDao extends AbstractDao{

	/**
	 * コンストラクタ
	 * 初期化時にテーブルの選択
	 */
	public function __construct() {
		$this->DBAccessor = new DBAccessor(new CharacterDataVaultAdapter());
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
		return $this->DBAccessor->dbAcsess("SELECT * FROM `characterdatavault`",false);
	}
	/**
	 * PK検索
	 * @param string $id
	 * @return unknown
	 */
	public function selectByPk( $id) {
		return $this->DBAccessor->dbAcsess("SELECT * FROM `characterdatavault`"." WHERE `id`='".$id."'",false);
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
		$sql = "UPDATE `characterdatavault` SET `plName`=:plName,`pcName`=:pcName,`data`=:data,`imageId`=:imageId,`password`=:password,`searchFlg`=:searchFlg WHERE `id` =:id";
		$bindValue = $entity->createBaindValue();
		return $this->DBAccessor->dbAcsess($sql, $bindValue);
	}
	/**
	 * パスワードの解除
	 * @param unknown $id
	 * @return unknown
	 */
	public function passClear($id) {
		$sql = "UPDATE `characterdatavault` SET `password`=\"\" WHERE `id`=\"". $id . "\"";
		return $this->DBAccessor->dbAcsess($sql, false);
	}

	/**
	 * 追加
	 * @param IEntity $entity
	 */
	public function insert(IEntity $entity) {
		$sql = "INSERT INTO `characterdatavault`(`id`, `plName`, `pcName`, `data`, `imageId`, `password`, `searchFlg`) VALUES (:id, :plName, :pcName, :data, :imageId, :password, :searchFlg) ";
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
