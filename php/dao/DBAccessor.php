<?php
require_once dirname(__FILE__) . '/SQLResultWoker.php';
header ( "Content-type: text/plain; charset=UTF-8" );

/**
 * データベースへのアクセスを行う
 *
 * @author thunder-PC
 *
 */
class DBAccessor {
	private $sv = "";
	private $dbname = "";
	private $user = "";
	private $pass = "";
	// テーブルによって変える
	private $adapter;

	// コネクション
	private $conn;

	// PDOオブジェクト
	private $pdo;
	// 設定ファイル名
	private $iniFile = "dbAcsessconfig.ini";

	// SQLの結果によって動作を変更する
	private $resultWoker;

	/**
	 * コンストラクタ
	 * コネクションを開く
	 */
	public function __construct(IAdapter $adapter) {
		$readData = parse_ini_file ( $this->iniFile );
		$this->sv = $readData ['sv'];
		$this->dbname = $readData ['dbname'];
		$this->user = $readData ['user'];
		$this->pass = $readData ['pass'];

		$this->adapter = $adapter;
		// PDO に変更
		$this->pdo = new PDO(
				"mysql:host=".$this->sv.";dbname=".$this->dbname.";charset=utf8",
				$this->user,
				$this->pass
				,[
						PDO::ATTR_PERSISTENT => true,
						PDO::ATTR_EMULATE_PREPARES => false,
						PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
						PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
				]
				);
	}
	/**
	 * インスタンスの破棄時にコネクションを閉じる
	 */
	public function __destruct() {
		//接続終了
		$pdo = null;
	}
	/**
	 *
	 * @param unknown $query
	 * @return unknown
	 */
	public function dbAcsess($query, $bindValue) {

		// SQLの種類によって返却時の動作を変更
		$this->sqlSwitch($query);

		//PDO に変更
		$stmt = $this->pdo->prepare($query);
		if ($bindValue) {
			$this->adapter->setBaindValue($stmt, $bindValue);
		}
		$stmt->execute();
		return $this->resultWoker->resultWork($stmt);
	}
	/**
	 * SQLの種類によって処理を切り替える
	 */
	private function sqlSwitch($query) {
		$prefix = substr ( $query, 0, 6 );
		$prefix = strtoupper ( $prefix );
		switch ($prefix) {
			case "SELECT" :
				$this->resultWoker = new SelectResultWorker($this->adapter);
				break;
			case "UPDATE" :
				$this->resultWoker = new UpdateResultWorker($this->adapter);
				break;
			case "INSERT" :
				$this->resultWoker = new InsertResultWorker($this->adapter);
				break;
			case "DELETE" :
				$this->resultWoker = new DeleteResultWorker($this->adapter);
				break;
			default :
				$this->resultWoker = new SQLResultWoker($this->adapter);
				break;
		}
	}
}