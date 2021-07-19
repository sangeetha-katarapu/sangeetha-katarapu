import store from '../serverConfig'
const { consoleLog, serverLog } = require('../logs/createLogger')
const fs = require('fs')

class CommonFunctions {
    public async callExtAPI(jsonObj: any, callback: any) {
        try {
            serverLog.info("in callExtAPI req", jsonObj)
            let fetch = require('node-fetch');
            if (jsonObj['options']['method'] == "POST") {
                const response = await fetch(jsonObj['options']['url'], {
                    method: jsonObj['options']['method'],
                    headers: jsonObj['options']['headers'],
                    body: jsonObj['options']['data']
                });
                serverLog.info("In callExtAPI json post is ", response)
                const json = await response.json();
                serverLog.info("In callExtAPI json post is ", json)
                callback(json)
            }
            else {
                const response = await fetch(jsonObj['options']['url'], {
                    method: jsonObj['options']['method'],
                    headers: jsonObj['options']['headers'],
                });

                const dataRes = await response.json();
                serverLog.info("In callExtAPI json get is ", dataRes)


                callback(dataRes)
            }


        }
        catch (err: any) {
            serverLog.error("Error in callExtAPI is ", err)
            callback({
                "message": "callExtAPI API issue",
                "statusCode": 500
            })
        }
    }
    
}
const commonFunctions = new CommonFunctions();
export default commonFunctions;