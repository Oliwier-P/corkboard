import "./TextPopover.scss";
import Popover from "@/ui/Popover/Popover.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { Icon, type IconNames } from "@/ui/Icons/Icon.tsx";
import type { Level } from "@tiptap/extension-heading";
import type { Editor } from "@tiptap/react";

interface TextPopoverProps {
    editor: Editor;
}

const TextPopover = ({ editor }: TextPopoverProps) => {
    const items = [
        { label: "Text", value: "text", icon: "text" },
        { label: "Heading 1", value: 1, icon: "headingOne" },
        { label: "Heading 2", value: 2, icon: "headingTwo" },
        { label: "Heading 3", value: 3, icon: "headingThree" },
        { label: "Heading 4", value: 4, icon: "headingFour" },
    ];

    const handleText = (value: "text" | Level) => {
        if (value === "text") {
            editor.chain().focus().setParagraph().run();
        } else {
            editor.chain().focus().toggleHeading({ level: value }).run();
        }
    };

    return (
        <div className="text-popover">
            <Popover
                trigger={
                    <Button className="bubble-item">
                        <Icon icon="text" />
                    </Button>
                }
            >
                {items.map((item) => (
                    <Popover.PopoverItem
                        icon={<Icon icon={item.icon as IconNames} />}
                        label={item.label}
                        value={item.value as "text" | Level}
                        onSelect={handleText}
                    />
                ))}
            </Popover>
        </div>
    );
};

export default TextPopover;
