-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2023 at 09:54 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `em`
--

-- --------------------------------------------------------

--
-- Table structure for table `assign_device`
--

CREATE TABLE `assign_device` (
  `asid` int(11) NOT NULL,
  `deviceType` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT 'panding',
  `assignby` varchar(100) DEFAULT NULL,
  `eid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assign_device`
--

INSERT INTO `assign_device` (`asid`, `deviceType`, `status`, `assignby`, `eid`) VALUES
(4, 'laptop', 'assigned', 'HR', 6),
(5, 'mobile', 'assigned', 'HR', 7),
(6, 'tab', 'assigned', 'HR', 8),
(7, 'mobile', 'panding', NULL, 7);

-- --------------------------------------------------------

--
-- Table structure for table `avaliable_assets`
--

CREATE TABLE `avaliable_assets` (
  `id` int(11) NOT NULL,
  `device_type` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `avaliable_assets`
--

INSERT INTO `avaliable_assets` (`id`, `device_type`, `quantity`) VALUES
(1, 'laptop', 10),
(2, 'mobile', 28),
(3, 'tab', 19),
(4, 'tab', 20);

-- --------------------------------------------------------

--
-- Table structure for table `checkin`
--

CREATE TABLE `checkin` (
  `checkid` int(11) NOT NULL,
  `check_in_time` varchar(20) DEFAULT NULL,
  `check_out_time` varchar(20) DEFAULT NULL,
  `worktime` varchar(30) DEFAULT NULL,
  `eid` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `startDate` varchar(30) DEFAULT NULL,
  `endDate` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `checkin`
--

INSERT INTO `checkin` (`checkid`, `check_in_time`, `check_out_time`, `worktime`, `eid`, `status`, `startDate`, `endDate`) VALUES
(13, '12:29:47 pm', '12:29:53 pm', '0 hours : 0 minutes : 6 second', 7, 'YOU are Late', '5/4/2023', '5/4/2023'),
(14, '12:30:14 pm', '12:30:29 pm', '0 hours : 0 minutes : 15 secon', 6, 'YOU are Late', '6/4/2023', '6/4/2023'),
(15, '12:30:52 pm', '12:30:59 pm', '0 hours : 0 minutes : 7 second', 6, 'YOU are Late', '7/4/2023', '7/4/2023'),
(16, '12:32:14 pm', '12:32:22 pm', '0 hours : 0 minutes : 8 second', 7, 'YOU are Late', '8/4/2023', '8/4/2023'),
(17, '12:32:37 pm', '12:32:42 pm', '0 hours : 0 minutes : 5 second', 7, 'YOU are Late', '7/4/2023', '7/4/2023'),
(18, '10:27:43 am', '10:28:15 am', '0 hours : 0 minutes : 5 second', 7, 'YOU are Late', '10/4/2023', '10/4/2023'),
(19, '5:31:19 pm', '5:32:27 pm', '0 hours : 0 minutes : 5 second', 7, 'YOU are Late', '19/6/2023', '19/6/2023');

-- --------------------------------------------------------

--
-- Table structure for table `companyleave`
--

CREATE TABLE `companyleave` (
  `lid` int(11) NOT NULL,
  `empid` int(11) DEFAULT NULL,
  `casualLeave` int(11) DEFAULT NULL,
  `halfDayLeave` int(11) DEFAULT NULL,
  `medicalLeave` int(11) DEFAULT NULL,
  `otherLeave` int(11) DEFAULT NULL,
  `month` varchar(20) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companyleave`
--

INSERT INTO `companyleave` (`lid`, `empid`, `casualLeave`, `halfDayLeave`, `medicalLeave`, `otherLeave`, `month`, `year`) VALUES
(1, 6, 1, 0, 0, 0, 'jan', '2023'),
(2, 7, 0, 0, 1, 1, 'mar', '2022'),
(3, 6, 2, 1, 2, 2, 'dec', '2022'),
(4, 7, 0, 1, 0, 1, 'apr', '2023'),
(5, 6, 1, 0, 1, 0, 'feb', '2023'),
(6, 6, 0, 1, 0, 0, 'dec', '2022');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `cid` int(11) NOT NULL,
  `courseName` varchar(100) DEFAULT NULL,
  `studentid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`cid`, `courseName`, `studentid`) VALUES
(1, 'b.tech', 1),
(2, 'b.tech', 2);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cid` int(11) NOT NULL,
  `cname` varchar(50) DEFAULT NULL,
  `cemail` varchar(300) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cid`, `cname`, `cemail`, `mobile`) VALUES
(1, 'ram', 'ram@gmail.com', 77777777),
(2, 'pradeep', 'pradeep@gmail.com', 888888888);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `empName` varchar(50) DEFAULT NULL,
  `empEmail` varchar(200) DEFAULT NULL,
  `token` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `empName`, `empEmail`, `token`) VALUES
(6, 'rb1', '707mauryaji@gmail.com', 'ZoE35SsO1zRUGoMa6OtUt8OEZwwC07Ea'),
(7, 'rb2', '707mauryaji@gmail.com', 'ZoE35SsO1zRUGoMa6OtUt8OEZwwC07Ea'),
(8, 'xyz', 'xyz@gmail.com', '55KFvvCHZQQGfvyPj385rjeQ7KWAovDp');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `imgid` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`imgid`, `name`, `userid`) VALUES
(2, 'Screenshot (95).png', 7),
(3, 'Screenshot (91).png', 6),
(5, 'Screenshot (105).png', 6),
(6, 'Screenshot (98).png', 7),
(7, 'Screenshot (92).png', 7);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `url` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `userId`, `url`) VALUES
(1, 1, 'uploads\\1684404037006-Screenshot (92).png'),
(4, 1, 'uploads\\1684404147126-Screenshot (91).png'),
(5, 1, 'uploads\\1684404147134-Screenshot (92).png'),
(6, 1, 'uploads\\1684404147143-Screenshot (93).png'),
(7, 1, 'uploads\\1684404147149-Screenshot (95).png');

