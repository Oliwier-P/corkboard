import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskList from "@tiptap/extension-task-list";
import CustomTaskItem from "@/features/CollaborativeEditor/Extensions/CustomTaskItem.tsx";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import type { User } from "@/context/auth/types.ts";
import { useHocuspocusProvider } from "@hocuspocus/provider-react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type useCollaborativeEditorProps = {
    documentId: string;
    authToken: string;
    user: User;
};

export const useCollaborativeEditor = ({ user }: useCollaborativeEditorProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const provider = useHocuspocusProvider();

    useEffect(() => {
        const handleSynced = () => {
            if (isLoading) {
                flushSync(() => setIsLoading(false));
            }
        };

        provider.on("synced", handleSynced);

        return () => {
            provider.off("synced", handleSynced);
        };
    }, [isLoading, provider]);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                undoRedo: false,
            }),
            TextStyle,
            Color,
            BulletList,
            OrderedList,
            TaskList,
            CustomTaskItem.configure({ nested: true }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder: "Write something",
                showOnlyCurrent: false,
            }),
            Collaboration.configure({
                document: provider.document,
            }),
            CollaborationCaret.configure({
                provider: provider,
                user: {
                    name: user.username,
                    color: "#9D00FF",
                },
            }),
        ],
        editorProps: {
            attributes: {
                spellcheck: "false",
            },
        },
    });

    return { editor, isLoading };
};
