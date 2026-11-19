import { useEffect, type ReactNode } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/account/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/account/Template.useInitialize";
import type { TemplateProps } from "keycloakify/account/TemplateProps";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { brand } from "../shared/brand";
import { Icon, type IconName } from "../shared/icons";
import { LocalePicker } from "../shared/LocalePicker";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { url, features, message, referrer, account } = kcContext;

    useEffect(() => {
        document.title = msgStr("accountManagementTitle");
    }, []);

    useSetClassName({ qualifiedName: "html", className: kcClsx("kcHtmlClass") });

    useSetClassName({ qualifiedName: "body", className: clsx("admin-console", "user", "gd-body", kcClsx("kcBodyClass")) });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    const navItems: { key: string; href: string; label: ReactNode; icon: IconName }[] = [
        { key: "account", href: url.accountUrl, label: msg("account"), icon: "user" },
        ...(features.passwordUpdateSupported ? [{ key: "password", href: url.passwordUrl, label: msg("password"), icon: "lock" as const }] : []),
        { key: "sessions", href: url.sessionsUrl, label: msg("sessions"), icon: "devices" }
    ];

    const displayName = [account.firstName, account.lastName].filter(Boolean).join(" ") || account.username;

    return (
        <div className="gd-app">
            <aside className="gd-nav">
                <div className="gd-nav__brand">
                    <img src={brand.logoUrl} alt="" width={100} height={100} draggable={false} />
                    <div className="gd-khmer-title">
                        {brand.systemNameLines.map(line => (
                            <span key={line}>{line}</span>
                        ))}
                    </div>
                </div>
                <nav aria-label={msgStr("accountManagementTitle")}>
                    <ul className="gd-nav__list">
                        {navItems.map(item => (
                            <li key={item.key}>
                                <a
                                    href={item.href}
                                    className={clsx("gd-nav__link", active === item.key && "gd-nav__link--active")}
                                    aria-current={active === item.key ? "page" : undefined}
                                >
                                    <Icon name={item.icon} size={22} />
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <div className="gd-app__main">
                <header className="gd-topbar">
                    <div className="gd-topbar__brand">
                        <img src={brand.logoUrl} alt="" width={36} height={36} draggable={false} />
                    </div>
                    {referrer?.url && (
                        <a href={referrer.url} id="referrer" className="gd-topbar__back">
                            <Icon name="arrowLeft" size={18} />
                            <span>{msg("backTo", referrer.name)}</span>
                        </a>
                    )}
                    <div className="gd-topbar__spacer" />
                    <LocalePicker ariaLabel="Language" currentLanguage={currentLanguage} enabledLanguages={enabledLanguages} />
                    {displayName && (
                        <span className="gd-topbar__user" title={displayName}>
                            <span className="gd-avatar" aria-hidden="true">
                                {displayName.charAt(0).toUpperCase()}
                            </span>
                            <span className="gd-topbar__user-name">{displayName}</span>
                        </span>
                    )}
                    <a href={url.getLogoutUrl()} className="gd-btn-outline" aria-label={msgStr("doSignOut")}>
                        <Icon name="logout" size={18} />
                        <span className="gd-topbar__signout-label">{msg("doSignOut")}</span>
                    </a>
                </header>

                <main className="gd-app__content">
                    <div className="gd-card">
                        {message !== undefined && (
                            <div className={clsx("gd-alert", `gd-alert--${message.type}`)} role={message.type === "error" ? "alert" : "status"}>
                                <Icon name={message.type} size={20} className="gd-alert__icon" />
                                <span
                                    className="kc-feedback-text"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(message.summary)
                                    }}
                                />
                            </div>
                        )}

                        {children}
                    </div>
                </main>

                <footer className="gd-footer">{brand.copyright}</footer>
            </div>
        </div>
    );
}
