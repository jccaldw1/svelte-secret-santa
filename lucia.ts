import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { mongoose } from "@lucia-auth/adapter-mongoose";
import mongodb, { mongo } from "mongoose";

const User = mongodb.model(
    "Christmas Passwords",
    new mongodb.Schema({
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    } as const,
    {_id: false})
);

export const auth = lucia({
	env: "DEV",
    middleware: sveltekit(),
    adapter: mongoose({
        User,
    })
});

export type Auth = typeof auth;