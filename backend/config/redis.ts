// Core and Third-Party Libraries
import { createClient } from "redis";

// Utils and Helpers
import { constants } from "@Utils/constant";

const redisClient = createClient({ url: constants.REDIS_URL });

redisClient.connect();
redisClient.on("connect", function (err: any) {
    console.log("Redis connected successfully.");
});

redisClient.on("error", (err) => console.log("Redis connect Error", err.message));
export default redisClient;
