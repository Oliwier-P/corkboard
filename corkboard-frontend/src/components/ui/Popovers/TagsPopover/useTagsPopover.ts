import { useEffect, useState } from "react";
import { api } from "@/api";
import type { TagType } from "@/types/TagType.ts";
import { useReleaseBoardStore } from "@/store/releaseBoardStore.ts";

interface useTagsPopoverProps {
    taskId: string;
}

const useTagsPopover = ({ taskId }: useTagsPopoverProps) => {
    const [showCreateTagModal, setShowCreateTagModal] = useState<boolean>(false);
    const [tags, setTags] = useState<TagType[]>([]);
    const [taskTags, setTaskTags] = useState<TagType[]>([]);
    const updateTask = useReleaseBoardStore((state) => state.updateTask);

    const handleAddTagToTask = (tagId: string) => {
        api.post(`/tasks/${taskId}/tags/${tagId}/assign`).then((response) => {
            setTags((prev) => prev.filter((t) => t.id !== response.data.id));
            taskTags.push(response.data);
            updateTask(taskId, { tags: taskTags });
        });
    };

    const handleRemoveTagFromTask = (tagId: string) => {
        api.delete(`/tasks/${taskId}/tags/${tagId}/unassign`).then((response) => {
            setTaskTags((prev) => prev.filter((t) => t.id !== response.data.id));
            tags.push(response.data);
            updateTask(taskId, { tags: taskTags });
        });
    };

    useEffect(() => {
        api.get("/tags", { params: { task_id: taskId } }).then((response) => {
            setTags(response.data.tags);
            setTaskTags(response.data.task_tags);
        });
    }, [taskId]);

    return { showCreateTagModal, setShowCreateTagModal, tags, taskTags, handleAddTagToTask, handleRemoveTagFromTask };
};

export default useTagsPopover;
