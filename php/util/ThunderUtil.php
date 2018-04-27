<?php
class ThunderUtil {
	public static function getUniqueId() {
		return uniqid ( "" );
	}
	public static function getUniqueId_gap() {
		return uniqid ( "gap" );
	}
	public static function getUniqueId_img() {
		return uniqid ( "img" );
	}
	// UTF-8文字列をUnicodeエスケープする。ただし英数字と記号はエスケープしない。
	public static function unicode_decode($str) {
		return preg_replace_callback ( "/((?:[^\x09\x0A\x0D\x20-\x7E]{3})+)/", "decode_callback", $str );
	}
	public static function decode_callback($matches) {
		$char = mb_convert_encoding ( $matches [1], "UTF-16", "UTF-8" );
		$escaped = "";
		for($i = 0, $l = strlen ( $char ); $i < $l; $i += 2) {
			$escaped .= "\u" . sprintf ( "%02x%02x", ord ( $char [$i] ), ord ( $char [$i + 1] ) );
		}
		return $escaped;
	}

	// Unicodeエスケープされた文字列をUTF-8文字列に戻す
	public static function unicode_encode($str) {
		return preg_replace_callback ( "/\\\\u([0-9a-zA-Z]{4})/", "encode_callback", $str );
	}
	public static function encode_callback($matches) {
		$char = mb_convert_encoding ( pack ( "H*", $matches [1] ), "UTF-8", "UTF-16" );
		return $char;
	}
	/**
	 * HTMLのエスケープを行う
	 * @param unknown $s
	 * @return string
	 */
	public static function h($s) {
		return htmlspecialchars($s, ENT_QUOTES, "UTF-8");
	}

	public static function entityArrayToJson($input) {
		$json = "[";
		foreach ($input as $key => $value) {
			$json += $value->getJson();
			$json += ",";
		}
		$json +="]";
		return $json;
	}
}
