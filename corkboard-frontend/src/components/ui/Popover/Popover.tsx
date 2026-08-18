import "./Popover.scss";
import React from "react";
import usePopover from "./usePopover.ts";
import { usePopoverStore } from "../../../store/popoverStore.ts";
import { Button } from "../Button/Button.tsx";
import classNames from "classnames";

interface TriggerProps {
    ref?: React.Ref<HTMLElement>;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    className?: string;
}

interface PopoverProps {
    className?: string;
    trigger: React.ReactElement<TriggerProps>;
    children: React.ReactNode;
    offset?: number;
}

const Popover = ({ className, trigger, children, offset }: PopoverProps) => {
    const { triggerWithProps, panelRef, coords, open, placement } = usePopover({ trigger, offset });

    return (
        <div className="popover">
            {triggerWithProps}
            {open && (
                <div
                    ref={panelRef}
                    style={{ top: coords.top, left: coords.left }}
                    className={`panel ${placement === "bottom" ? "panel--bottom" : "panel--top"} ${className}`}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

interface PopoverItemProps<T> {
    className?: string;
    icon?: React.ReactNode;
    label: string;
    value: T;
    selected?: boolean;
    onSelect: (value: T) => void;
    closeOnSelect?: boolean;
}

const PopoverItem = <T,>({ className, icon, label, value, selected, onSelect, closeOnSelect = true }: PopoverItemProps<T>) => {
    const close = usePopoverStore((state) => state.close);

    return (
        <Button
            className={classNames("item", className, { selected: selected })}
            onClick={() => {
                onSelect(value);
                if (closeOnSelect) close();
            }}
        >
            {icon}
            <span className="label">{label}</span>
        </Button>
    );
};

Popover.PopoverItem = PopoverItem;

export default Popover;
