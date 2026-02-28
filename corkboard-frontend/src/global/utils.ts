import classNames from "classnames";

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
        } else if (typeof arg === 'string') {
            className = arg;
        } else if (typeof arg === 'object' && arg !== null) {
            conditionalModifiers = arg;
        }
    });

    const formattedModifiers = modifiers.filter((modifier) => Boolean(modifier)).map((modifier) => `${block}--${modifier}`);
    const conditionalClasses = Object.entries(conditionalModifiers)
        .filter(([_key, value]) => Boolean(value))
        .map(([key]) => `${block}--${key}`);

    return classNames(block, ...formattedModifiers, ...conditionalClasses, className);
};