const fs = require("fs");
const path = require("path");
const pandoc = require("node-pandoc");
// var spawn = require("child_process").spawn;
const util = require("util");
const { User, Viewer, Chat, Message, Score } = require("../db/index");

// mjAPI.config({
//   MathJax: {
//     // traditional MathJax configuration
//   },
// });
// mjAPI.start();

// const connection = async (ctx) => {
//   ctx.body = {
//     status: "success",
//     data: generalState.isSyncStateAllClients,
//   };
// };

const removeUnwantedFiles = () => {
  let files = fs.readdirSync(`../server/utils/data/`);
  files.forEach((file) => {
    if (file.includes(".json") == 0) {
      fs.unlinkSync(`../server/utils/data/${file}`);
    }
  });
};

// const loadStates = (key) => {
//   try {
//     const dataBuffer = fs.readFileSync(
//       `./battleState/data/battleState_${key}.json`
//     );
//     const dataJSON = dataBuffer.toString();
//     return JSON.parse(dataJSON);
//   } catch (e) {
//     return [];
//   }
// };

const getGameContent = async (req, res) => {
  //   removeUnwantedFiles();
  console.log("Get game content of " + req.params.game);
  try {
    const data = require(`../data/${req.params.game}`);
    res.send(data);
  } catch (e) {
    console.error(e);
  }
};

// const _getPlayerInfo = async (ctx) => {
//   console.log("GET player info " + ctx.params.order);
//   const path = "../utils/data/playerInfo.json";
//   const data = require(path);
//   console.log("PLAYER " + data[ctx.params.order - 1].name);
//   ctx.body = {
//     status: "success",
//     data: data[ctx.params.order - 1],
//   };
// };

// const setGameState = async (ctx) => {
//   removeUnwantedFiles();
//   const { key } = ctx.params;
//   if (key == "KD") {
//     let dataParsed = loadStates(key);
//     let newData = {
//       id: ctx.request.body.id,
//       ques_id: ctx.request.body.ques_id,
//       status: ctx.request.body.status,
//       score: ctx.request.body.score,
//     };
//     dataParsed.push(newData);
//     fs.writeFile(
//       `./battleState/data/battleState_${key}.json`,
//       JSON.stringify(dataParsed),
//       function writeJSON(err) {
//         if (err) return console.log(err);
//       }
//     );
//   }
//   ctx.body = { succeed: true };
// };

// const setBattleState = async (ctx) => {
//   removeUnwantedFiles();
//   battleState.data = ctx.request.body.data;
//   ctx.body = { succeed: true };
// };

