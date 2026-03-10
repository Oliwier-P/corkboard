import {useEffect, useRef, useState} from "react";
import "./ContextMenu.scss"
import {Icon, type IconNames} from "../Icons/Icon.tsx";
import {ClassNames} from "../../../global/utils.ts";

export type ContextMenuItem = {
    type: "button"
    label: string,
    color?: "red"
    icon: IconNames
    onClick: () => void
} | {
    type: "hr"
}

type ContextMenuProps = {
    items: ContextMenuItem[]
    children: React.ReactNode;
}

export const ContextMenu = ({items, children}: ContextMenuProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const [position, setPosition] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const ref = useRef<HTMLDivElement>(null)

    const contextMenuHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsVisible(true)
        setPosition({x: e.clientX, y: e.clientY})
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };
        if (isVisible) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isVisible]);

    const renderItem = (item: ContextMenuItem) => {
        switch (item.type) {
            case "button":
                return (
                    <div className={ClassNames("context-menu__item", [item.color])} onClick={() => {
                        setIsVisible(false)
                        item.onClick()
                    }}>
                        <Icon icon={item.icon}/>
                        {item.label}
                    </div>
                )
            case "hr":
                return <div className="context-menu__hr"/>
        }
    }

    return (
        <>
            <div onContextMenu={contextMenuHandler}>{children}</div>
            {isVisible && (
                <div className="context-menu" ref={ref} style={{left: position.x, top: position.y}}>
                    {items.map(item => renderItem(item))}
                </div>
            )}
        </>
    )
}