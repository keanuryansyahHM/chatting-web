<?php
session_start();
date_default_timezone_set('Asia/Jakarta');

$timeLogout = date('H:i');

require('db.php');
session_destroy();
if (isset($_GET['page'])) {

    $page = $_GET['page'];
    $idUser = $_GET['id-user'];

    switch ($page) {
        case 'user':
            mysqli_query($connection, "UPDATE chatme_user SET offline_user = '$timeLogout' WHERE id_user = '$idUser' ");
            header('Location: login.php');
            exit;
            break;
        default:
            header('Location: admin.php');
            exit;
    }
}




exit;
