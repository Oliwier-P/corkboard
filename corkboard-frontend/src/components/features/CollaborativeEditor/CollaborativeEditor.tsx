import type { UserSettings } from "@/context/auth/types.ts";
import { useCollaborativeEditor } from "@/hooks/useCollaborativeEditor.ts";
import { EditorContent } from "@tiptap/react";
import "./CollaborativeEditor.scss";
import { BubbleMenu } from "@tiptap/react/menus";
import { Button } from "@/ui/Button/Button.tsx";
import { Icon, type IconNames } from "@/ui/Icons/Icon.tsx";
import { CollaborativeEditorProvider } from "./CollaborativeEditorProvider.tsx";
import { useEffect } from "react";
import AlignPopover from "@/ui/Popovers/DocumentPopovers/AlignPopover/AlignPopover.tsx";
import TextPopover from "@/ui/Popovers/DocumentPopovers/TextPopover/TextPopover.tsx";
import ListPopover from "@/ui/Popovers/DocumentPopovers/ListPopover/ListPopover.tsx";
import TextColorPopover from "@/ui/Popovers/DocumentPopovers/TextColorPopover/TextColorPopover.tsx";
import Tooltip from "@/ui/Tooltip/Tooltip.tsx";

type CollaborativeEditorProps = {
    documentId: string;
    user: UserSettings;
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

    const options = [
        { component: <ListPopover editor={editor} /> },
        { component: <TextPopover editor={editor} /> },
        { component: <TextColorPopover editor={editor} /> },
        { icon: "bold", onClick: () => editor.chain().focus().toggleBold().run(), tooltip: "Bold" },
        { icon: "italic", onClick: () => editor.chain().focus().toggleItalic().run(), tooltip: "Italic" },
        { icon: "underline", onClick: () => editor.chain().focus().toggleUnderline().run(), tooltip: "Underline" },
        { icon: "strike", onClick: () => editor.chain().focus().toggleStrike().run(), tooltip: "Strike" },
        { icon: "code", onClick: () => editor.chain().focus().toggleCode().run(), tooltip: "Code" },
        { component: <AlignPopover editor={editor} /> },
    ];

    return (
        <div className="collaborative-editor">
            <EditorContent editor={editor} />
            <BubbleMenu
                editor={editor}
                shouldShow={({ editor, state }) => {
                    if (editor.isActive("image")) return false;
                    return !state.selection.empty;
                }}
            >
                <div className="bubble-menu">
                    {options.map((option) => (
                        <>
                            {option.icon ? (
                                <Tooltip text={option.tooltip}>
                                    <Button className="bubble-item" onClick={option.onClick}>
                                        <Icon icon={option.icon as IconNames} />
                                    </Button>
                                </Tooltip>
                            ) : (
                                option.component
                            )}
                        </>
                    ))}
                </div>
            </BubbleMenu>
        </div>
    );
};
