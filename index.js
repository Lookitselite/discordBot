import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
import schedule from 'node-schedule';

const rule = new schedule.RecurrenceRule();
rule.hour = [6, 18];
rule.minute = 7;
rule.second = 5;

client.login(process.env.DISCORD_TOKEN);

client.once('clientReady', async () => {
    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        await channel.send('I have woken');
    }
    catch (error) {
        console.error('Could not find or send message to the channel:', error);
    }
});

const job = schedule.scheduleJob(rule, async () => {
    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        const uID = process.env.TARG_ID;
        await channel.send(`<@${uID}>! IT'S 6:07! 676767!!!!!`);
    }
    catch (error) {
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

function log(cmd) { 
    console.log(cmd + " recived")
}