var DebonceStat = false
module.exports = function (controller) {
    const { Client } = require("discord.js");
    const client = new Client();
  if (DebonceStat = false) {
    DebonceStat = true
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
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
    });

    client.login(process.env.DISCORD_TOKEN);
    DebonceStat = false
  }

    controller.on("slash_command", async (bot, message) => {
        let response;

        switch (message.command) {
            case "thanks":
                response = generateThanksResponse(message);
                break;
            case "example":
                response = generateExampleEmbed();
                break;
            default:
                response = "Unknown command";
                break;
        }

        await bot.api.interactions(message.id, message.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: response,
                },
            },
        });
    });
};

function generateThanksResponse(message) {
    let sender = message.user;
    let recipient = message.mentions.users.filter((user) => !user.bot).last();

    let responses = [
        `${recipient} got kudos from ${sender} 🎉`,
        `${sender} thinks ${recipient} is awesome! ✨`,
        `Hey ${recipient}! ${sender} appreciates you! 😍`,
        `Hey ${recipient}! ${sender} thinks you rule! 💪`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}

function generateExampleEmbed() {
    return {
        embed: {
            title: "Example Embed",
            description: "This is an example embed",
            color: 0x0099ff,
            timestamp: new Date().toISOString(),
            footer: {
                text: "Example Footer",
            },
        },
    };
}
