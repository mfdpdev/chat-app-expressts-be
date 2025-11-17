import { Server } from "socket.io";
import ioMiddleware from "../middlewares/io.middleware";
import ConversationService from "../services/conversation.service";
import ChatService from "../services/chat.service";

const userSocketMap: any = {};

export function init(io: Server){
  // Socket.IO with auth
  io.use(ioMiddleware);

  io.on("connection", (socket) => {

    console.log("a user connected", socket.id);

    const _id: any = socket.handshake.query.userId;
    if (_id != "undefined") userSocketMap[_id] = socket.id;

    socket.on("send-message", async ({ to, message }) => {
      const from = Object.keys(userSocketMap).find( userId => userSocketMap[userId] === socket.id);
      console.log(from, to)
      if( !from || !to ) return;

      const target = userSocketMap[to];

      const { conversation, lastMessage } = await ChatService.create({
        message,
        senderId: from,
        recipientId: to,
      });

      if(target){
        io.to(target).emit('receive-message', lastMessage)
      }

      io.to(userSocketMap[from]).emit('receive-message', lastMessage)
    })


    socket.on('fetch-history', async ({ participants, conversationId }) => {
      try {
        // console.log(`[HISTORY] Memuat riwayat antara ${user1} dan ${user2}`);

        // Query pesan: (sender=A & target=B) OR (sender=B & target=A)
        let conversation = null;
        if(conversationId){
          conversation = await ConversationService.getById(conversationId);
        }

        if(participants.length > 0){
          conversation = await ConversationService.getByParticipants(participants);
        }

        // conversation = await ConversationService.get({
        //   $or: [
        //     { sender: user1, target: user2 },
        //     { sender: user2, target: user1 }
        //   ]
        // })
        //   .sort({ createdAt: 1 }) 
        //   .limit(100) 
        //   .lean(); 

        // Format ulang data untuk klien
        // const formattedConversation = conversation.map( msg => ({
        //   sender: msg.sender,
        //   target: msg.target,
        //   text: msg.text,
        //   timestamp: msg.createdAt.toLocaleTimeString('id-ID'),
        // }));

        // Kirim riwayat kembali hanya ke klien yang meminta
        socket.emit('message-history', conversation);

      } catch (error) {
        // console.error("Gagal mengambil riwayat pesan:", error);
        // socket.emit('status_update', { 
        //   text: `Gagal memuat riwayat chat.`,
        //   isError: true
        // });
      }
    });

    socket.on("typing", ({to, isTyping}) => {
      const from = Object.keys(userSocketMap).find( userId => userSocketMap[userId] === socket.id);
      if( !from || !to ) return;

      const target = userSocketMap[to];
      if(target){
        //console.log(target, from)
        io.to(target).emit('typing', {from, isTyping })
      }
    })

    // io.emit() is used to send events to all the connected clients
    io.emit("online-users", Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      delete userSocketMap[_id];
      io.emit("online-users", Object.keys(userSocketMap));
    });
  });
}
