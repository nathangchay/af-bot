const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { laravelSession } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('login')
    .setDescription('Link your Discord account to your Art Fight profile')
    .addStringOption((option) => option.setName('username')
      .setDescription('Your Art Fight username')
      .setRequired(true)),

  async execute(interaction) {
    const username = interaction.options.getString('username');

    await axios.get(`https://artfight.net/~${username}`, {
      headers: {
        cookie: `laravel_session=${laravelSession}`,
      },
    })
      .then(() => {
        interaction.reply(`Success! Your Art Fight account has been set as **~${username}**.`);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          interaction.reply(`Error: No Art Fight account with the username **~${username}** was found. Please try again.`);
        } else {
          interaction.reply('Error: Undefined. Please try again or contact @nate#3000 if this error persists.');
        }
      });
  },
};
