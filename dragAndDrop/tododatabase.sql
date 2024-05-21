-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Máj 21. 10:00
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `tododatabase`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tododatabase`
--

CREATE TABLE `tododatabase` (
  `id` int(11) NOT NULL,
  `columnId` varchar(1000) NOT NULL,
  `content` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tododatabase`
--

INSERT INTO `tododatabase` (`id`, `columnId`, `content`) VALUES
(1, 'WIP', 'Teszt');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `tododatabase`
--
ALTER TABLE `tododatabase`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `tododatabase`
--
ALTER TABLE `tododatabase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
