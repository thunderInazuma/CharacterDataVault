<?php
require_once dirname ( __FILE__ ) . '/../entity/CharacterDataVaultEntity.php';
require_once dirname ( __FILE__ ) . '/../dao/CharacterDataVaultDao.php';
require_once dirname ( __FILE__ ) . '/../util/ThunderUtil.php';

# Content-Typeを「application/json」に設定します。
header("Content-Type: application/json; charset=UTF-8");
# IEがContent-Typeヘッダーを無視しないようにします(HTML以外のものをHTML扱いしてしまうことを防ぐため)
header("X-Content-Type-Options: nosniff");
$cDao = new CharacterDataVaultDao ();
$data = $cDao->sql("SELECT `id`, `plName`, `pcName` FROM `characterdatavault` WHERE `searchFlg` =0");
echo json_encode($data);
