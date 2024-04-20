<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $titlePage; ?></title>

    <style>
        <?php
        require($globalCss);
        ?><?php
            require($internalCss);
            ?>
    </style>

</head>

<body class="<?php echo $bodyClass; ?>">


    <section id="login-section" class="section">
        <div class="container">
            <div id="login-root">
                <div id="login-box">
                    <div id="login-head">
                        <h2>Sign in</h2>
                        <i class="point-head"></i>
                    </div>
                    <form action="/" method="post" id="login-form">
                        <div id="lc-username" class="lc">
                            <span class="label">
                                <?php

                                switch ($bodyClass) {
                                    case 'user-login':
                                        echo 'Username/Gmail';
                                        break;
                                    default:
                                        echo 'Admin';
                                }

                                ?>
                            </span>
                            <input type="text" id="username" name="username" class="login-inp" autocomplete="off">
                        </div>
                        <div id="lc-password" class="lc">
                            <span class="label">password</span>
                            <input type="password" name="password" id="password" class="login-inp" focus>
                            <span class="see-password">see</span>
                        </div>
                        <button type="submit" aria-label="Tombol login" id="login-btn" name="loginBtn" disabled>Sign In</button>
                    </form>
                    <?php

                    if ($bodyClass == 'user-login') {
                    ?>
                        <a href="signup.php" id="signup-now">not have account? sign up here.</a>
                    <?php
                    } else {
                    ?>
                        <span>login to <?php echo $titlePage; ?> dashboard</span>
                    <?php
                    }

                    ?>
                </div>
                <div class="login-image">
                    <img src="images/img-6.jpg" alt="">
                </div>
            </div>
        </div>
    </section>
    <script src="<?php echo $functionJs; ?>"></script>
    <script src="<?php echo $internalJs; ?>"></script>



</body>

</html>