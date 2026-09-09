import "./SettingsSection.scss";
import type { ReactNode } from "react";
import classNames from "classnames";

interface SettingsSectionProps {
    className?: string;
    children: ReactNode;
}

const SettingsSection = ({ className, children }: SettingsSectionProps) => {
    return <div className={classNames("settings-section", className)}>{children}</div>;
};

interface SettingsSectionInfoProps {
    title?: string;
    description: string;
}

SettingsSection.Info = ({ title, description }: SettingsSectionInfoProps) => {
    return (
        <div className="info">
            {title && <div className="title">{title}</div>}
            <div className="description">{description}</div>
        </div>
    );
};

interface SettingsSectionContentProps {
    className?: string;
    children: ReactNode;
}

SettingsSection.Content = ({ className, children }: SettingsSectionContentProps) => {
    return <div className={classNames("content", className)}>{children}</div>;
};

export default SettingsSection;
