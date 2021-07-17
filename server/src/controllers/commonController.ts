var request = require('request');

var ObjectId = require('mongoose').Types.ObjectId;
import { Request, Response } from 'express';
const { consoleLog, serverLog } = require('../logs/createLogger')
import store from '../serverConfig'

import commonFunctions from '../helper/commonFunctions'


class CommonController {
    
    public commonFunctions(req: Request, res: Response) {
        console.log("req",req.body)
        var reqOpt:any = {}
        var reqBody = req.body.req_body
        reqOpt = {
            url: req.body.req_url,
            method: req.body.req_method,
            data: JSON.stringify(reqBody),
            headers: { 'Content-Type': 'application/json' }
        };
        commonFunctions.callExtAPI({ "options": reqOpt }, async function (resFromAPI: any) {
            if (Object.keys(resFromAPI).includes("errors")) {
                var errorResJson = {
                    "statusCode": "500",
                    "message":"Error Occured"
                }
                serverLog.info("err", resFromAPI)
                return res.json(errorResJson)

            }
            else {
                return res.json(resFromAPI)
                
            }
        })


    }
    public userFunctions(req: Request, res: Response) {
        var reqOpt = {}
        var reqBody = {}
        reqOpt = {
            url: req.body.req_url,
            method: req.body.req_method,
            data: JSON.stringify(reqBody),
            headers: { 'Content-Type': 'application/json', "Authorization": "Token "+ req.body.req_token }
        };
        commonFunctions.callExtAPI({ "options": reqOpt }, async function (resFromAPI: any) {
            // console.log("resFromKronos", resFromKronos, Object.keys(resFromKronos))
            if (Object.keys(resFromAPI).includes("errors")) {
                var errorResJson = {
                    "statusCode": "500",
                    "message":"Error Occured"
                }
                serverLog.info("err", resFromAPI)
                return res.json(errorResJson)

            }
            else {
                return res.json(resFromAPI)
            }
        })
    }
}
const commonController = new CommonController();
export default commonController;