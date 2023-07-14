    // jshint esversion: 11
const {client,EmbedBuilder}       = require ('./clients/discord');
const handler                     = require ('./clients/handler');

const embed = (parent, channel) => {
  try {
    const Embed = new EmbedBuilder ();

    if (parent.Title) Embed.setTitle(parent.Title);
    if (parent.Author) Embed.setAuthor (parent.Author);
    if (parent.Color) Embed.setColor (parent.Color);
    if (parent.Description) Embed.setDescription (parent.Description);
    if (parent.Fields) Embed.setFields (parent.Fields);
    if (parent.Footer) Embed.setFooter (parent.Footer);
    if (parent.Image) Embed.setImage (parent.Image);
    if (parent.Thumbnail) Embed.setThumbnail (parent.Thumbnail);
    if (parent.Timestamp) Embed.setTimestamp (parent.Timestamp);

    channel.send({ embeds: [Embed] });
  }catch (e) {
  }
};

handler.on ('vcmpEvents', (_socket, json) => {
  try {
    let channel = client.channels.cache.get (json.channelId);
    switch (json.channelEvent) {
      case "reply":
        let currentMessage = channel.messages.cache.get (json.messageId);
        currentMessage.reply (json.content);
      break;

      case "send": channel.send (json.content); break;

        // embeds
      case "embed": embed (json.embeds, channel); break;
    }

      // client/bot events
    if (json.botEvent)  client.user [json.botEvent] (json.content);
  }catch (e) {
  }
});


process.on ('uncaughtException', e => {
  console.log (e)
});