// const convertLatexToHTML = (filename) => {
//   const args = "-f latex -t html";
//   // console.log("Yo");
//   let res = require(`../data/${filename}`);
//   // console.log(res);
//   if (
//     filename == "KD.json" ||
//     filename == "VD.json" ||
//     filename == "CHST.json"
//   ) {
//     // console.log("In");
//     res.forEach((data) => {
//       // console.log("In1");
//       data.data.forEach((item) => {
//         let src_ques = item.question;
//         // console.log(src_ques);
//         let src_ans = item.ans;
//         const foo_ques = (result) => {
//           item.question = result;
//           console.log(result);
//           fs.writeFile(
//             `../data/${filename}`,
//             JSON.stringify(res),
//             function writeJSON(err) {
//               if (err) {
//                 console.log("LOI NE");
//                 return console.log(err);
//               }
//             }
//           );
//         };
//         const foo_ans = (result) => {
//           item.ans = result;
//           fs.writeFile(
//             `../data/${filename}`,
//             JSON.stringify(res),
//             function writeJSON(err) {
//               if (err) {
//                 console.log("LOI NE 1");
//                 return console.log(err);
//               }
//             }
//           );
//         };
//         const pandocCallback_ques = function (err, res) {
//           if (res === true) {
//             console.log("Bug pandoc: ", item.question);
//             pandoc(src_ques, args, pandocCallback_ques);
//           }
//           if (err) {
//             console.log("LOI NE 2");
//             return console.log(err);
//           }
//           foo_ques(res);
//           return res;
//         };
//         const pandocCallback_ans = function (err, res) {
//           if (res === true) {
//             console.log("Bug pandoc: ", item.ans);
//             pandoc(src_ans, args, pandocCallback_ans);
//           }
//           if (err) {
//             console.log("LOI NE 3");
//             return console.log(err);
//           }
//           foo_ans(res);
//           return res;
//         };
//         pandoc(src_ques, args, pandocCallback_ques);
//         // pandoc(src_ans, args, pandocCallback_ans);
//       });
//     });
//   } else if (filename == "TT.json" || filename == "CHP.json") {
//     res.forEach((data) => {
//       let item = data.data;
//       let src_ques = item.question;
//       let src_ans = item.ans;
//       const foo_ques = (result) => {
//         data.data.question = result;
//         fs.writeFile(
//           `../data/${filename}`,
//           JSON.stringify(res),
//           function writeJSON(err) {
//             if (err) return console.log(err);
//           }
//         );
//       };
//       const foo_ans = (result) => {
//         data.data.ans = result;
//         fs.writeFile(
//           `../data/${filename}`,
//           JSON.stringify(res),
//           function writeJSON(err) {
//             if (err) return console.log(err);
//           }
//         );
//       };
//       const pandocCallback_ques = function (err, res) {
//         if (res === true) {
//           console.log("Bug pandoc: ", item.question);
//           pandoc(src_ques, args, pandocCallback_ques);
//         }
//         if (err) console.error(err);
//         foo_ques(res);
//         return res;
//       };
//       const pandocCallback_ans = function (err, res) {
//         if (res === true) {
//           console.log("Bug pandoc: ", item.ans);
//           pandoc(src_ans, args, pandocCallback_ans);
//         }
//         if (err) console.error(err);
//         foo_ans(res);
//         return res;
//       };
//       pandoc(src_ques, args, pandocCallback_ques);
//       pandoc(src_ans, args, pandocCallback_ans);
//       // console.log(data.data.question);
//     });
//   } else if (filename == "VCNV.json") {
//     let src_sol = res["CNV"].solution;
//     const foo_sol = (result) => {
//       res["CNV"].solution = result;
//       fs.writeFile(
//         `../data/${filename}`,
//         JSON.stringify(res),
//         function writeJSON(err) {
//           if (err) return console.log(err);
//         }
//       );
//     };
//     const pandocCallback_sol = function (err, res) {
//       if (res === true) {
//         // console.log("Bug pandoc: ", res["CNV"].solution);
//         pandoc(src_sol, args, pandocCallback_sol);
//       }
//       if (err) console.error(err);
//       foo_sol(res);
//       return res;
//     };
//     pandoc(src_sol, args, pandocCallback_sol);
//     // console.log(res["CNV"].solution);
//     // });
//     res["data"].forEach((data) => {
//       // data.data.forEach((item) => {
//       let src_ques = data.data.question;
//       const foo_ques = (result) => {
//         data.data.question = result;
//         fs.writeFile(
//           `../data/${filename}`,
//           JSON.stringify(res),
//           function writeJSON(err) {
//             if (err) return console.log(err);
//           }
//         );
//       };
//       const pandocCallback_ques = function (err, res) {
//         if (res === true) {
//           console.log("Bug pandoc: ", data.data.question);
//           pandoc(src_ques, args, pandocCallback_ques);
//         }
//         if (err) console.error(err);
//         foo_ques(res);
//         return res;
//       };
//       pandoc(src_ques, args, pandocCallback_ques);
//       // console.log(src_ques);
//       // });
//       // console.log(data.data.question);
//     });
//   }
// };

