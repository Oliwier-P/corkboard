import "./AlignPopover.scss";
import Popover from "@/ui/Popover/Popover.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { Icon, type IconNames } from "@/ui/Icons/Icon.tsx";
import type { Editor } from "@tiptap/react";

interface AlignPopoverProps {
    editor: Editor;
}

const AlignPopover = ({ editor }: AlignPopoverProps) => {
    const items = [
        { label: "Align left", value: "left", icon: "alignLeft" },
        { label: "Align center", value: "center", icon: "alignCenter" },
        { label: "Align right", value: "right", icon: "alignRight" },
    ];

    const handleAlign = (value: string) => {
        editor.chain().focus().setTextAlign(value).run();
    };

    return (
        <div className="align-popover">
            <Popover
                tooltip="Alignment"
                trigger={
                    <Button className="bubble-item">
                        <Icon icon="alignLeft" />
                    </Button>
                }
            >
                {items.map((item) => (
                    <Popover.PopoverItem icon={<Icon icon={item.icon as IconNames} />} label={item.label} value={item.value} onSelect={handleAlign} />
                ))}
            </Popover>
        </div>
    );
};

export default AlignPopover;
