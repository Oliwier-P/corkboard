import "./DocumentPage.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenu } from "@tiptap/react/menus";
import { UserAvatar } from "../../ui/UserAvatar/UserAvatar.tsx";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "../../ui/Button/Button.tsx";
import type { DocumentType } from "../../../types/DocumentType.ts";

interface DocumentPageProps {
    document: DocumentType;
}

const DocumentPage = ({ document }: DocumentPageProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Write something",
            }),
        ],
        content: "",
    });

    return (
        <div className="document-page">
            <div className="document-page__title">{document.name}</div>

            <div className="document-page__owner">
                <UserAvatar username={"Worekit"} />
                <span>Worekit</span>
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
