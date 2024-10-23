import { APP_URL, PORT, TELEGRAM_TOKEN } from "./constants";
import express, { Application } from "express";
import { Telegraf } from "telegraf";
const bot = new Telegraf(TELEGRAM_TOKEN);
const app: Application = express();
app.use(express.static("static"));
app.use(express.json());
app.get("/", (_, res) => {
  res.send("Hello World");
});
app.listen(PORT, () => {
  console.log(`Server is Fire at http://localhost:${PORT}`);
});
bot.command("start", async (ctx) => {
  // First, send the image
  await ctx.replyWithPhoto('https://api.guruasn.my.id/storage/images/tarziuslanscape.webp');

  // Then, send the text with the keyboard
  return ctx.reply(`Ready to Rule the Jungle?\n👉 Press "Start Game" to kick off your tapping spree!\n👉 Engage in missions, employ tactical boosts, and compete for the highest scores.\n👉 Earn $TARZI tokens as you play, and use them to gain a competitive edge.`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `Play Game`,
            web_app: { url: `${APP_URL}/` },
          },
        ],
      ],
    },
  });
});

bot.launch();
export default app;
