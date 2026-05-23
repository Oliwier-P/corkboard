import "./DocumentPage.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenu } from "@tiptap/react/menus";
import { UserAvatar } from "../../ui/UserAvatar/UserAvatar.tsx";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "../../ui/Button/Button.tsx";
import type { DocumentType } from "../../../types/DocumentType.ts";
import { Input } from "../../ui/Input/Input.tsx";
import { api } from "../../../api/api.ts";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import * as _ from "lodash";

interface DocumentPageProps {
    document: DocumentType;
    setDocuments: Dispatch<SetStateAction<DocumentType[]>>;
}

const DocumentPage = ({ document, setDocuments }: DocumentPageProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Write something",
            }),
        ],
        content: document.content,
        onUpdate: _.debounce(() => handleUpdateDocumentContent(), 800),
    });

    const handleUpdateDocumentContent = () => {
        api.patch(`documents/${document.id}`, { content: editor.getJSON() });
    };

    const handleUpdateDocumentName = (value: string) => {
        if (document.name !== value) {
            api.patch(`documents/${document.id}`, { name: value }).then(() => {
                setDocuments((prev) => prev.map((d) => (d.id === document.id ? { ...d, name: value } : d)));
            });
        }
    };

    useEffect(() => {
        return () => {
            handleUpdateDocumentContent();
        };
    }, []);

    return (
        <div className="document-page">
            <Input className="document-page__title" defaultValue={document.name} onBlur={(e) => handleUpdateDocumentName(e.target.value)} />

            <div className="document-page__owner">
                <UserAvatar username={document.owner.username} />
                <span>{document.owner.username}</span>
                <span>-</span>
                <span>
                    {new Date(document.updated_at).toLocaleString("pl-PL", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </span>
            </div>

            <EditorContent editor={editor} />

            <BubbleMenu editor={editor}>
                <div className="document-page__menu">
                    <Button className="item" onClick={() => editor.chain().focus().toggleBold().run()}>
                        B
                    </Button>
                    <Button className="item" onClick={() => editor.chain().focus().toggleItalic().run()}>
                        I
                    </Button>
                    <Button className="item" onClick={() => editor.chain().focus().toggleUnderline().run()}>
                        U
                    </Button>
                    <Button className="item" onClick={() => editor.chain().focus().toggleStrike().run()}>
                        S
                    </Button>
                </div>
            </BubbleMenu>
        </div>
    );
};

export default DocumentPage;
