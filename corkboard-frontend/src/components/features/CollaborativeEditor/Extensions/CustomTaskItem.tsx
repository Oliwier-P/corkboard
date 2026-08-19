import TaskItem from "@tiptap/extension-task-item";

const CustomTaskItem = TaskItem.extend({
    addNodeView() {
        return ({ node, getPos, editor }) => {
            const listItem = document.createElement("li");
            const checkboxWrapper = document.createElement("label");
            const checkbox = document.createElement("input");
            const content = document.createElement("div");

            checkbox.type = "checkbox";
            checkbox.checked = node.attrs.checked;

            checkboxWrapper.contentEditable = "false";
            checkboxWrapper.appendChild(checkbox);

            listItem.dataset.checked = node.attrs.checked;
            listItem.append(checkboxWrapper, content);

            checkbox.addEventListener("change", (event) => {
                if (!editor.isEditable) {
                    checkbox.checked = !checkbox.checked;
                    return;
                }

                const checked = (event.target as HTMLInputElement).checked;
                const pos = getPos();

                if (typeof pos !== "number") return;

                const { tr } = editor.state;

                tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    checked,
                });

                node.descendants((child, relativePos) => {
                    if (child.type.name === "taskItem") {
                        tr.setNodeMarkup(pos + relativePos + 1, undefined, {
                            ...child.attrs,
                            checked,
                        });
                    }
                });

                editor.view.dispatch(tr);
            });

            return {
                dom: listItem,
                contentDOM: content,
                update: (updatedNode) => {
                    if (updatedNode.type.name !== "taskItem") return false;
                    listItem.dataset.checked = updatedNode.attrs.checked;
                    checkbox.checked = updatedNode.attrs.checked;
                    return true;
                },
            };
        };
    },
});

export default CustomTaskItem;
