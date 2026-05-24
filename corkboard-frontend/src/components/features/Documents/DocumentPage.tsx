import "./DocumentPage.scss";
import {UserAvatar} from "../../ui/UserAvatar/UserAvatar.tsx";
import type {DocumentType} from "../../../types/DocumentType.ts";
import {Input} from "../../ui/Input/Input.tsx";
import {api} from "../../../api/api.ts";
import {type Dispatch, type SetStateAction} from "react";
import {CollaborativeEditor} from "../CollaborativeEditor/CollaborativeEditor.tsx";
import {useAuth} from "../../../context/auth/useAuth.ts";

interface DocumentPageProps {
    document: DocumentType;
    setDocuments: Dispatch<SetStateAction<DocumentType[]>>;
}

const DocumentPage = ({document, setDocuments}: DocumentPageProps) => {
    const {user, token} = useAuth()

    const handleUpdateDocumentName = (value: string) => {
        if (document.name !== value) {
            api.patch(`documents/${document.id}`, {name: value}).then(() => {
                setDocuments((prev) => prev.map((d) => (d.id === document.id ? {...d, name: value} : d)));
            });
        }
    };

    return (
        <div className="document-page">
            <Input className="document-page__title" defaultValue={document.name}
                   onBlur={(e) => handleUpdateDocumentName(e.target.value)}/>

            <div className="document-page__owner">
                <UserAvatar username={document.owner.username}/>
                <span>{document.owner.username}</span>
                <div className="dot"></div>
                <span>
                    Last Updated {new Date(document.updated_at).toLocaleString("pl-PL", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
                </span>
            </div>

            {user && token && <CollaborativeEditor documentId={document.id} user={user} authToken={token}/>}

        </div>
    );
};

export default DocumentPage;
