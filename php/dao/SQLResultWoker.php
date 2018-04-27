<?php
require_once dirname(__FILE__) . '/../adapter/IAdapter.php';
class SQLResultWoker {
	protected $adapter;
	public function __construct(IAdapter $adapter) {
		$this->adapter = $adapter;
	}
	public function resultWork($result){
		return null;
	}
}
/**
 * selectSQLはEntityに詰めて返却する
 * @author thunder-PC
 *
 */
class SelectResultWorker extends SQLResultWoker{
	public function resultWork($result) {
		return $this->adapter->resultSet($result);
	}
}
// select以外は戻り値をそのまま返す。
class UpdateResultWorker extends SQLResultWoker{
	public function resultWork($result) {
		return $result;
	}
}
class DeleteResultWorker extends SQLResultWoker{
	public function resultWork($result) {
		return $result;
	}
}
class InsertResultWorker extends SQLResultWoker{
	public function resultWork($result) {
		return $result;
	}
}