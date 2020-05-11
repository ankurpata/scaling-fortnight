// import { createRequire } from "module";
//
// const require = createRequire(import.meta.url); // eslint-disable-line
// const { kafka } = require("kafka-node");
// eslint-disable-next-line node/no-extraneous-import
import Logger from "@reactioncommerce/logger";

// import { createRequire } from "module";

import kafkaApi from "node-rdkafka/lib/index.js";

const { KafkaConsumer } = kafkaApi;
// import Kafka from "node-rdkafka"; // see: https://github.com/blizzard/node-rdkafka

const CONSUMER_GROUP_ID = "node-consumer-2";


/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @returns {undefined}
 */
export default async function kafkaSubscriber() {
    try {
        console.log("kafka consumer is booting up");
        Logger.info("!!! Connecting Kafka !!!");

        const kafkaConf = {
            "group.id": CONSUMER_GROUP_ID,
            "metadata.broker.list": "rocket-01.srvs.cloudkafka.com:9094,rocket-02.srvs.cloudkafka.com:9094,rocket-03.srvs.cloudkafka.com:9094",
            "security.protocol": "SASL_SSL",
            "sasl.mechanisms": "SCRAM-SHA-256",
            "sasl.username": "bddcy39c",
            "sasl.password": "e8hPouz3LL2rhp_vtQhp547rYsr9BbhQ",
            "socket.keepalive.enable": true,
            "debug": "generic,broker,security"
        };

        const topics = ["bddcy39c-default"];


        var stream = new KafkaConsumer.createReadStream(kafkaConf, {"auto.offset.reset": "earliest"}, {
            topics: topics
        });

        stream.on('data', function (message) {
            console.log(`Consumed message on Stream: ${message.value.toString()}`);
            console.log(message, "~~~~~Message Received@kafkaConsumerReactionCommerce~~~~~~");
            Logger.info(message);
            Logger.info("~~~~~Message Received@kafkaConsumerReactionCommerce~~~~~~");

            console.log("deleteStatus");
            console.log("Post Deleted Successfully");
            // the structure of the messages is as follows:
            //   {
            //     value: Buffer.from('hi'), // message contents as a Buffer
            //     size: 2, // size of the message, in bytes
            //     topic: 'librdtesting-01', // topic the message comes from
            //     offset: 1337, // offset the message was read from
            //     partition: 1, // partition the message was on
            //     key: 'someKey', // key of the message if present
            //     timestamp: 1510325354780 // timestamp of message creation
            //   }
        });
        console.log(`Stream consumer created to consume from topic ${topics}`);

        stream.consumer.on("disconnected", function (arg) {
            console.log(`The stream consumer has been disconnected`)
            process.exit();
        });

// automatically disconnect the consumer after 30 seconds
        setTimeout(function () {
            stream.consumer.disconnect();
        }, 30000)

    } catch (e) {
        console.log(e);
    }
}
