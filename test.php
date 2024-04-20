<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="test.css">

</head>

<body>

    <div id="chatting-box-wr">
        <div class="chatting-box-top">
            <div class="left">
                <img src="images/img-3.jpg" alt="">
            </div>
            <div class="right">
                <span>Bagol</span>
                <span>Online</span>
            </div>
        </div>
        <div class="chatting-box-middle">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus recusandae eaque consectetur ab quo veritatis reprehenderit magnam, laboriosam voluptate iste quisquam maxime molestiae vel cupiditate! Nemo inventore, nostrum rem nulla doloremque voluptas aut quidem illo. Quae sunt ipsam molestias quia vitae illum iure officiis, provident qui repellat natus cum? Suscipit repellat reiciendis laudantium explicabo similique. Nisi perferendis quisquam et odio rem repellat inventore quasi dolore pariatur, fugiat veritatis. Magni alias, eveniet distinctio deleniti omnis libero quod. Nisi, quasi nobis laboriosam voluptas dignissimos laborum et ratione maiores sapiente perspiciatis deserunt voluptatem sint rerum iure minus inventore accusamus officiis ipsum odit? Incidunt ratione rerum aliquid minima facilis, tempora autem expedita beatae, nisi eaque quibusdam. Earum tenetur quos doloremque molestiae. Commodi perspiciatis quos odit iusto! Consectetur voluptates recusandae adipisci optio et, debitis accusantium odio rem expedita natus quis sint obcaecati iure nulla reprehenderit, fuga, molestias quas? Suscipit inventore adipisci soluta libero reprehenderit explicabo consequuntur nulla minima facilis ab beatae sequi atque, voluptate accusantium. Voluptas rerum modi labore cumque ipsum consequuntur numquam alias ab harum distinctio quas, consectetur nemo? Illo aperiam doloribus dolore reprehenderit officia iste in, ab tempora commodi laboriosam voluptates voluptatem quas, ad eos pariatur molestias ipsam libero soluta, corrupti ullam temporibus tempore impedit! Iste quasi alias distinctio, fuga culpa maiores ab veritatis quibusdam rem, quod excepturi vel esse nulla omnis odio voluptates exercitationem quia ipsum. Asperiores harum, nobis officiis assumenda consequatur laboriosam fugit, dolorum architecto odio rerum eaque porro placeat distinctio corrupti aperiam alias quo odit in et debitis inventore? Possimus repellat cumque provident sunt quis quaerat mollitia unde. Perspiciatis vel nemo illum numquam cumque facere enim mollitia natus possimus, officiis ut iusto provident quaerat! Dolorem et inventore minus dolorum laboriosam iste omnis quia incidunt. Dignissimos eum vitae atque, cumque dolorum mollitia ipsam nulla ipsum, ullam deserunt iste delectus dolorem fugiat.</p>
        </div>
        <div class="chatting-box-bottom">
            <div class="left">
                <textarea rows="1" max-rows="8" name="message" id="message" placeholder="Type message.."></textarea>
            </div>
            <div class="right">
                <span id="send-message-button">Send</span>
            </div>
        </div>
    </div>


    <script>
        let textarea = document.querySelector('textarea');
        let chattingBoxBottom = document.querySelector('.chatting-box-bottom');
        let chattingBoxMiddle = document.querySelector('.chatting-box-middle');
        let currentScroll = 16;



        let handleInput = () => {

            console.log(currentScroll);

            if (textarea.scrollHeight > currentScroll) {

                if (textarea.scrollHeight > 96) {
                    textarea.style.overflow = 'auto';

                    return;
                }

                chattingBoxBottom.style.height = `${chattingBoxBottom.clientHeight + 16}px`;

                chattingBoxMiddle.style.height = `${chattingBoxMiddle.clientHeight - 16}px`;


            }

            textarea.style.height = '0';

            textarea.style.height = `${textarea.scrollHeight}px`;

            if (textarea.scrollHeight < currentScroll) {

                chattingBoxBottom.style.height = `${chattingBoxBottom.clientHeight - 16}px`;

                chattingBoxMiddle.style.height = `${chattingBoxMiddle.clientHeight + 16}px`;

                if (textarea.scrollHeight == 16) {
                    chattingBoxBottom.style.height = '55px';

                    chattingBoxMiddle.style.height = '531.4px';

                }

            }

            currentScroll = textarea.scrollHeight;


            console.log(textarea.scrollHeight);
        };

        textarea.addEventListener('input', handleInput);

        textarea.addEventListener('paste', (ev) => {

            console.log(textarea.value.length);

        })
    </script>

</body>

</html>