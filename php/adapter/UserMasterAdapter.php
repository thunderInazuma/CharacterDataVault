<?php
require_once dirname(__FILE__) . '/IAdapter.php';
require_once dirname(__FILE__) . '/../entity/UserMasterEntity.php';

class UserMasterAdapter extends IAdapter {

	public function setEntity($resultRow) {
		$entity = new UserMasterEntity();
		$entity->setName($resultRow['name']);
		$entity->setUserId($resultRow['userID']);
		$entity->setPassword($resultRow['password']);
		return $entity;
	}
}