-- --------------------------------------------------------

--
-- Table structure for table `nameupdate`
--

CREATE TABLE `nameupdate` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nameupdate`
--

INSERT INTO `nameupdate` (`id`, `firstName`, `lastName`) VALUES
(1, 'RAM', 'mauryaji'),
(2, 'RB', 'mauryaji');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `orid` int(11) NOT NULL,
  `itemname` varchar(50) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `ordersid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`orid`, `itemname`, `qty`, `amount`, `ordersid`) VALUES
(1, 'pizza', 1, 250, 1),
(2, 'bargar', 4, 200, 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `oid` int(11) NOT NULL,
  `orderdate` varchar(50) DEFAULT NULL,
  `place` varchar(400) DEFAULT NULL,
  `customerid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`oid`, `orderdate`, `place`, `customerid`) VALUES
(1, '17/04/2023', 'lucknow', 1),
(2, '16/04/2023', 'varanasi', 2);

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `otp` int(11) DEFAULT NULL,
  `expiry_date` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `pid` int(11) NOT NULL,
  `paytype` varchar(100) DEFAULT NULL,
  `orderdetailsid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`pid`, `paytype`, `orderdetailsid`) VALUES
(1, 'cash', 1),
(2, 'online(upi)', 2);

-- --------------------------------------------------------

--
-- Table structure for table `pdfs`
--

CREATE TABLE `pdfs` (
  `id` int(11) NOT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `path` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pdfs`
--

INSERT INTO `pdfs` (`id`, `filename`, `path`) VALUES
(4, 'gauri.pdf', 'uploads\\23a4615a3de385bd8247f25e6799dd06'),
(5, 'gauri.pdf', 'uploads\\43fb5e602236af51b6085a40bbe3df6a');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `clientId` int(11) DEFAULT NULL,
  `rating` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `clientId`, `rating`) VALUES
(1, 1, 4.5),
(2, 2, 5),
(3, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `firstName`, `lastName`, `gender`, `email`, `password`, `number`, `role`) VALUES
(6, 'ram', 'maurya', 'male', 'ram@gmail.com', '$2b$10$Q18IwJQHP0fU0pKZKs8cV.uLDVGMGRDnW.nPYoz6Szx5Y0qnnlu4u', 777777777, 'admin'),
(7, 'pradeep', 'mauryaji1', 'male', '707mauryaji@gmail.com', '$2b$10$xPoy5KzTfpcrwMXmOQSHL.4qWVV/Zn0499q6bmSiqK.ohrR.ya5W.', 88888888, 'user'),
(8, 'rb', 'maurya', 'male', 'rambabu.maurya@iphtechnologies.com', '$2b$10$418xveZm11LolfvZRkqpxeM7Yw/ibEyYxUloC9z/9hEihCBzVMUm6', 888888888, 'employee'),
(9, 'xyz', 'mauryaji', 'male', 'xyz@gmail.com', '$2b$10$oLRCv7AAcdoMxLahcNLzHuig5mtaJjJnDijo654HrSybIQRoM8ui.', 66666666, 'user'),
(10, 'xyz', 'mauryaji', 'male', 'xyz@gmail.com', '$2b$10$DH3ZLxduYtCHNYF7ZP7yruJpQNnDqhn0QfuXfztN.2/JFJDs3lyL6', 66666666, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `id` int(11) NOT NULL,
  `basic_salary` int(11) NOT NULL,
  `bonus` int(11) DEFAULT NULL,
  `deductions` int(11) DEFAULT NULL,
  `eid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `basic_salary`, `bonus`, `deductions`, `eid`) VALUES
(1, 30000, 5000, 500, 6);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `sname` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `sname`) VALUES
(1, 'RAM'),
(2, 'rb');

-- --------------------------------------------------------

--
-- Table structure for table `studentdetails`
--

