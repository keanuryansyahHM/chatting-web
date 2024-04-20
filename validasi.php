<?php
session_start();

date_default_timezone_set('Asia/Jakarta');

require('functions.php');

$datas = file_get_contents('php://input');
$datas = json_decode($datas);

// PAGE
$page = htmlspecialchars($datas->page);


switch ($page) {
    case 'user-signup':
        // GMAIL
        $gmail = htmlspecialchars($datas->gmail);

        // USERNAME
        $username = htmlspecialchars($datas->username);

        // PASSWORD
        $password = htmlspecialchars($datas->password);

        // HASH PASSWORD
        $hashPassword = password_hash($password, PASSWORD_DEFAULT);

        // CHECK GMAIL AVAIBILITY
        $checkGmail = mysqli_query($connection, "SELECT gmail_user FROM chatme_user WHERE gmail_user = '$gmail' ");

        // CHECK USERNAME AVAIBILITY
        $checkUsername = mysqli_query($connection, "SELECT username_user FROM chatme_user WHERE username_user = '$username' ");


        if (mysqli_num_rows($checkGmail) > 0) {

            $response = 'gmail available';
        } else if (mysqli_num_rows($checkUsername) > 0) {

            $response = 'username available';
        } else {

            // PARSING TO DATABASE, ON TABLE chatme_user

            mysqli_query($connection, "INSERT INTO chatme_user (id_user, gmail_user, username_user, password_user, status_user, picture_user, bio_user, online_user, offline_user) VALUES (null, '$gmail', '$username', '$hashPassword', 'new', 'false', 'No bio yet', 'false', 'false')");

            $response = 'sukses!';
        }

        echo $response;

        break;

    case 'user-login':

        // USERNAME
        $user = htmlspecialchars($datas->user);

        // PASSWORD
        $password = htmlspecialchars($datas->password);

        // GET USER ID ROWS
        $idUser = mysqli_query($connection, "SELECT id_user FROM chatme_user WHERE gmail_user = '$user' || username_user = '$user' ");

        if (mysqli_num_rows($idUser) > 0) {

            // GET USER ID STRING
            $idUser = mysqli_fetch_assoc($idUser);
            $idUser = $idUser['id_user'];

            // GET USER PASSWORD ROWS
            $passwordUser = mysqli_query($connection, "SELECT password_user FROM chatme_user WHERE id_user = '$idUser' ");

            if (mysqli_num_rows($passwordUser) > 0) {

                // GET USER PASSWORD STRING
                $passwordUser = mysqli_fetch_assoc($passwordUser);
                $passwordUser = $passwordUser['password_user'];

                // VERIFY PASSWORD USER
                if (password_verify($password, $passwordUser)) {

                    $_SESSION['logined'] = true;

                    $_SESSION['id_user'] = $idUser;

                    $response = 'success';
                }
            } else {
                $response = 'failed';
            }
        } else {
            $response = 'failed';
        }

        echo $response;

        break;
}

if (!isset($datas)) {
    header('Location: pagenot.php');
    exit;
}
