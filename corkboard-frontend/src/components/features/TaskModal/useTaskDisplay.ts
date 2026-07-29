import { useEffect, useState } from "react";

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
