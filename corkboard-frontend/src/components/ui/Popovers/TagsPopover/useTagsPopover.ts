import { useEffect, useState } from "react";
import type { TagType } from "@/types/TagType.ts";
import tagsApi from "@/api/tags.ts";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";

interface useTagsPopoverProps {
    taskId: string;
}

const useTagsPopover = ({ taskId }: useTagsPopoverProps) => {
    const [showCreateTagModal, setShowCreateTagModal] = useState<boolean>(false);
    const [tags, setTags] = useState<TagType[]>([]);
    const [taskTags, setTaskTags] = useState<TagType[]>([]);
    const addTagToTask = useReleaseBoardStore((state) => state.addTagToTask);
    const removeTagFromTask = useReleaseBoardStore((state) => state.removeTagFromTask);

    const handleAddTagToTask = (tagId: string) => {
        addTagToTask(taskId, tagId, (response) => {
            setTags((prev) => prev.filter((t) => t.id !== response.id));
            taskTags.push(response);
        });
    };

    const handleRemoveTagFromTask = (tagId: string) => {
        removeTagFromTask(taskId, tagId, (response) => {
            setTaskTags((prev) => prev.filter((t) => t.id !== response.id));
            tags.push(response);
        });
    };

    useEffect(() => {
        tagsApi.getAll({ task_id: taskId }, (response) => {
            setTags(response.tags);
            setTaskTags(response.task_tags);
        });
    }, [taskId]);

    return { showCreateTagModal, setShowCreateTagModal, tags, taskTags, handleAddTagToTask, handleRemoveTagFromTask };
};

export default useTagsPopover;
