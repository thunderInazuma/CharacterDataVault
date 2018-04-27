<?php
require_once dirname(__FILE__) . '/IEntity.php';
header("Content-type: text/plain; charset=UTF-8");

/**
 * userMasterテーブル用Entity
 * @author thunder-PC
 *
 */
class UserMasterEntity extends IEntity{
	private $userID="";
	private $name="";
	private $password ="";

	public function getUserId() {
		return $this->userID;
	}
	public function setUserId($input) {
		$this->userID = $input;
	}

	public function getName() {
		return $this->name;
	}

	public function setName($input) {
		$this->name = $input;
	}

	public function getPassword() {
		return $this->password;
	}
	public function setPassword($input) {
		$this->password = $input;
	}
}