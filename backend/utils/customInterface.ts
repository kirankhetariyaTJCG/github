import { Request } from "express";

type customObjects = { [k: string]: string | number | boolean };

export type userRequest = Request & {
    user?: customObjects;
};
export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}
