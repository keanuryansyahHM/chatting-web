<?php
$hostname = 'localhost';
$username = 'root';
$password = '';
$database = 'chatme4.web';

$connection = mysqli_connect($hostname, $username, $password, $database);

if (!$connection) {
    echo 'ga konek!';
}
