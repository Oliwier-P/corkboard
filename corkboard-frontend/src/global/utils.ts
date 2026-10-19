import classNames from "classnames";
import type { TaskStatus } from "@/types/ReleaseBoardTypes.ts";

type Modifier = string | false | null | undefined;
type ConditionalModifiers = Record<string, boolean | undefined | null>;
type ClassName = string | undefined;
export const ClassNames = (block: string, ...args: (Modifier[] | ConditionalModifiers | ClassName)[]): string => {
    let modifiers: Modifier[] = [];
    let conditionalModifiers: ConditionalModifiers = {};
    let className: string | undefined;

    args.forEach((arg) => {
        if (Array.isArray(arg)) {
            modifiers = arg;
        } else if (typeof arg === "string") {
            className = arg;
        } else if (typeof arg === "object" && arg !== null) {
            conditionalModifiers = arg;
        }
    });

    const formattedModifiers = modifiers.filter((modifier) => Boolean(modifier)).map((modifier) => `${block}--${modifier}`);
    const conditionalClasses = Object.entries(conditionalModifiers)
        .filter(([_key, value]) => Boolean(value))
        .map(([key]) => `${block}--${key}`);

    return classNames(block, ...formattedModifiers, ...conditionalClasses, className);
};

export const reverseColor = (color: string) => {
    const hex = color.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#ffffff";
};

export const BOARD_COLUMNS: TaskStatus[] = ["todo", "in_progress", "review_pending", "testing", "adjustments", "accepted"];