const uploadGameContent = async (req, res) => {
  console.log("Start uploading data");
  let log = "\n START UPLOADING DATA";
  let { files } = req;
  // console.log(files);
  // console.log(ctx.request);
  // if (files.length !== 5) {
  //   ctx.body = {
  //     succeed: false,
  //     log: "\n [ERROR] NEED IMPORT 5 FILES" + files.length,
  //   };
  //   return;
  // }
  for (let name in files) {
    log += "\n -- START UPLOADING file " + files[name].name;
    fs.renameSync(files[name].path, `./src/data/${files[name].name}`);
    let filename = files[name].name;
    try {
      log += `\n   [UPLOADED SUCCESSFULLY] file ${files[name].name}`;
    } catch (err) {
      console.log(filename + " not converted");
      log += `\n    + ${filename} CANNOT CONVERT`;
      log += `\n -- [FAILED] TO UPLOAD FILE ${filename}`;
      res.json = { succeed: false, log: `FAILED to upload file ${name}` };
      return;
    }
  }
  console.log("All data loaded successfully");
  log += "\n [ALL DATA UPLOADED SUCCESSFULLY] \n";
  res.json = { succeed: true, log: log };
  return;
};

// const loadQues = (filename) => {
//   const dataBuffer = fs.readFileSync("./utils/data/" + filename);
//   const dataJSON = dataBuffer.toString();
//   return JSON.parse(dataJSON);
// };

// const updateQues = async (ctx) => {
//   removeUnwantedFiles();
//   let filename = ctx.params.game + ".json";
//   let dataParsed = loadQues(filename);
//   dataParsed[ctx.request.body["id"] - 1]["data"][
//     ctx.request.body["data"][0].id - 1
//   ] = ctx.request.body["data"][0];
//   fs.writeFileSync(
//     `../server/utils/data/${filename}`,
//     JSON.stringify(dataParsed)
//   );
//   // console.log(
//   //   dataParsed[ctx.request.body["id"] - 1]["data"][
//   //     ctx.request.body["data"][0].id - 1
//   //   ]
//   // );
//   ctx.body = {
//     succeed: true,
//     log: "SUCCESSFULLY UPDATED",
//   };
// };

// const releaseIp = async (ctx) => {
//   removeUnwantedFiles();
//   adminIp = "";
//   console.log("admin ip released");
//   ctx.body = { succeed: true };
// };

// const updatePlayerImage = async (ctx) => {
//   const data = require("../utils/data/playerInfo.json");
//   fs.writeFileSync(
//     `../server/utils/data/playerInfo.json`,
//     JSON.stringify([
//       ...data.map((player) => {
//         if (parseInt(player.order) === parseInt(ctx.params.order)) {
//           console.log("UPDATE AVATAR IMAGE OF PLAYER ", player.order);
//           return { ...player, avatar: ctx.request.body.avatar };
//         } else return { ...player };
//       }),
//     ])
//   );

//   ctx.body = {
//     status: "success",
//     log: `Upload avatar of player success`,
//   };
// };

const getData = async (req, res) => {
  if (req.params.table == "scores") {
    const data = await Score.findAll();
    res.json(data);
  }
  // Score.findAll()
  //   .then((result) => {
  //     res.json(result);
  //   })
  //   .catch((err) => console.log(err));
  else if (req.params.table == "users")
    User.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  else if (req.params.table == "viewers")
    Viewer.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
};

const clearData = async (req, res) => {
  if (req.params.table == "scores")
    Score.destroy({
      where: {},
      // truncate: true,
    })
      .then(console.log("Cleared"))
      .catch((err) => console.log(err));
  else if (req.params.table == "users")
    User.destroy({
      where: {},
      truncate: true,
    })
      .then(console.log("Cleared"))
      .catch((err) => console.log(err));
  else if (req.params.table == "viewers")
    Viewer.destroy({
      where: {},
      truncate: true,
    })
      .then(console.log("Cleared"))
      .catch((err) => console.log(err));
};

module.exports = {
  //   connection,
  getGameContent,
  //   setGameState,
  //   setBattleState,
  uploadGameContent,
  //   updateQues,
  //   releaseIp,
  //   _getPlayerInfo,
  //   updatePlayerImage,
  // convertLatexToHTML,
  getData,
  clearData,
};
