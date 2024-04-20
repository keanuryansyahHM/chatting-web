<?php
session_start();
require('functions.php');

if (isset($_SESSION['logined'])) {
    header('Location: pagenot.php');
    exit;
}

$titlePage = 'Sign Up';
$bodyClass = 'user-signup';
$internalCss = 'css/signup.css';
$internalJs = 'js/signup.js';

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
        require($internalCss);
        ?>
    </style>

</head>

<body class="<?php echo $bodyClass; ?>">

    <section id="signup-section" class="section">
        <div class="container">
            <div id="signup-root">
                <div id="signup-box">
                    <div id="signup-head">
                        <h2>sign up</h2>
                        <i class="point-head"></i>
                    </div>
                    <form action="/" method="post" id="signup-form">
                        <div id="sc-gmail" class="sc">
                            <span class="label">gmail</span>
                            <input type="text" name="gmail" id="gmail">
                        </div>
                        <div id="sc-username" class="sc">
                            <span class="label">username</span>
                            <input type="text" name="username" id="username">
                        </div>
                        <div id="sc-password" class="sc">
                            <span class="label">password</span>
                            <input type="password" name="password" id="password">
                            <span class="see-password">See</span>
                        </div>
                        <div id="sc-conpassword" class="sc">
                            <span class="label">confirm password</span>
                            <input type="password" name="conpassword" id="conpassword">
                        </div>
                        <button type="submit" id="signup-btn" aria-label="Tombol Sign up" disabled>Sign Up</button>
                    </form>
                    <a href="login.php" id="login-now">already account? login here.</a>
                </div>
                <div class="signup-image">
                    <img src="images/img-3.jpg" alt="">
                </div>
            </div>
        </div>
    </section>



    <script src="<?php echo $functionJs; ?>"></script>
    <script src="<?php echo $globalJs ?>"></script>
    <script src="<?php echo $internalJs ?>"></script>

</body>

</html>