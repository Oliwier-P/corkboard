import "./TagsManager.scss";
import { Table } from "../../../ui/Table/Table.tsx";
import { useEffect, useState } from "react";
import type { TagType } from "../../../../types/TagType.ts";
import { api } from "../../../../api/api.ts";
import { useWorkspaceStore } from "../../../../store/workspaceStore.ts";
import { Button } from "../../../ui/Button/Button.tsx";
import { reverseColor } from "../../../../global/utils.ts";
import ConfirmationModal from "../../../ui/Modals/ConfirmationModal.tsx";
import CreateTagModal from "../../../ui/Popovers/TagsPopover/CreateTagModal.tsx";
import Loading from "../../../ui/Loading/Loading.tsx";

const TagsManager = () => {
    const [tags, setTags] = useState<TagType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [tagToDelete, setTagToDelete] = useState<TagType | null>(null);
    const [tagToEdit, setTagToEdit] = useState<TagType | null>(null);
    const workspaceId = useWorkspaceStore((state) => state.workspace?.id);

    const handleDeleteTag = () => {
        if (!tagToDelete) return;

        api.delete(`/tags/${tagToDelete.id}`).then((response) => {
            setTags((prev) => prev.filter((t) => t.id !== response.data.id));
            setTagToDelete(null);
        });
    };

    useEffect(() => {
        api.get(`/tags`, { params: { workspace_id: workspaceId } }).then((response) => {
            setTags(response.data.tags);
            setLoading(false);
        });
    }, [workspaceId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="tags-manager">
            <span className="title">Tags manager</span>

            <Table
                data={tags}
                columns={[
                    {
                        key: "name",
                        header: "Name",
                        render: (_, row) => (
                            <div style={{ backgroundColor: row.color, color: reverseColor(row.color) }} className="name">
                                {row.name}
                            </div>
                        ),
                    },
                    {
                        key: "id",
                        header: "Options",
                        render: (_, row) => (
                            <>
                                <Button icon="edit" variant="icon" size="small" color="outlined" onClick={() => setTagToEdit(row)} />
                                <Button icon="trash" variant="icon" size="small" color="outlined" onClick={() => setTagToDelete(row)} />
                            </>
                        ),
                    },
                ]}
            >
                <Button variant="icon" className="workspace-users__invite-btn" onClick={() => setTagToEdit({} as TagType)}>
                    <div>+</div>
                    <div>Add new</div>
                </Button>
            </Table>

            {tagToDelete && (
                <ConfirmationModal
                    title="Delete tag:"
                    subtitle={tagToDelete.name}
                    message="Are you sure you want to delete this tag?"
                    onDelete={handleDeleteTag}
                    onClose={() => setTagToDelete(null)}
                />
            )}

            {tagToEdit && (
                <CreateTagModal
                    tag={tagToEdit}
                    onSave={(data) => {
                        if (tagToEdit?.id) {
                            setTags((prev) => prev.map((tag) => (tag.id === tagToEdit.id ? data : tag)));
                        } else {
                            tags.push(data);
                        }

                        setTagToEdit(null);
                    }}
                    onClose={() => setTagToEdit(null)}
                />
            )}
        </div>
    );
};

export default TagsManager;
