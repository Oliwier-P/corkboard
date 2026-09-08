import "./DocumentsNav.scss";
import SubNavbar from "@/layout/SubNavbar/SubNavbar.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@/ui/Icons/Icon.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import { api } from "@/api";
import type { DocumentType } from "@/types/DocumentType.ts";
import { useDocumentsStore } from "@/store/documentsStore.ts";

interface DocumentNavProps {
    documents: DocumentType[];
}

const DocumentsNav = ({ documents }: DocumentNavProps) => {
    const workspace = useWorkspaceStore((state) => state.workspace);
    const navigate = useNavigate();

    const addDocument = useDocumentsStore((state) => state.addDocument);

    const handleCreateDocument = () => {
        if (!workspace?.id) return;

        api.post("documents", { workspace_id: workspace.id }).then((response) => {
            addDocument(response.data);
        });
    };

    const handleDeleteDocument = (id: string) => {
        if (!workspace?.id) return;

        api.delete(`documents/${id}`).then(() => {
            navigate(`/workspaces/${workspace.id}/documents/`);
        });
    };

    return (
        <SubNavbar className="documents-nav">
            <SubNavbar.Header header="Documents" />

            <SubNavbar.Body className="documents-nav__body">
                {documents.length > 0 &&
                    documents.map((document) => (
                        <NavLink className="documents-nav__page" to={`/workspaces/${workspace?.id}/documents/${document.id}`}>
                            <Icon icon="document" />
                            {document.name}

                            <Button onClick={() => handleDeleteDocument(document.id)}>
                                <Icon icon="trash" />
                            </Button>
                        </NavLink>
                    ))}

                <Button className="documents-nav__create" onClick={handleCreateDocument}>
                    + Add Document
                </Button>
            </SubNavbar.Body>
        </SubNavbar>
    );
};

export default DocumentsNav;
