"use strict";
const CONFIG = require("../../../config");
const logger = require("../../common/logger").logger("turntable_export");
const moment = require("moment");
const { TurnTableUserExportStream } = require("../../collection/turn_table_user_chance_handler");


const fields = [
    "user_id", "total_chance", "valid_chance", "sum_send_gifts",
    "sum_receive_gifts", "recharge_chance", "watch_time_chance", "share_chance", "chat_chance",
    "watch_video_chance", "follow_chance", "lv_1", "lv_2", "lv_3",
    "lv_4", "lv_5", "lv_6", "lv_7"
];
const fieldNames = [
    "中奖人ID", "获得抽奖次数", "剩余抽奖次数", "送出礼物机会",
    "收到礼物机会", "充值金币机会", "观看时长机会", "分享机会", "直播间发言机会",
    "观看短视频机会", "关注机会", "中一等奖次数", "中二等奖次数", "中三等奖次数",
    "中四等奖次数", "中五等奖次数", "中六等奖次数", "中七等奖次数"
];

module.exports = {
    name: "exportOneTable",
    description: "转盘用户数据导出", 
    version: "1.0.0",
    checkSign: CONFIG.api_sign_enable,
    surfaceId: "turntable_export_one_table",
    inputs: ["turntable_id"],
    outputs: "",
    executor: function(inputs, res) {
        let where = {
            turntable_id: Number(inputs.turntable_id),
        };
        res.setHeader('Content-Disposition', 'attachment; filename="turn-table.csv"');
        res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
        res.write(Buffer.concat([new Buffer('\xEF\xBB\xBF', 'binary'), new Buffer(fieldNames.join(',') + '\n')]));
        let start = (new Date).getTime();
        let stream = TurnTableUserExportStream(where);
        stream.on('data', data => {
            let finalData = processData(data);
            let _data = JsonToArray(finalData, fields).join(',');
            res.write(_data + '\n');
        });

        stream.on('error', err => {
            res.end(err.message || err);
            logger.error("Export Failed:", err.message || err);
        });

        stream.on('close', () => {
            logger.info("Export finished after:", (new Date).getTime() - start, "ms");
            res.end();
        });
        
    }
};

function processData(data) {
    const prizeCount = data.prize_count || {};
    const rewardFields = [ "lv_1", "lv_2", "lv_3", "lv_4", "lv_5", "lv_6", "lv_7"];

    rewardFields.forEach(key => {
        data[key] = prizeCount[key.slice(-1)] || 0;
    });

    return data;
}

function JsonToArray(obj, fields) {
    return fields.reduce((acc, ele) => {
        let result;
        if (typeof obj[ele] == 'object' && !(Array.isArray(obj[ele]))) {
            if (obj[ele]) {
                result = new moment(obj[ele]).toISOString();
            } else {
                result = ' ';
            }
        } else if (typeof(obj[ele]) == 'string'){
            if (obj[ele]) {
                result = `\`${obj[ele].split(',').join('`').replace(/\n/gm,"")}\``;
            } else {
                result = ' ';
            }
        } else {
            result = obj[ele];
        }
        return [...acc, result];
    }, []);
}