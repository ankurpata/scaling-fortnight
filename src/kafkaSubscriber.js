// import { createRequire } from "module";
//
// const require = createRequire(import.meta.url); // eslint-disable-line
// const { kafka } = require("kafka-node");
// eslint-disable-next-line node/no-extraneous-import
import Logger from "@reactioncommerce/logger";

import kafkaApi from "kafka-node";

const {KafkaClient, Consumer} = kafkaApi;


/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @returns {undefined}
 */
export default async function kafkaSubscriber() {
    try {
        console.log("kafka consumer is booting up");
        Logger.info("!!! Connecting Kafka !!!");

        const client = new KafkaClient({
            "metadata.broker.list": "rocket-01.srvs.cloudkafka.com:9094,rocket-02.srvs.cloudkafka.com:9094,rocket-03.srvs.cloudkafka.com:9094",
            "security.protocol": "SASL_SSL",
            "sasl.mechanisms": "SCRAM-SHA-256",
            "sasl.username": "bddcy39c",
            "sasl.password": "e8hPouz3LL2rhp_vtQhp547rYsr9BbhQ",
            "socket.keepalive.enable": true,
            "debug": "generic,broker,security"
        });
        const consumer = new Consumer(
            client,
            [{topic: "bddcy39c-default", partition: 1}],
            {
                autoCommit: true,
                fetchMaxWaitMs: 1000,
                fetchMaxBytes: 1024 * 1024,
                encoding: "utf8",
                fromOffset: false
            }
        );
        consumer.on("message", async (message) => {
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
