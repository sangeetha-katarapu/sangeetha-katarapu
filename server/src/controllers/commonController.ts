var request = require('request');

var ObjectId = require('mongoose').Types.ObjectId;
import { Request, Response } from 'express';
const { consoleLog, serverLog } = require('../logs/createLogger')
import store from '../serverConfig'

import commonFunctions from '../helper/commonFunctions'


class CommonController {

    public commonFunctions(req: Request, res: Response) {
        console.log("req", req.body)
        var reqOpt: any = {}
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
                    "message": "Error Occured"
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
        console.log("in user", req.body)
        var reqOpt: any = {}
        var reqBody = req.body.req_body
        reqOpt = {
            url: req.body.req_url,
            method: req.body.req_method,
            data: reqBody,
        };
        if (req.body.req_action == "login" || req.body.req_action == "registerUser")
            reqOpt['headers'] = { 'Content-Type': 'application/json' }
        else
            reqOpt['headers'] = { 'Content-Type': 'application/json', "Authorization": "Token " + req.body.req_token }

        commonFunctions.callExtAPI({ "options": reqOpt }, async function (resFromAPI: any) {
            // console.log("resFromKronos", resFromAPI, Object.keys(resFromAPI))
            if (Object.keys(resFromAPI).includes("errors")) {
                var errorResJson: any = {
                    "statusCode": "500",
                    "message": ""
                }
                if (req.body.req_action == "registerUser") {
                    var resStr = ""
                    for (var key in resFromAPI['errors']) {
                        resStr = resStr + " " + key
                    } resStr = resStr + " already exist"
                    errorResJson['message'] = resStr//Object.keys(resFromAPI['errors']) + " error"
                } else
                    errorResJson['message'] = resFromAPI['errors']
                serverLog.info("err", resFromAPI)
                return res.json(errorResJson)

            }
            else {
                var loginResJson = {
                    "statusCode": "200",
                    "data": resFromAPI
                }
                return res.json(loginResJson)
            }
        })
    }
}
const commonController = new CommonController();
export default commonController;