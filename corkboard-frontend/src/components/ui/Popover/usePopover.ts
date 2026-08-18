import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { usePopoverStore } from "../../../store/popoverStore.ts";

interface TriggerProps {
    ref?: React.Ref<HTMLElement>;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    className?: string;
}

interface usePopoverProps {
    trigger: React.ReactElement<TriggerProps>;
    offset?: number;
}

const usePopover = ({ trigger, offset = 10 }: usePopoverProps) => {
    const idRef = useRef(uuid());
    const id = idRef.current;

    const open = usePopoverStore((state) => state.activeId === id);
    const toggle = usePopoverStore((state) => state.toggle);
    const close = usePopoverStore((state) => state.close);

    const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
    const triggerRef = useRef<HTMLElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [coords, setCoords] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });

    useLayoutEffect(() => {
        if (!open || !triggerRef.current) return;

        const positionPanel = () => {
            const triggerRect = triggerRef.current!.getBoundingClientRect();
            const panelRect = panelRef.current?.getBoundingClientRect();
            const panelHeight = panelRect?.height ?? 0;
            const panelWidth = panelRect?.width ?? 0;

            const spaceBelow = window.innerHeight - triggerRect.bottom;
            const shouldFlip = spaceBelow < panelHeight + offset && triggerRect.top > panelHeight + offset;
            setPlacement(shouldFlip ? "top" : "bottom");

            let left = triggerRect.left;
            left = Math.min(Math.max(8, left), window.innerWidth - panelWidth - 8);
            const top = shouldFlip ? triggerRect.top - panelHeight - offset : triggerRect.bottom + offset;
            setCoords({ top, left });
        };

        positionPanel();
        window.addEventListener("resize", positionPanel);
        window.addEventListener("scroll", positionPanel, true);

        return () => {
            window.removeEventListener("resize", positionPanel);
            window.removeEventListener("scroll", positionPanel, true);
        };
    }, [open, offset]);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (e: PointerEvent) => {
            const target = e.target as Node;
            if (panelRef.current && !panelRef.current.contains(target) && triggerRef.current && !triggerRef.current.contains(target)) {
                close();
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };

        const handleWheel = (e: WheelEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                e.preventDefault();
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                e.preventDefault();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("wheel", handleWheel, { passive: false });
        document.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
            document.addEventListener("wheel", handleWheel, { passive: false });
            document.addEventListener("touchmove", handleTouchMove, { passive: false });
        };
    }, [close, open]);

    const triggerWithProps = React.cloneElement(trigger, {
        ref: (node: HTMLElement | null) => {
            triggerRef.current = node;
            const originalRef = trigger.props.ref;

            if (typeof originalRef === "function") {
                originalRef(node);
            } else if (originalRef && typeof originalRef === "object" && "current" in originalRef) {
                // eslint-disable-next-line react-hooks/immutability
                (originalRef as React.RefObject<HTMLElement | null>).current = node;
            }
        },
        onClick: (event: React.MouseEvent<HTMLElement>) => {
            trigger.props.onClick?.(event);
            toggle(id);
        },
        className: `${trigger.props.className ?? ""} trigger`,
    });

    return { triggerWithProps, panelRef, coords, open, placement };
};

export default usePopover;
