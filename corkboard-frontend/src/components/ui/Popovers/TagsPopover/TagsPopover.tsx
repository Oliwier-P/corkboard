import "./TagsPopover.scss";
import Popover from "@/ui/Popover/Popover.tsx";
import CreateTagModal from "./CreateTagModal.tsx";
import { Icon } from "@/ui/Icons/Icon.tsx";
import { reverseColor } from "@/global/utils.ts";
import useTagsPopover from "./useTagsPopover.ts";

interface TagsPopoverProps {
    taskId: string;
}

const MAX_VISIBLE_TAGS = 3;

const TagsPopover = ({ taskId }: TagsPopoverProps) => {
    const { showCreateTagModal, setShowCreateTagModal, tags, taskTags, handleAddTagToTask, handleRemoveTagFromTask } = useTagsPopover({ taskId });

    return (
        <div className="tags-popover">
            <Popover
                trigger={
                    <div>
                        {taskTags.length > 0 ? (
                            <div className="task-tags">
                                {taskTags.slice(0, MAX_VISIBLE_TAGS).map((taskTag) => (
                                    <div className="tag" style={{ backgroundColor: taskTag.color, color: reverseColor(taskTag.color) }}>
                                        <span className="label">{taskTag.name}</span>
                                        <div
                                            className="icon-container"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveTagFromTask(taskTag.id);
                                            }}
                                        >
                                            <Icon icon="close" color={reverseColor(taskTag.color)} />
                                        </div>
                                    </div>
                                ))}
                                {taskTags.length > MAX_VISIBLE_TAGS && (
                                    <div className="tag tag--more">
                                        <span className="label">+{taskTags.length - MAX_VISIBLE_TAGS}</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <span>Empty</span>
                        )}
                    </div>
                }
            >
                <div className="section">
                    <span className="header">Task tags</span>
                    <div className="list">
                        {taskTags.length > 0 ? (
                            <>
                                {taskTags.map((taskTag) => (
                                    <div className="tag" style={{ backgroundColor: taskTag.color, color: reverseColor(taskTag.color) }}>
                                        <span className="label">{taskTag.name}</span>
                                        <div
                                            className="icon-container"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveTagFromTask(taskTag.id);
                                            }}
                                        >
                                            <Icon icon="close" color={reverseColor(taskTag.color)} />
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <span className="empty">No more tags</span>
                        )}
                    </div>
                </div>

                <span className="header">Tags</span>
                <div className="list">
                    {tags.length > 0 ? (
                        <>
                            {tags.map((tag) => (
                                <Popover.PopoverItem
                                    className="tag"
                                    style={{ backgroundColor: tag.color, color: reverseColor(tag.color) }}
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

            {showCreateTagModal && (
                <CreateTagModal
                    onSave={(data) => {
                        tags.push(data);
                        setShowCreateTagModal(false);
                    }}
                    onClose={() => setShowCreateTagModal(false)}
                />
            )}
        </div>
    );
};

export default TagsPopover;
