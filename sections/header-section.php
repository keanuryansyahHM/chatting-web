<section id="header-section" class="section">
    <div class="container">
        <div id="header-root">
            <div id="head-left" class="head">
                <div id="head-logo">
                    <h2>chatme</h2>
                </div>
            </div>
            <div id="head-right" class="head">
                <div id="profile-user">
                    <img id="<?php echo $userLogined['id_user']; ?>" src="<?php echo $userLogined['picture_user'] == 'false' ? 'images/no-picture.png' : $userLogined['picture_user']; ?>" alt="" class="picture-user">
                </div>
            </div>
        </div>
    </div>
</section>

<input type="file" id="file-input" hidden>
<div id="profile-ctn-wr">

    <div id="profile-ctn">
        <div id="profile-ctn-row1" class="profcont">
            <span>edit your profile</span>
        </div>
        <div id="profile-ctn-row2" class="profcont">
            <div class="profcont2-l">
                <img id="<?php echo $userLogined['id_user']; ?>" class="picture-user" src="<?php echo $userLogined['picture_user'] === 'false' ? 'images/no-picture.png' : $userLogined['picture_user']; ?>" alt="">
            </div>
            <div class="profcont2-r">
                <button id="<?php echo $userLogined['id_user']; ?>" <?php echo $userLogined['picture_user'] === 'false' ? 'disabled' : '' ?>>remove picture</button>
                <button>change picture</button>
            </div>
        </div>
        <div id="profile-ctn-row3" class="profcont">
            <label for="username_user">username</label>
            <input type="text" name="username_user" id="username_user" value="<?php echo $userLogined['username_user']; ?>" autocomplete="off">
            <button type="button" disabled>Change Username</button>
        </div>
        <div id="profile-ctn-row4" class="profcont">
            <label for="bio">my bio</label>
            <textarea name="bio" id="bio_user" cols="30" rows="8"><?php echo $userLogined['bio_user']; ?></textarea>
            <button type="button" event-button="change bio">Change Bio</button>
        </div>
        <div id="profile-ctn-row5" class="profcont">
            <a href="logout.php?id-user=<?php echo $userLogined['id_user']; ?>&page=<?php echo 'user'; ?>">logout</a>
        </div>
    </div>
</div>