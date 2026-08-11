import type { User } from "../../../context/auth/types.ts";
import { useCollaborativeEditor } from "../../../hooks/useCollaborativeEditor.ts";
import { EditorContent } from "@tiptap/react";
import "./CollaborativeEditor.scss";
import { BubbleMenu } from "@tiptap/react/menus";
import { Button } from "../../ui/Button/Button.tsx";
import { Icon } from "../../ui/Icons/Icon.tsx";
import { CollaborativeEditorProvider } from "./CollaborativeEditorProvider.tsx";
import { useEffect } from "react";

type CollaborativeEditorProps = {
    documentId: string;
    user: User;
    authToken: string;
    onReadyChange?: (ready: boolean) => void;
};
export const CollaborativeEditor = ({ documentId, user, authToken, onReadyChange }: CollaborativeEditorProps) => {
    return (
        <CollaborativeEditorProvider documentId={documentId} authToken={authToken}>
            <Editor documentId={documentId} user={user} authToken={authToken} onReadyChange={onReadyChange} />
        </CollaborativeEditorProvider>
    );
};

const Editor = ({ documentId, user, authToken, onReadyChange }: CollaborativeEditorProps) => {
    const { editor, isLoading } = useCollaborativeEditor({ documentId, user, authToken });

    useEffect(() => {
        onReadyChange?.(!isLoading && !!editor);
    }, [isLoading, editor, onReadyChange]);

    if (!editor || isLoading) return null;

    return (
        <>
            <EditorContent editor={editor} />
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
        </>
    );
};
