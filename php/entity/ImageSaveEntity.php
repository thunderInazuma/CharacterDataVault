<?php
require_once dirname ( __FILE__ ) . '/IEntity.php';
class ImageSaveEntity extends IEntity {

	public $imageId = "";
	public $imageData;
	public $imageName = "";

	public function createBaindValue() {
		return [
				$this->imageId,
				$this->imageData,
				$this->imageName
		];
	}

	public function getImageId() {
		return $this->id;
	}
	public function setImageId($input) {
		$this->imageId = $input;
	}


	public function getImageData() {
		return $this->imageData;
	}
	public function setImageData($input) {
		$this->imageData = $input;
	}
	public function getImageName() {
		return $this->imageName;
	}
	public function setImageName($input) {
		$this->imageName = $input;
	}
}
