import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('clientReady', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    const channelID = process.env.CHANNEL_ID;
    try {
        const channel = await client.channels.fetch(channelID);
        await channel.send('Hello, this is an automated message!');
    } catch (error) {
        console.error('Could not find or send message to the channel:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        log(interaction.commandName);
        await interaction.reply('Pong!');
    }
});


client.login(process.env.DISCORD_TOKEN);

function log(cmd) { 
    console.log(cmd + " recived")
}