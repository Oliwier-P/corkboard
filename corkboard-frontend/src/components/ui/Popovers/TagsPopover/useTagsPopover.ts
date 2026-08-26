import { useEffect, useState } from "react";
import { api } from "../../../../api/api.ts";

interface useTagsPopoverProps {
    taskId: string;
}

type TagType = {
    id: string;
    name: string;
    color: string;
};

const useTagsPopover = ({ taskId }: useTagsPopoverProps) => {
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

    useEffect(() => {
        api.get("/tags", { params: { task_id: taskId } }).then((response) => {
            console.log(response.data);
            setTags(response.data.tags);
            setTaskTags(response.data.task_tags);
        });
    }, [taskId]);

    return { showCreateTagModal, setShowCreateTagModal, tags, taskTags, handleAddTagToTask, handleRemoveTagFromTask };
};

export default useTagsPopover;
