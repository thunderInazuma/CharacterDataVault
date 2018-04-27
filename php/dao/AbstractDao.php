<?php
abstract class AbstractDao{
	protected $DBAccessor;
	protected $sqlOrder;
	/**
	 * コンストラクタ
	 * 初期化時にテーブルの選択
	 * sqlOrderの選択
	 */
	abstract public function __construct();
	/**
	 * 汎用SQL窓口
	 * @param string $sql
	 */
	abstract public function sql($sql);
	/**
	 * 全件検索
	 */
	abstract public function serectAll();
	/**
	 * 検索
	 * @param string $sql
	 */
	abstract public function select(IEntity $entity);

	/**
	 * 更新
	 * @param IEntity $entity
	 */
	abstract public function update(IEntity $entity);
	/**
	 * 追加
	 * @param IEntity $entity
	 */
	abstract public function insert(IEntity $entity);

	/**
	 * 削除
	 * @param IEntity $entity
	 */
	abstract public function delete(IEntity $entity);
}