<?php

$allUser = query('SELECT * FROM chatme_user');

?>

<section id="chatting-section" class="section">
    <div class="container">
        <div id="chatting-root">
            <div id="chatting-root-left" class="chatting-root-child">
                <!-- CONTENT -->

                <div class="find-user-wr">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                    <input type="text" id="find-user" name="find-user" placeholder="Find user.." autocomplete="off">
                </div>

                <?php foreach ($allUser as $user) : ?>

                    <div id="<?php echo $user['id_user']; ?>" class="contact <?php echo $user['id_user'] == $userLogined['id_user'] ? 'me' : '' ?>">
                        <div class="contact-left">
                            <img id="<?php echo $user['id_user']; ?>" src="<?php echo $user['picture_user'] == 'false' ? 'images/no-picture.png' : $user['picture_user']; ?>" alt="" class="picture-user">
                        </div>
                        <div class="contact-right">
                            <span id="<?php echo $user['id_user']; ?>" class="username-user"><?php echo $user['username_user'] ?></span>
                            <span>Message</span>
                        </div>
                    </div>

                <?php endforeach; ?>

            </div>
            <div id="chatting-root-right" class="chatting-root-child">
                <div id="chatting-start" class="chatting-root-right-child show">

                    <h3>Select one of the users to start chatting.
                    </h3>

                </div>
                <div id="chatting-box" class="chatting-root-right-child">
                    <div class="chatting-top">
                        <div class="chatting-top-left">
                            <img src="images/img-3.jpg" alt="" class="picture-user">
                        </div>
                        <div class="chatting-top-right">
                            <span class="username-user">bagol</span>
                            <span class="status">online</span>
                        </div>
                    </div>
                    <div class="chatting-middle">
                        <div class="information">
                            <div class="information-ctn">
                                <span>Semua chat yang di kirimkan akan kami enkrip untuk menjaga privasi pengguna</span>
                            </div>
                        </div>
                        <div class="list-chatting">

                        </div>
                    </div>
                    <div class="chatting-bottom">
                        <div class="chatting-bottom-left">
                            <textarea name="message-input" id="message-input" cols="30" rows="1" placeholder="Write message"></textarea>
                        </div>
                        <span id="send-message-button">send</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>