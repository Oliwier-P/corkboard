import "./Tooltip.scss";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

interface TooltipProps {
    children: ReactNode;
    text: string;
}

const Tooltip = ({ children, text }: TooltipProps) => {
    return (
        <RadixTooltip.Provider delayDuration={500}>
            <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content sideOffset={6} className="tooltip">
                        {text}
                        <RadixTooltip.Arrow className="arrow" />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};

export default Tooltip;
