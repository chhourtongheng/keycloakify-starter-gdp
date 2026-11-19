import { Icon } from "./icons";

export function LocalePicker(props: {
    ariaLabel: string;
    currentLanguage: { languageTag: string; label: string };
    enabledLanguages: { languageTag: string; label: string; href: string }[];
}) {
    const { ariaLabel, currentLanguage, enabledLanguages } = props;

    if (enabledLanguages.length <= 1) {
        return null;
    }

    return (
        <details className="gd-locale" id="kc-locale">
            <summary aria-label={ariaLabel}>
                <Icon name="globe" size={18} />
                <span>{currentLanguage.label}</span>
                <Icon name="chevronDown" size={16} />
            </summary>
            <ul role="menu">
                {enabledLanguages.map(({ languageTag, label, href }) => (
                    <li key={languageTag} role="none">
                        <a
                            role="menuitem"
                            href={href}
                            lang={languageTag}
                            aria-current={languageTag === currentLanguage.languageTag}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </details>
    );
}
