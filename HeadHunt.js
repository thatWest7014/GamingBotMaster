const { Client, Intents, SlashCommandBuilder } = require('discord.js');
const admin = require('firebase-admin'); // Import Firebase Admin SDK

// Replace with your Firebase project configuration
const firebaseConfig = {
return;
  };

admin.initializeApp(firebaseConfig);
const db = admin.database(); // Initialize Firebase Realtime Database

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const guildId = guildId; // Replace with your guild ID
  const commands = [
    new SlashCommandBuilder()
      .setName('headhunt')
      .setDescription('Headhunt a user for banning on join.')
      .addStringOption(option =>
        option.setName('user_id')
          .setDescription('The ID of the user to headhunt.')
          .setRequired(true)
      ),
  ];

  try {
    await client.guilds.cache.get(guildId).commands.set(commands);
    console.log('Slash commands registered successfully.');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = interaction.commandName;
  const userId = interaction.options.getString('user_id');

  if (command === 'headhunt') {
    if (!interaction.member.permissionsFor(interaction.channel).has('BAN_MEMBERS')) {
      return await interaction.reply({ content: 'You don\'t have permission to use this command.', ephemeral: true });
    }

    if (!userId || !userId.match(/^\d+$/)) {
      return await interaction.reply({ content: 'Please provide a valid user ID.', ephemeral: true });
    }

    try {
      await db.ref(`HeadHunter/${userId}`).set(true);
      await interaction.reply({ content: `User with ID ${userId} will be banned on join.`, ephemeral: true });
    } catch (error) {
      console.error('Error storing headhunt target:', error);
      await interaction.reply({ content: 'An error occurred. Please check the bot console for details.', ephemeral: true });
    }
  }
});

client.on('guildMemberAdd', async member => {
  const userId = member.id;
  const headhuntRef = db.ref(`HeadHunter/${userId}`);

  try {
    const snapshot = await headhuntRef.once('value');
    if (snapshot.exists()) {
      await member.ban({ reason: 'Headhunted' });
      await headhuntRef.remove(); // Remove the target from Firebase after successful ban
      console.log(`Banned user with ID ${userId}.`);
    }
  } catch (error) {
    console.error('Error banning user:', error);
  }
});

client.login(process.env.DISCORD_TOKEN); // Replace with your bot token
