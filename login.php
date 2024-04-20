<?php
session_start();

if (isset($_SESSION['logined'])) {
    header('Location: index.php');
    exit;
}

require('functions.php');
// TITLE PAGE
$titlePage = 'User Login';
$bodyClass = 'user-login';
$internalCss = 'css/login.css';
$internalJs = 'js/login.js';

require('sections/login-section.php');
