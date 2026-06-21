import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('clientReady', () => {
    console.log(`Logged in as ${client.user.tag}`);
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