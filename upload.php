<?php
session_start();
require('functions.php');

$userLogined = logined();
$idUser = $userLogined['id_user'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $files = $_FILES['file'];

    var_dump($files);

    $nameFile = $files['name'];
    $typeFile = $files['type'];
    $tmpNameFile = $files['tmp_name'];
    $sizeFile = $files['size'];

    // Ekstensi file yang diizinkan
    $allowExtension = ['image/jpeg', 'image/png', 'image/jpg'];

    if (in_array($typeFile, $allowExtension)) {

        // Size yang diizinkan

        if ($sizeFile >= 2097152) {
            echo 'file terlalu besar';
            exit;
        }

        $newFileName = uniqid() . '-id' . $userLogined['id_user'] . '.' . pathinfo($nameFile, PATHINFO_EXTENSION);

        $newDirectory = 'C:/laragon/www/chatme4.web/images/' . $newFileName;

        if (move_uploaded_file($tmpNameFile, $newDirectory)) {

            if ($userLogined['picture_user'] !== 'false') {
                unlink($userLogined['picture_user']);
            }

            // File push to database
            $picture_user = 'images/' . $newFileName;

            mysqli_query($connection, "UPDATE chatme_user SET picture_user = '$picture_user' WHERE id_user = '$idUser' ");

            echo true;
        }
    } else {
        echo 'file tidak diizinkan';
    }
}
