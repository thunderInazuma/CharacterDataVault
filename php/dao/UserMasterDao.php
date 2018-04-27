<?php
require_once dirname(__FILE__) . '/../entity/UserMasterEntity.php';
require_once dirname(__FILE__) . '/AbstractDao.php';
require_once dirname(__FILE__) . '/DBAccessor.php';
require_once dirname(__FILE__) . '/../adapter/UserMasterAdapter.php';
header("Content-type: text/plain; charset=UTF-8");

/**
 * userMasterテーブルへのアクセスを行うDao
 * @author thunder-PC
 *
 */
class UserMasterDao extends AbstractDao{

	/**
	 * コンストラクタ
	 * 初期化時にテーブルの選択
	 */
	public function __construct() {
		$this->DBAccessor = new DBAccessor(new UserMasterAdapter());
	}

	/**
	 * 汎用SQL窓口
	 * @param string $sql
	 */
	public function sql($sql){
		return $this->DBAccessor->dbAcsess($sql);
	}
	/**
	 * 全件検索
	 */
	public function serectAll(){
		;
	}
	/**
	 * 検索
	 * @param string $sql
	 */
	public function serect(IEntity $entity){
		;
	}

	/**
	 * 更新
	 * @param IEntity $entity
	 */
	public function update(IEntity $entity){
		;
	}
	/**
	 * 追加
	 * @param IEntity $entity
	 */
	public function insert(IEntity $entity) {
		;
	}

	/**
	 * 削除
	 * @param IEntity $entity
	 */
	public function delete(IEntity $entity) {
		;
	}
}
