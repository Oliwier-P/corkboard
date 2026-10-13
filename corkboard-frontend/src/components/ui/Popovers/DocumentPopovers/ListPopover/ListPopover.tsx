import "./ListPopover.scss";
import Popover from "@/ui/Popover/Popover.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { Icon, type IconNames } from "@/ui/Icons/Icon.tsx";
import type { Editor } from "@tiptap/react";

interface ListPopoverProps {
    editor: Editor;
}

const ListPopover = ({ editor }: ListPopoverProps) => {
    const items = [
        { label: "Bulleted", value: "bulletList", icon: "bulletedList" },
        { label: "Numbered", value: "orderedList", icon: "numberedList" },
        { label: "Checklist", value: "taskList", icon: "checklist" },
    ];

    const handleList = (value: string) => {
        const chain = editor.chain().focus();

        switch (value) {
            case "bulletList":
                chain.toggleBulletList().run();
                break;
            case "orderedList":
                chain.toggleOrderedList().run();
                break;
            case "taskList":
                chain.toggleTaskList().run();
                break;
        }
    };

    return (
        <div className="list-popover">
            <Popover
                trigger={
                    <Button className="bubble-item">
                        <Icon icon="bulletedList" />
                    </Button>
                }
            >
                {items.map((item) => (
                    <Popover.PopoverItem icon={<Icon icon={item.icon as IconNames} />} label={item.label} value={item.value} onSelect={handleList} />
                ))}
            </Popover>
        </div>
    );
};

export default ListPopover;
