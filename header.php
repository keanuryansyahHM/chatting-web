<?php
require('functions.php');


$userLogined = logined();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $titlePage; ?></title>

    <style>
        <?php

        require($globalCss);
        if (isset($internalCss)) {
            require($internalCss);
        }
        ?>
    </style>

</head>

<body id="<?php echo $userLogined['id_user']; ?>" class="<?php echo $bodyClass; ?>" status-user="<?php echo $userLogined['status_user']; ?>">

    <?php
    require('sections/header-section.php');
