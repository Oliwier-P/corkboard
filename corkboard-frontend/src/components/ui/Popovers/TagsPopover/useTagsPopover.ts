import { useEffect, useState } from "react";
import type { TagType } from "@/types/TagType.ts";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";
import tagsApi from "@/api/tags.ts";

interface useTagsPopoverProps {
    taskId: string;
}

const useTagsPopover = ({ taskId }: useTagsPopoverProps) => {
    const [showCreateTagModal, setShowCreateTagModal] = useState<boolean>(false);
    const [tags, setTags] = useState<TagType[]>([]);
    const [taskTags, setTaskTags] = useState<TagType[]>([]);
    const updateTask = useReleaseBoardStore((state) => state.updateTask);

    const handleAddTagToTask = (tagId: string) => {
        tagsApi.assign(taskId, tagId, (response) => {
            setTags((prev) => prev.filter((t) => t.id !== response.id));
            taskTags.push(response);
            updateTask(taskId, { tags: taskTags });
        });
    };

    const handleRemoveTagFromTask = (tagId: string) => {
        tagsApi.unassign(taskId, tagId, (response) => {
            setTaskTags((prev) => prev.filter((t) => t.id !== response.id));
            tags.push(response);
            updateTask(taskId, { tags: taskTags });
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
