import "./TagsPopover.scss";
import Popover from "../../Popover/Popover.tsx";
import { useEffect, useState } from "react";
import CreateTagModal from "./CreateTagModal.tsx";
import { api } from "../../../../api/api.ts";
import { Icon } from "../../Icons/Icon.tsx";

interface TagsPopoverProps {
    taskId: string;
}

type TagType = {
    id: string;
    name: string;
    color: string;
};

const TagsPopover = ({ taskId }: TagsPopoverProps) => {
    const [showCreateTagModal, setShowCreateTagModal] = useState<boolean>(false);
    const [tags, setTags] = useState<TagType[]>([]);
    const [taskTags, setTaskTags] = useState<TagType[]>([]);

    const handleAddTagToTask = (tagId: string) => {
        api.post(`/tasks/${taskId}/tags/${tagId}/assign`).then((response) => {
            setTags((prev) => prev.filter((t) => t.id !== response.data.id));
            taskTags.push(response.data);
        });
    };

    const handleRemoveTagFromTask = (tagId: string) => {
        api.delete(`/tasks/${taskId}/tags/${tagId}/unassign`).then((response) => {
            setTaskTags((prev) => prev.filter((t) => t.id !== response.data.id));
            tags.push(response.data);
        });
    };

    const getContrastTextColor = (hexColor: string): string => {
        const hex = hexColor.replace("#", "");

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? "#000000" : "#ffffff";
    };

    useEffect(() => {
        api.get("/tags", { params: { task_id: taskId } }).then((response) => {
            console.log(response.data);
            setTags(response.data.tags);
            setTaskTags(response.data.task_tags);
        });
    }, []);

    return (
        <div className="tags-popover">
            <Popover
                trigger={
                    <div>
                        {taskTags.length > 0 ? (
                            <div className="task-tags">
                                {taskTags.map((taskTag) => (
                                    <div className="tag" style={{ backgroundColor: taskTag.color, color: getContrastTextColor(taskTag.color) }}>
                                        <span className="label">{taskTag.name}</span>
                                        <div
                                            className="icon-container"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveTagFromTask(taskTag.id);
                                            }}
                                        >
                                            <Icon icon="close" color={getContrastTextColor(taskTag.color)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <span>Empty</span>
                        )}
                    </div>
                }
            >
                <div className="list">
                    {tags.length > 0 ? (
                        <>
                            {tags.map((tag) => (
                                <Popover.PopoverItem
                                    className="tag"
                                    style={{ backgroundColor: tag.color, color: getContrastTextColor(tag.color) }}
                                    label={tag.name}
                                    value={tag.id}
                                    selected={false}
                                    closeOnSelect={false}
                                    onSelect={handleAddTagToTask}
                                />
                            ))}
                        </>
                    ) : (
                        <span className="empty">No more tags</span>
                    )}
                </div>
                <Popover.PopoverItem className="add" label="+ Add new" value={true} selected={false} onSelect={setShowCreateTagModal} />
            </Popover>

            {showCreateTagModal && <CreateTagModal onSave={() => {}} onClose={() => setShowCreateTagModal(false)} />}
        </div>
    );
};

export default TagsPopover;
