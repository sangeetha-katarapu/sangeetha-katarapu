export default {
    // DB: {
    //     "mongoDBURL": "mongodb://fgcpas_ui:QtxPas2020@172.16.1.165:35001/fgc_pas",
    //     // "mongoDBURL": "mongodb://pas_dm:QuadPaaSqweasd2020@10.0.0.8:35001/PASDev"
    // },
    sessionInfo: {
        "maxAge": 1000 * 60 * 60 * 3,
        "sessionKey": "sentaQuad",
        "serverPort": 2100,
    },

    
    jwttoken: {
        "secretKey": "pasQuad",
        "logInTokExpiresIn": "3d", //ex: m h d
    },
    filePath: {
        serverLog: "./loggers/serverLogger",
        consoleLog: "./loggers/consoleLogger",
    },
   
}
