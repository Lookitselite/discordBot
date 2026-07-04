import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import users from './users.json' with { type: 'json' };

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let wokeMode = false;
let pingedUsers = [];
const allUserIds = Object.keys(users);

function randomIntGen(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}

client.once('clientReady', async () => {
    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        await channel.send('I have woken');
        
        runPingCycle(); 
    }
    catch (error) {
        console.error('Could not find or send message to the channel:', error);
    }
});

async function runPingCycle() {
    try {
        let currentWaitMinutes = 1; 

        if (!wokeMode) {
            currentWaitMinutes = randomIntGen(1, 90);
        }

        let date = new Date();
        let time = date.toLocaleTimeString(); 

        let availableUsers = allUserIds.filter(id => !pingedUsers.includes(id));

        if (availableUsers.length === 0) {
            pingedUsers = []; 
            availableUsers = [...allUserIds];
        }

        const randomIndex = Math.floor(Math.random() * availableUsers.length);
        const chosenUserId = availableUsers[randomIndex];
        pingedUsers.push(chosenUserId);

        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        
        await channel.send(`<@${chosenUserId}>, did you know it's ${time}?`);
        
        const identity = users[chosenUserId];
        console.log(`Pinged ${identity}. Next ping in ${currentWaitMinutes} minutes.`);

        setTimeout(runPingCycle, currentWaitMinutes * 60 * 1000);

    } catch (error) {
        console.error("Error in ping cycle:", error);
        setTimeout(runPingCycle, 60 * 1000); 
    }
}

client.login(process.env.DISCORD_TOKEN);