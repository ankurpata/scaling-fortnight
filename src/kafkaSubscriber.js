// import { createRequire } from "module";
//
// const require = createRequire(import.meta.url); // eslint-disable-line
// const { kafka } = require("kafka-node");
import kafkaApi from "kafka-node";

const { KafkaClient, Consumer } = kafkaApi;


/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @returns {undefined}
 */
export default async function kafkaSubscriber() {
    try {
        console.log("kafka consumer is booting up")
        const client = new KafkaClient("localhost:2181");
        const consumer = new Consumer(
            client,
            [{topic: "feed-service", partition: 0}],
            {
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fetchMaxBytes: 1024 * 1024,
                encoding: "utf8",
                fromOffset: false
            }
        );
        consumer.on("message", async function (message) {
            const consumerdata = JSON.parse(message.value);
            console.log(message, "~~~~~Message Received@kafkaConsumerReactionCommerce~~~~~~");
            Logger.info(message);
            Logger.info("~~~~~Message Received@kafkaConsumerReactionCommerce~~~~~~");
            console.log("===>", consumerdata);

            console.log(typeof (consumerdata.data));

            console.log("deleteStatus");
            console.log("Post Deleted Successfully");

        });
        consumer.on("error", (err) => {
            console.log("error", err);
        });
    } catch (e) {
        console.log(e);
    }
}
