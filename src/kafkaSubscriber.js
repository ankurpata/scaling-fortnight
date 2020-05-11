// import { createRequire } from "module";
//
// const require = createRequire(import.meta.url); // eslint-disable-line
// const { kafka } = require("kafka-node");

import setContex from "kafka-node";

const { kafka } = setContex;

/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @returns {undefined}
 */
export default async function kafkaSubscriber() {
    try {
        console.log("kafka consumer is booting up")
        const Consumer = kafka.Consumer;
        const client = new kafka.KafkaClient("localhost:2181");
        let consumer = new Consumer(
            client,
            [{topic: 'feed-service', partition: 0}],
            {
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fetchMaxBytes: 1024 * 1024,
                encoding: 'utf8',
                fromOffset: false
            }
        );
        consumer.on('message', async function (message) {
            const consumerdata = JSON.parse(message.value);

            console.log("===>", consumerdata);

            console.log(typeof (consumerdata.data));

            console.log("deleteStatus");
            console.log("Post Deleted Successfully");

        });
        consumer.on('error', function (err) {
            console.log('error', err);
        });
    } catch (e) {
        console.log(e);
    }
}
