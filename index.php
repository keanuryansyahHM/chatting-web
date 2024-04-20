<?php
session_start();

// REDIRECT RULE

if (!isset($_SESSION['logined'])) {
    header('Location: login.php');
    exit;
} else if (isset($_SESSION['partner'])) {
    header('Location: pagenot.php');
    exit;
}


// INI ADALAH FRONTPAGE
$titlePage = 'chatme';
$bodyClass = 'chatme';
$internalCss = 'css/chatting-section.css';

require('header.php');
?>

<?php
require('sections/chatting-section.php');
require('footer.php');
