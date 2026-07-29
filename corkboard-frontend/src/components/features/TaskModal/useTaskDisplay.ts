import { useEffect, useRef, useState } from "react";

export const useAutoResizeTextarea = (value: string) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = ref.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [value]);

    return ref;
};

export const useDelayedUnmount = (isOpen: boolean) => {
    const [shouldRender, setShouldRender] = useState(isOpen);

    if (isOpen && !shouldRender) {
        setShouldRender(true);
    }

    useEffect(() => {
        if (isOpen) return;

        const timeoutId = setTimeout(() => setShouldRender(false), 200);
        return () => clearTimeout(timeoutId);
    }, [isOpen]);

    return shouldRender;
};
