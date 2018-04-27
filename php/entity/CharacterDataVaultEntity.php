<?php
require_once dirname ( __FILE__ ) . '/IEntity.php';
header ( "Content-type: text/plain; charset=UTF-8" );

/**
 * CharacterDataVaultTableテーブル用Entity
 *
 * @author thunder-PC
 *
 */
class CharacterDataVaultEntity extends IEntity {
	public $id = "";
	public $plName = "";
	public $pcName = "";
	public $data = "";
	public $imageId;
	public $password = "";
	public $searchFlg = 0;
	public function createBaindValue() {
		return [
				$this->id,
				$this->plName,
				$this->pcName,
				$this->data,
				$this->imageId,
				$this->password,
				$this->searchFlg
		];
	}
	public function getId() {
		return $this->id;
	}
	public function setId($input) {
		$this->id = $input;
	}
	public function getPlName() {
		return $this->plName;
	}
	public function setPlName($input) {
		$this->plName = $input;
	}
	public function getPcName() {
		return $this->pcName;
	}
	public function setPcName($input) {
		$this->pcName = $input;
	}
	public function getData() {
		return $this->data;
	}
	public function setData($input) {
		$this->data = $input;
	}
	public function getImageId() {
		return $this->imageId;
	}
	public function setImageId($input) {
		$this->imageId = $input;
	}
	public function getPassword() {
		return $this->password;
	}
	public function setPassword($input) {
		$this->password = $input;
	}
	public function getSearchFlg() {
		return $this->searchFlg;
	}
	public function setSearchFlg($input) {
		$this->searchFlg = $input;
	}
}