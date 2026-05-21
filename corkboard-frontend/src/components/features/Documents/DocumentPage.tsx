import "./DocumentPage.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenu } from "@tiptap/react/menus";
import { UserAvatar } from "../../ui/UserAvatar/UserAvatar.tsx";
import Placeholder from "@tiptap/extension-placeholder";

interface DocumentPageProps {
    id: string;
}

const DocumentPage = ({ id }: DocumentPageProps) => {
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
            <div className="document-page__title">Untilted - {id}</div>

            <div className="document-page__owner">
                <UserAvatar username={"Worekit"} />
                <span>Worekit</span>
            </div>

            <EditorContent editor={editor} />

            <BubbleMenu editor={editor}>
                <div className="document-page__menu">
                    <div>List type</div>
                    <div>Font Color</div>
                    <div>Bold</div>
                    <div>Italic</div>
                    <div>Underline</div>
                    <div>Strikethrough</div>
                    <div>Code</div>
                    <div>Alignment</div>
                </div>
            </BubbleMenu>
        </div>
    );
};

export default DocumentPage;
