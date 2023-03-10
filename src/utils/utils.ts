import { Context } from "telegraf";

export const getText = (ctx: any): string => {
    return ctx.message.text;
}

export const getIdPersona = (ctx: Context): number => {
    return ctx.message.from.id;
}
export const getIdChat = (ctx: Context): number => {
    return ctx.message.chat.id;
}
export const getNombrePersona = (ctx: Context): string => {
    return ctx.message.from.first_name;
}

export const isGroup = (ctx: Context): boolean => {
    return ["group","supergroup"].includes(ctx.chat.type);
}

export const sendMessage = (ctx: Context, text: string) => {
    ctx.telegram.sendMessage(getIdChat(ctx), text);
}

export const isAdmin = (ctx: Context): boolean => {
    console.log("isAdmin");
    
    return ctx.from.id === +process.env.BOT_ADMIN;
}

export const getHora = (ctx: Context): string => {
    const date =  new Date(ctx.message.date * 1000);
    const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return h +":"+ m +":"+ s;
}