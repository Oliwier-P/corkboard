import "./TextColorPopover.scss";
import Popover from "@/ui/Popover/Popover.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { Icon } from "@/ui/Icons/Icon.tsx";
import type { Editor } from "@tiptap/react";

interface TextColorPopoverProps {
    editor: Editor;
}

const TextColorPopover = ({ editor }: TextColorPopoverProps) => {
    const colorItems = [
        { label: "Red", value: "#F03831" },
        { label: "Orange", value: "#FCA165" },
        { label: "Yellow", value: "#ffd577" },
        { label: "Blue", value: "#6ABFFC" },
        { label: "Purple", value: "#6C5DFF" },
        { label: "Green", value: "#3DD58C" },
        { label: "Grey", value: "#8c8c8c" },
        { label: "White", value: "#FFFFFFDE" },
    ];

    const handleText = (value: string) => {
        editor.chain().focus().setColor(value).run();
    };

    return (
        <div className="text-color-popover">
            <Popover
                tooltip="Text color"
                trigger={
                    <Button className="bubble-item">
                        <Icon icon="textColor" />
                    </Button>
                }
            >
                <div className="header">Text colors</div>
                <div className="colors">
                    {colorItems.map((item) => (
                        <Popover.PopoverItem icon={<Icon className="color" icon="textColor" color={item.value} />} value={item.value} onSelect={handleText} />
                    ))}
                </div>
            </Popover>
        </div>
    );
};

export default TextColorPopover;
