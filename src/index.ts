import * as dotenv from "dotenv";
import { textMessage } from "./pole/pole";
import { getNombrePersona } from "./utils/utils";
import { Context, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Update } from "telegraf/typings/core/types/typegram";
import { conection } from "./db/dbinit";
import { send_log } from "./utils/error_log";
dotenv.config();

export const bot: Telegraf<Context<Update>> = new Telegraf(
  process.env.BOT_TOKEN
);

bot.start((ctx: Context) => {
  ctx.reply(`Bienvenido ${getNombrePersona(ctx)}`);
});
bot.on(message("text"), (ctx: Context) => {
  textMessage(ctx);
});

// bot.command("invierno", (ctx: Context) => {
//   isAdmin(ctx) && ConfigService.instance.invierno(ctx);
// });
// bot.command("verano", (ctx: Context) => {
//   isAdmin(ctx) && ConfigService.instance.verano(ctx);
// });

conection(bot.telegram)
  .then(() => {
    bot.launch();
  })
  .catch((e) => {
    console.log(e);
  });
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
