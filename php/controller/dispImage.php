<?php
require_once dirname ( __FILE__ ) . '/../entity/ImageSaveEntity.php';
require_once dirname ( __FILE__ ) . '/../dao/ImageSaveDao.php';
require_once dirname ( __FILE__ ) . '/../util/ThunderUtil.php';

$imageId = $_GET ['imageId'];
$imageDao = new ImageSaveDao ();
$result = $imageDao->sql ( "SELECT `imageData` FROM `imagesave` WHERE `imageId` = '" . $imageId . "'" );
// 画像として扱うための設定
$imgData = $result[0]->getImageData();
echo $imgData;
