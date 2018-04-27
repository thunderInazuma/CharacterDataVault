<?php
/**
 * エンティティのインターフェース
 * @author thunder-PC
 *
 */
// interface IEntity {

// }
abstract class IEntity {
	public function expose() {
		return get_object_vars($this);
	}
	public function toArray() {
		return var_dump((array)$this);
	}
	public function toJson() {
		return json_encode($this->toArray());
	}
}