export const Config = {
    get port() { return process.env.PORT || 3000 },
    mongo: {
        get url() { return process.env.MONGO_URL },
        get dbName() { return process.env.MONGO_DB_NAME },
    },
};