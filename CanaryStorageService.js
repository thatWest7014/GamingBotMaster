const {initializeApp} = require('firebase/app');
const {getDatabase, ref, set, get} = require('firebase/database');
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
return;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const analytics = getAnalytics(app);

initializeApp(firebaseConfig);
const database = getDatabase();

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Function to get user data from Firebase
async function getUserData(guildId, userId) {
  const userRef = ref(database, `root/${guildId}/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log(`No data found for user ${userId} in guild ${guildId}`);
    return {};
  }
}

// Function to update user data in Firebase
async function updateUserData(guildId, userId, data) {
  const userRef = ref(database, `root/${guildId}/${userId}`);
  await set(userRef, data);
}

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const guildId = message.guild.id;
  const userId = message.author.id;

  // Get user data
  let userData = await getUserData(guildId, userId);

  // Here's an example logic for XP gain (modify as needed)
  userData.xp = userData.xp || 0; // Initialize XP if not set
  userData.xp += getRandomInt(5, 15); // Add 5-15 XP for each message

  // Update user data in Firebase
  await updateUserData(guildId, userId, userData);
});

client.login(process.env.DISCORD_TOKEN);
