module.exports = {
  // trạng thái hiện tại của trận đấu
  battleState: {
    data: {
      game: {
        name: "KD",
        data: {
          question: "đây là câu hỏi sô 1",
          duration: 120,
        },
      },
      players: [
        { name: "Player1", score: 20 },
        { name: "Player2", score: 20 },
        { name: "Player3", score: 20 },
        { name: "Player4", score: 20 },
      ],
    },
  },
  generalState: {
    clientCount: 0,
    viewerCount: 0,
    chatCount: 0,
    roundName: "DKHT",
    isSyncStateAllClients: false,
  },
  // games' content: đề bài
  gamesContent: {
    data: {},
  },
};
