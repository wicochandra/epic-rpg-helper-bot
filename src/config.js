require('dotenv').config()

exports.botToken = process.env.DISCORD_BOT_TOKEN,
exports.users = {
        epicRpg: process.env.USER_ID_EPIC_RPG
    },
exports.roles = {
    coin: process.env.ROLE_ID_COIN,
    fish: process.env.ROLE_ID_FISH,
    chop: process.env.ROLE_ID_CHOP,
    arena: process.env.ROLE_ID_ARENA,
    miniboss: process.env.ROLE_ID_MINIBOSS,
    boss: process.env.ROLE_ID_BOSS,
}
