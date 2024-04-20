<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $picture = file_get_contents('php://input');
    if (unlink($picture)) {
        echo true;
    }
}
