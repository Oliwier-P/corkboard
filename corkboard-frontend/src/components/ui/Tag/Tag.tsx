import "./Tag.scss";
import type { TagType } from "@/types/TagType.ts";
import { reverseColor } from "@/global/utils.ts";

interface TagProps {
    tag: TagType;
}

const Tag = ({ tag }: TagProps) => {
    return (
        <div className="tag" style={{ backgroundColor: tag.color, color: reverseColor(tag.color) }}>
            {tag.name}
        </div>
    );
};

export default Tag;
