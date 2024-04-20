<?php
require('db.php');

// GLOBAL CSS
$globalCss = 'style.css';
$addOnCss = 'css/mobile-menu.css';

// GLOBAL JS
$functionJs = 'js/functions.js';

function query($data)
{

    global $connection;

    $query = mysqli_query($connection, $data);

    $row = [];

    while ($rows = mysqli_fetch_assoc($query)) {
        $row[] = $rows;
    }

    return $row;
}

function logined()
{

    if (isset($_SESSION['id_user'])) {

        global $connection;
        $idUser = $_SESSION['id_user'];

        $userDatas = query("SELECT * FROM chatme_user WHERE id_user = '$idUser' ");

        foreach ($userDatas as $userData) {
            $userDatas = $userData;
        }
    }

    return $userDatas;
}
