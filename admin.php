<?php
session_start();
if (isset($_SESSION['logined'])) {
    header('Location: pagenot.php');
    exit;
}
require('functions.php');
// TITLE PAGE
$titlePage = 'Admin';
$bodyClass = 'admin-login';
$internalCss = 'css/login.css';
$internalJs = 'js/login.js';
require('sections/login-section.php');
// $token = base64_encode(openssl_random_pseudo_bytes(32));

// echo $token;
