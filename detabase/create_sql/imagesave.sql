-- phpMyAdmin SQL Dump
-- version 4.0.10.18
-- https://www.phpmyadmin.net
--
-- 生成日時: 2018 年 4 月 28 日 00:14
-- サーバのバージョン: 5.6.23-log
-- PHP のバージョン: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
--

-- --------------------------------------------------------

--
-- テーブルの構造 `imagesave`
--

CREATE TABLE IF NOT EXISTS `imagesave` (
  `imageId` varchar(255) CHARACTER SET utf8 NOT NULL,
  `imageData` mediumblob NOT NULL,
  `imageName` varchar(255) CHARACTER SET utf8 NOT NULL
) E