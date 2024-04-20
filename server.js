const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatme4.web'
});

if (!conn) {
    console.log('Failed connected to database!');

    return;
}

app.use(cors());
app.use(express());

const server = app.listen(3000, () => {

    console.log('Server running on port 3000!');


});

const io = socketIO(server, {
    cors: {
        origin: '*'
    }
});

const sendMessage = message => {

    io.emit('message', message);

}

io.on('connection', (socket) => {

    // Receive message from client
    socket.on('message', data => {


        console.log(data);

        // Event message
        let event = data.event;

        switch (event) {

            case 'user online':

                // Memberikan id kepada user yang baru connect
                socket.id = data.body;

                let userOnline = `UPDATE chatme_user SET online_user = ? WHERE id_user = ?`;

                conn.query(userOnline, ['true', socket.id], (err) => {

                    if (err) {
                        console.log('Gagal mengambil data user yang sedang online');
                        return;
                    }

                    data.status = true;

                    // Kirim kembali data yang sudah di olah
                    sendMessage(data);
                })

                break;

            case 'remove picture':
                // REMOVE PICTURE ON DATABASE

                let removePicture = `SELECT picture_user FROM chatme_user WHERE id_user = ?`;

                conn.query(removePicture, [data.body], (err, result) => {

                    if (err) {
                        console.log('Gagal mengahapus foto profil');
                        return
                    }

                    data.status = true;
                    data.data = result[0].picture_user;

                    // Kirim kembali data yang sudah diolah
                    sendMessage(data);

                    conn.query(`UPDATE chatme_user SET picture_user = ? WHERE id_user = ?`, ['false', data.body], (err) => {
                        if (err) {
                            console.log('Gagal menghapus foto!');
                            return;
                        }
                    })



                })

                break;

            case 'change picture':

                // CHANGE PICTURE ON DATABASE

                let newProfilePicture = `SELECT picture_user FROM chatme_user WHERE id_user = ?`;

                conn.query(newProfilePicture, [data.body], (err, result) => {
                    if (err) {
                        console.log('Gagal query picture user baru');
                        return;
                    }

                    data.data = result[0].picture_user;

                    // Kirim kembali data yang sudah diolah
                    sendMessage(data);

                })

                break;

            case 'change username':

                // CHECK USERNAME AVAIBILITY ON DATABASE

                let usernameCheck = `SELECT username_user FROM chatme_user WHERE username_user = ?`;

                conn.query(usernameCheck, [data.data], (err, result) => {

                    if (err) {
                        console.log('Gagal ceking username.');
                        return;
                    }

                    if (!result.length) {

                        // CHANGE USERNAME ON DATABASE

                        let newUsername = `UPDATE chatme_user SET username_user = ? WHERE id_user = ?`;

                        conn.query(newUsername, [data.data, data.body], (err) => {

                            if (err) {
                                console.log('Gagal mengganti username.');
                                return;
                            }

                            data.status = true;

                            // Kirim kembali data yang sudah di olah
                            sendMessage(data);

                        })
                    } else {
                        data.status = false;

                        // Kirim kembali data yang sudah diolah
                        sendMessage(data);
                    }




                })



                break;

            // case 'check online user':

            //     // CHECK ONLINE USER
            //     let checkOnlineUser = `SELECT online_user FROM chatme_user WHERE id_user = ?`;

            //     conn.query(checkOnlineUser, [data.body], (err, result) => {

            //         if (err) {
            //             console.log('Gagal mengambil kolom online_user target');
            //             return;
            //         }

            //         if (result[0].online_user == 'true') {
            //             data.data = 'Online';
            //             data.status = true;
            //             sendMessage(data);
            //         } else {

            //             let offlineUser = 'SELECT offline_user FROM chatme_user WHERE id_user = ?';

            //             conn.query(offlineUser, [data.body], (err, result) => {

            //                 if (err) {
            //                     console.log('Gagal mengambil kolom offline_user target');

            //                     return;
            //                 }

            //                 data.data = result[0].offline_user;
            //                 data.status = true;
            //                 sendMessage(data);

            //             })

            //         }


            //     })


            //     break;

            case 'open chat':

                let statusUser;
                // Check apakah user online atau tidak
                const checkOnlineUser = `SELECT online_user FROM chatme_user WHERE id_user = ?`;

                conn.query(checkOnlineUser, [data.receiver], (err, result) => {


                    if (err) {
                        console.log('Gagal cek apakah user online atau tidak');
                        return;
                    }

                    // User sedang online
                    if (result[0].online_user == 'true') {

                        statusUser = 'Online';

                        // User sedang offline / User belum pernah login
                    } else {

                        // Ambil waktu offline user target
                        let userTimeOffline = `SELECT offline_user FROM chatme_user WHERE id_user = ?`;

                        conn.query(userTimeOffline, [data.receiver], (err, result) => {

                            if (err) {
                                console.log('Gagal mengambil waktu offline user target');
                                return;
                            }


                            statusUser = result[0].offline_user;

                        })

                    }


                    // Cek apakah user mempunyai room chat

                    let checkRC = `SELECT id_room FROM room_chat WHERE member_room = ? OR member_room = ?`;

                    conn.query(checkRC, [data.sender + data.receiver, data.receiver + data.sender], (err, result) => {

                        if (err) {
                            console.log('Gagal mengecek ketersediaan room chat');
                            return;
                        }

                        data.status = true;

                        // Jika belum punya room chat
                        if (!result.length) {

                            // Buat room chat
                            let createRC = `INSERT INTO room_chat (id_room, member_room) VALUES (?, ?)`;

                            conn.query(createRC, [null, data.sender + data.receiver], (err) => {

                                if (err) {
                                    console.log('Gagal membuat room chat');
                                    return;
                                }

                                console.log('Room chat berhasil dibuat');

                                // Ambil id room chat yang baru dibuat

                                let getNewRC = `SELECT id_room FROM room_chat WHERE member_room = ?`;

                                conn.query(getNewRC, [data.sender + data.receiver], (err, result) => {

                                    if (err) {
                                        console.log('Gagal mengambil id room chat yang baru dibuat');
                                        return;
                                    }

                                    data.data = {
                                        idRC: result[0].id_room,
                                        statusTarget: statusUser,
                                        listMessage: ''
                                    };

                                    sendMessage(data);

                                })



                            })



                            // Jika sudah punya room chat
                        } else {

                            console.log('Sudah ada room chat');

                            // Ambil list message di room chat tersebut
                            let getListMessage = `SELECT * FROM message_user WHERE room_chat = ? ORDER BY time_message`;

                            conn.query(getListMessage, [result[0].id_room], (err, listMessage) => {

                                if (err) {
                                    console.log('Gagal mendapatkan list message');
                                    return;
                                }

                                // Jika belum ada list message
                                if (!listMessage.length) {

                                    data.data = {
                                        idRC: result[0].id_room,
                                        statusTarget: statusUser,
                                        listMessage: ''
                                    };

                                    sendMessage(data);

                                    // Jika sudah ada list message
                                } else {

                                    data.data = {
                                        idRC: result[0].id_room,
                                        statusTarget: statusUser,
                                        listMessage: listMessage
                                    };

                                    sendMessage(data);

                                }

                            })

                        }

                    })

                })

                break;

            // case 'open chat':

            //     // CEK APAKAH ADA ROOM CHAT
            //     let roomChat = `SELECT id_room FROM room_chat WHERE member_room = ? OR member_room = ?`;

            //     conn.query(roomChat, [data.data[0] + data.data[1], data.data[1] + data.data[0]], (err, idRC) => {

            //         if (err) {
            //             console.log('Gagal mengambil id room chat');
            //             return;
            //         }


            //         // JIKA TIDAK ADA ROOM CHAT
            //         if (idRC.length == 0) {

            //             // BUAT ROOM CHAT BARU
            //             let createRc = `INSERT INTO room_chat (id_room, member_room) VALUES (?, ?)`;

            //             conn.query(createRc, [null, data.data[0] + data.data[1]], (err) => {

            //                 if (err) {
            //                     console.log('Gagal membuat room chat');
            //                     return;
            //                 }

            //                 // AMBIL ROOM CHAT BARU
            //                 let getNewRC = `SELECT id_room FROM room_chat WHERE member_room = ? OR member_room = ?`;

            //                 conn.query(getNewRC, [data.data[0] + data.data[1], data.data[1] + data.data[0]], (err, newIdRC) => {

            //                     if (err) {
            //                         console.log('Gagal mengambil room chat yang baru dibuat');
            //                         return;
            //                     };

            //                     data.status = true;
            //                     data.data = newIdRC[0].id_room;
            //                     data.listChat = '';

            //                     sendMessage(data);


            //                 })

            //             })

            //         } else {
            //             // JIKA ADA ROOM CHAT

            //             // AMBIL ISI CHATTINGAN DARI ROOM TSB


            //             let getChat = `SELECT * FROM message_user WHERE room_chat = ? ORDER BY id_message ASC`;

            //             conn.query(getChat, [idRC[0].id_room], (err, listChat) => {

            //                 if (err) {
            //                     console.log('Gagal mengambil chat user dengan room id: ' + result[0].id_user);
            //                     return;
            //                 }

            //                 if (listChat.length == 0) {

            //                     data.status = true;
            //                     data.data = idRC[0].id_room;
            //                     data.listChat = '';
            //                     sendMessage(data);


            //                 } else {

            //                     data.status = true;
            //                     data.data = idRC[0].id_room;
            //                     data.listChat = listChat;
            //                     sendMessage(data);

            //                 }

            //             })



            //         }

            //     })

            //     break;

            case 'send message':

                // Ambil id room chat nya
                let checkRC = `SELECT id_room FROM room_chat WHERE member_room = ? OR member_room = ?`;

                conn.query(checkRC, [data.sender + data.receiver, data.receiver + data.sender], (err, result) => {

                    if (err) {
                        console.log('Gagal mengambil room chat ketika telah mengirim pesan baru ke target');

                        return;
                    }

                    // Masukkan pesan baru ke dalam table message user
                    let insertMessage = `INSERT INTO message_user (id_message, sender_message, receiver_message, message, room_chat) VALUES (?, ?, ?, ?, ?)`;

                    conn.query(insertMessage, [null, data.sender, data.receiver, data.data, result[0].id_room], (err) => {

                        if (err) {
                            console.log('Gagal menambahkan pesan baru ke dalam table message_user');
                            return;
                        }

                        data.status = true;
                        sendMessage(data);

                    })

                })

                break;
        }



    })

    socket.on('disconnect', () => {

        let date = new Date();

        let hourString = date.getHours().toString();

        let minuteString = date.getMinutes().toString();

        if (minuteString.length == 1) {

            minuteString = '0' + minuteString;

        };

        let resultTime = hourString + ':' + minuteString;

        let timeLogout = resultTime;

        let userOffline = `UPDATE chatme_user SET offline_user = ? WHERE id_user = ?`;


        conn.query(userOffline, [timeLogout, socket.id], (err) => {

            if (err) {
                console.log('Gagal update kolom offline_user di table chatme_user');
                return;
            }

            let userOnline = `UPDATE chatme_user SET online_user = ? WHERE id_user = ?`;
            conn.query(userOnline, ['false', socket.id], err => {

                if (err) {

                    console.log('Gagal update user_online');
                    return;

                }

                sendMessage({
                    event: 'user logout',
                    status: true,
                    data: timeLogout,
                    body: socket.id
                });


            })



        })


    })

})