CREATE TABLE `studentdetails` (
  `stuid` int(11) NOT NULL,
  `fathername` varchar(50) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `subjectid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentdetails`
--

INSERT INTO `studentdetails` (`stuid`, `fathername`, `mobile`, `address`, `subjectid`) VALUES
(1, 'xyz', 999999999, 'sarnath', 1),
(2, 'abc', 888888888, 'sarnath varanasi', 2);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `suid` int(11) NOT NULL,
  `allSubjectName` varchar(200) DEFAULT NULL,
  `courseid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`suid`, `allSubjectName`, `courseid`) VALUES
(1, 'c,html,python,node.js,flutter', 1),
(2, 'python,node,flutter,javascript,aws', 2);

-- --------------------------------------------------------

--
-- Table structure for table `validation_registration`
--

CREATE TABLE `validation_registration` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `validation_registration`
--

INSERT INTO `validation_registration` (`id`, `name`, `lastname`, `mobile_number`, `email`, `dob`, `password`) VALUES
(178, 'rb', 'maurya', '4444444444', 'rb8@gmail.com', '1996-11-11', '$2a$10$K10FdzTmgn5CweFoJoa6Fe.AT5AQkbSrQaTgqrv3tA9TD5Kb4qo3W'),
(180, 'rb', 'maurya', '4444444444', 'rb9@gmail.com', '1996-11-11', '$2a$10$dxj9o5Cw9Vlv257Lm4UYpubg0QQFWqbu8kH93earfDhxSm/hJ3.AC'),
(182, 'rb', 'maurya', '4444444444', 'rb2@gmail.com', '1996-11-11', '$2a$10$mLYfm6JwAsgMWer7XDVNF.eCtQm7AEY9FhGzVIPgPcT34FBhG2TEu'),
(185, 'rb', 'maurya', '4444444444', 'rb@gmail.com', '1996-11-11', '$2a$10$KoqiU.9Pj06P8lxFIMW.QOTn9cRs/1odm4dTSKJOYQo5cweMX6ukK'),
(189, 'rbm', 'maurya', '786867864', 'rb10@gmail.com', '1996-11-11', '$2a$10$eRpUEwoUXJeVI8h9vyO0ZOknvMZasxNUfICGI87zFAcoKuQ1qr1QO'),
(192, 'rbm', 'maurya', '786867864', 'rb11@gmail.com', '1996-11-11', '$2a$10$eRzjcB2F88Rm62twagaiCuw9Llc76omtgfdfeGaXsAdEPyoBdEdba');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assign_device`
--
ALTER TABLE `assign_device`
  ADD PRIMARY KEY (`asid`),
  ADD KEY `eid` (`eid`);

--
-- Indexes for table `avaliable_assets`
--
ALTER TABLE `avaliable_assets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkin`
--
ALTER TABLE `checkin`
  ADD PRIMARY KEY (`checkid`),
  ADD KEY `eid` (`eid`);

--
-- Indexes for table `companyleave`
--
ALTER TABLE `companyleave`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `empid` (`empid`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `studentid` (`studentid`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`imgid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nameupdate`
--
ALTER TABLE `nameupdate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`orid`),
  ADD KEY `ordersid` (`ordersid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`oid`),
  ADD KEY `customerid` (`customerid`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `orderdetailsid` (`orderdetailsid`);

--
-- Indexes for table `pdfs`
--
ALTER TABLE `pdfs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eid` (`eid`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studentdetails`
--
ALTER TABLE `studentdetails`
  ADD PRIMARY KEY (`stuid`),
  ADD KEY `subjectid` (`subjectid`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`suid`),
  ADD KEY `courseid` (`courseid`);

--
-- Indexes for table `validation_registration`
--
ALTER TABLE `validation_registration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assign_device`
--
ALTER TABLE `assign_device`
  MODIFY `asid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `avaliable_assets`
--
ALTER TABLE `avaliable_assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `checkin`
--
ALTER TABLE `checkin`
  MODIFY `checkid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `companyleave`
--
ALTER TABLE `companyleave`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `imgid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `nameupdate`
--
ALTER TABLE `nameupdate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `orid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pdfs`
--
ALTER TABLE `pdfs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `studentdetails`
--
ALTER TABLE `studentdetails`
  MODIFY `stuid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `suid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `validation_registration`
--
ALTER TABLE `validation_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assign_device`
--
ALTER TABLE `assign_device`
  ADD CONSTRAINT `assign_device_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `employee` (`id`);

--
-- Constraints for table `checkin`
--
ALTER TABLE `checkin`
  ADD CONSTRAINT `checkin_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `employee` (`id`);

--
-- Constraints for table `companyleave`
--
ALTER TABLE `companyleave`
  ADD CONSTRAINT `companyleave_ibfk_1` FOREIGN KEY (`empid`) REFERENCES `employee` (`id`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `student` (`id`);

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `registration` (`id`);

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`ordersid`) REFERENCES `orders` (`oid`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customer` (`cid`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`orderdetailsid`) REFERENCES `orderdetails` (`orid`);

--
-- Constraints for table `salary`
--
ALTER TABLE `salary`
  ADD CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`eid`) REFERENCES `employee` (`id`);

--
-- Constraints for table `studentdetails`
--
ALTER TABLE `studentdetails`
  ADD CONSTRAINT `studentdetails_ibfk_1` FOREIGN KEY (`subjectid`) REFERENCES `subject` (`suid`);

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`courseid`) REFERENCES `course` (`cid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
