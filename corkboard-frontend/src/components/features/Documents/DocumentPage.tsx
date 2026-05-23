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
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import * as _ from "lodash";
import { Icon } from "../../ui/Icons/Icon.tsx";

interface DocumentPageProps {
    document: DocumentType;
    setDocuments: Dispatch<SetStateAction<DocumentType[]>>;
}

const DocumentPage = ({ document, setDocuments }: DocumentPageProps) => {
    const [doc, setDoc] = useState<DocumentType>(document);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Write something",
            }),
        ],
        content: doc.content,
        onUpdate: _.debounce(() => handleUpdateDocumentContent(), 800),
    });

    const handleUpdateDocumentContent = () => {
        api.patch(`documents/${doc.id}`, { content: editor.getJSON() }).then(() => {
            setDoc((prev) => ({ ...prev, updated_at: new Date().toISOString() }));
        });
    };

    const handleUpdateDocumentName = (value: string) => {
        if (doc.name !== value) {
            api.patch(`documents/${doc.id}`, { name: value }).then(() => {
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
            <Input className="document-page__title" defaultValue={doc.name} onBlur={(e) => handleUpdateDocumentName(e.target.value)} />

            <div className="document-page__owner">
                <UserAvatar username={doc.owner.username} />
                <span>{doc.owner.username}</span>
                <div className="dot"></div>
                <span>
                    {new Date(doc.updated_at).toLocaleString("pl-PL", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </span>
            </div>

            <EditorContent editor={editor} spellCheck={false} />

            <BubbleMenu editor={editor}>
                <div className="document-page__menu">
                    <Button className="item" onClick={() => editor.chain().focus().toggleBold().run()}>
                        <Icon icon="bold" />
                    </Button>
                    <Button className="item" onClick={() => editor.chain().focus().toggleItalic().run()}>
                        <Icon icon="italic" />
                    </Button>
                    <Button className="item" onClick={() => editor.chain().focus().toggleUnderline().run()}>
                        <Icon icon="underline" />
                    </Button>
                    <Button className="item" onClick={() => editor.chain().focus().toggleStrike().run()}>
                        <Icon icon="strike" />
                    </Button>
                    <Button className="item" onClick={() => editor.chain().focus().toggleCode().run()}>
                        <Icon icon="code" />
                    </Button>
                </div>
            </BubbleMenu>
        </div>
    );
};

export default DocumentPage;
