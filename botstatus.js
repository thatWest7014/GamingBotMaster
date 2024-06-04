const { Client } = require("discord.js");
const client = new Client();

client.on("ready", () => {
    // Set bot's status to "Do Not Disturb" with the status message "Testing"
    client.user.setPresence({ status: 'dnd', activity: { name: 'Testing' } });

    // Ping Discord once every 5 minutes
    setInterval(() => {
        client.ws.ping().then((ping) => {
            console.log(`Discord ping: ${ping}ms`);
        }).catch((error) => {
            console.error('Error pinging Discord:', error);
        });
    }, 120000); // 2 minutes in milliseconds(2x6x1000)
});

client.login(process.env.DISCORD_TOKEN);