import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { brand } from "../shared/brand";
import { Icon } from "../shared/icons";
import { LocalePicker } from "../shared/LocalePicker";
import { useParticles } from "../shared/useParticles";

const PARTICLES_ID = "gd-particles";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({ qualifiedName: "html", className: clsx("gd-html", kcClsx("kcHtmlClass")) });

    useSetClassName({ qualifiedName: "body", className: clsx("gd-body", bodyClassName ?? kcClsx("kcBodyClass")) });

    useParticles({ containerId: PARTICLES_ID, color: "#ffffff" });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    const showUsernameInsteadOfTitle = auth !== undefined && auth.showUsername && !auth.showResetCredentials;

    return (
        <div className={clsx("gd-auth", kcClsx("kcLoginClass"))}>
            <aside className="gd-auth__brand">
                <div id={PARTICLES_ID} className="gd-auth__particles" aria-hidden="true" />
                <div className="gd-auth__brand-inner">
                    <div className="gd-auth__logo-ring">
                        <img src={brand.logoUrl} alt="" width={168} height={168} draggable={false} />
                    </div>
                    <div className="gd-khmer-title gd-auth__brand-title">
                        {brand.systemNameLines.map(line => (
                            <span key={line}>{line}</span>
                        ))}
                    </div>
                </div>
            </aside>

            <main className="gd-auth__panel">
                <div className="gd-auth__toolbar">
                    <LocalePicker ariaLabel={msgStr("languages")} currentLanguage={currentLanguage} enabledLanguages={enabledLanguages} />
                </div>

                <div className={clsx("gd-auth__card", kcClsx("kcFormCardClass"))}>
                    <div className="gd-auth__compact-brand">
                        <img src={brand.logoUrl} alt="" width={72} height={72} draggable={false} />
                        <div className="gd-khmer-title">
                            {brand.systemNameLines.map(line => (
                                <span key={line}>{line}</span>
                            ))}
                        </div>
                    </div>

                    <header className="gd-auth__header">
                        {showUsernameInsteadOfTitle ? (
                            <div id="kc-username" className="gd-auth__username">
                                <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                <a
                                    id="reset-login"
                                    href={url.loginRestartFlowUrl}
                                    aria-label={msgStr("restartLoginTooltip")}
                                    title={msgStr("restartLoginTooltip")}
                                >
                                    <Icon name="restart" size={18} />
                                </a>
                            </div>
                        ) : (
                            <h1 id="kc-page-title" className="gd-auth__title">
                                {headerNode}
                            </h1>
                        )}
                        {realm.displayName && !showUsernameInsteadOfTitle && <p className="gd-auth__subtitle">{realm.displayName}</p>}
                        {displayRequiredFields && (
                            <p className="gd-auth__required">
                                <span className="required">*</span> {msg("requiredFields")}
                            </p>
                        )}
                    </header>

                    <div id="kc-content">
                        <div id="kc-content-wrapper">
                            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <div className={clsx("gd-alert", `gd-alert--${message.type}`)} role={message.type === "error" ? "alert" : "status"}>
                                    <Icon name={message.type} size={20} className="gd-alert__icon" />
                                    <span
                                        className="gd-alert__text"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(message.summary)
                                        }}
                                    />
                                </div>
                            )}
                            {children}
                            {auth !== undefined && auth.showTryAnotherWayLink && (
                                <form id="kc-select-try-another-way-form" action={url.loginAction} method="post" className="gd-try-another">
                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                    <button type="submit" className="gd-link-button" id="try-another-way">
                                        {msg("doTryAnotherWay")}
                                    </button>
                                </form>
                            )}
                            {socialProvidersNode}
                            {displayInfo && (
                                <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                                    <div id="kc-info-wrapper">{infoNode}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="gd-footer gd-auth__footer">{brand.copyright}</footer>
        </div>
    );
}
