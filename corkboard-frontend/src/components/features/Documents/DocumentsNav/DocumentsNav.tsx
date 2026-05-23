import "./DocumentsNav.scss";
import SubNavbar from "../../../layout/SubNavbar/SubNavbar.tsx";
import { NavLink } from "react-router-dom";
import { Icon } from "../../../ui/Icons/Icon.tsx";
import { Button } from "../../../ui/Button/Button.tsx";
import { useWorkspaceStore } from "../../../../store/workspaceStore.ts";
import { api } from "../../../../api/api.ts";
import type { DocumentType } from "../../../../types/DocumentType.ts";
import type { Dispatch, SetStateAction } from "react";

interface DocumentNavProps {
    documents: DocumentType[];
    setDocuments: Dispatch<SetStateAction<DocumentType[]>>;
}

const DocumentsNav = ({ documents, setDocuments }: DocumentNavProps) => {
    const workspace = useWorkspaceStore((state) => state.workspace);
    const handleCreateDocument = () => {
        if (!workspace?.id) return;

        api.post("documents", { workspace_id: workspace.id }).then((response) => {
            setDocuments((prev) => [...prev, response.data]);
        });
    };

    return (
        <SubNavbar className="documents-nav">
            <SubNavbar.Header header="Documents" />

            <SubNavbar.Body className="documents-nav__body">
                {documents.length &&
                    documents.map((document) => (
                        <NavLink className="documents-nav__page" to={`/workspaces/${workspace?.id}/document/${document.id}`}>
                            <Icon icon="document" />
                            {document.name}
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
