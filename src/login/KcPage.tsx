import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import("./main.css");
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const Login = lazy(() => import("./pages/Login"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));

const doMakeUserConfirmPassword = true;

/**
 * PatternFly is turned off: the look comes entirely from ./main.css.
 * Every Keycloak class key is mapped to a gd-* class below so that pages rendered by
 * Keycloakify's DefaultPage (register, OTP, update profile, errors...) get the same design.
 */
const doUseDefaultCss = false;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login-update-password.ftl":
                        return (
                            <LoginUpdatePassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={doUseDefaultCss}
                            />
                        );
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={doUseDefaultCss}
                            />
                        );
                    case "login-reset-password.ftl":
                        return (
                            <LoginResetPassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={doUseDefaultCss}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={doUseDefaultCss}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const icon = (name: string) => `gd-icon gd-icon--${name}`;

const classes = {
    kcFormClass: "gd-form",
    kcFormGroupClass: "gd-field",
    kcFormGroupErrorClass: "gd-field--error",
    kcFormGroupHeader: "gd-field",
    kcContentWrapperClass: "gd-row",
    kcLabelClass: "gd-label",
    kcInputClass: "gd-input",
    kcTextareaClass: "gd-input gd-textarea",
    kcInputLargeClass: "gd-input--lg",
    kcInputErrorMessageClass: "gd-field-error",
    kcInputHelperTextBeforeClass: "gd-helper",
    kcInputHelperTextAfterClass: "gd-helper",
    kcInputGroup: "gd-input-group",
    kcFormPasswordVisibilityButtonClass: "gd-input-adornment",
    kcFormPasswordVisibilityIconShow: icon("eye"),
    kcFormPasswordVisibilityIconHide: icon("eye-off"),

    kcCheckClass: "gd-check",
    kcCheckInputClass: "gd-check__input",
    kcCheckLabelClass: "gd-check__label",
    kcCheckboxInputClass: "gd-check__input",
    kcInputClassCheckbox: "gd-check",
    kcInputClassCheckboxInput: "gd-check__input",
    kcInputClassCheckboxLabel: "gd-check__label",
    kcInputClassRadio: "gd-check",
    kcInputClassRadioInput: "gd-check__input",
    kcInputClassRadioLabel: "gd-check__label",
    kcInputClassRadioCheckboxLabelDisabled: "gd-check__label--disabled",

    kcFormSettingClass: "gd-form-settings",
    kcFormOptionsWrapperClass: "gd-form-options-end",
    kcFormButtonsClass: "gd-form-buttons",
    kcButtonClass: "gd-btn",
    kcButtonPrimaryClass: "gd-btn--primary",
    kcButtonDefaultClass: "gd-btn--outlined",
    kcButtonBlockClass: "gd-btn--block",
    kcButtonLargeClass: "gd-btn--lg",

    kcSignUpClass: "gd-signup",
    kcAlertClass: "gd-alert",
    kcAlertTitleClass: "gd-alert__text",
    kcFeedbackSuccessIcon: icon("success"),
    kcFeedbackWarningIcon: icon("warning"),
    kcFeedbackErrorIcon: icon("error"),
    kcFeedbackInfoIcon: icon("info"),
    kcResetFlowIcon: icon("restart"),

    kcFormSocialAccountSectionClass: "gd-social",
    kcFormSocialAccountListClass: "gd-social__list",
    kcFormSocialAccountListGridClass: "gd-social__list--grid",
    kcFormSocialAccountListButtonClass:
        "gd-btn gd-btn--outlined gd-btn--block gd-social__btn",
    kcFormSocialAccountNameClass: "gd-social__name",
    kcCommonLogoIdP: "gd-social__logo",

    kcSelectAuthListClass: "gd-select-auth",
    kcSelectAuthListItemClass: "gd-select-auth__item",
    kcSelectAuthListItemIconClass: "gd-select-auth__icon",
    kcSelectAuthListItemBodyClass: "gd-select-auth__body",
    kcSelectAuthListItemHeadingClass: "gd-select-auth__heading",
    kcSelectAuthListItemDescriptionClass: "gd-select-auth__desc",
    kcSelectAuthListItemArrowClass: "gd-select-auth__arrow",
    kcSelectAuthListItemArrowIconClass: icon("chevron-right"),
    kcAuthenticatorDefaultClass: icon("key"),
    kcAuthenticatorPasswordClass: icon("lock"),
    kcAuthenticatorOTPClass: icon("phone"),
    kcAuthenticatorWebAuthnClass: icon("key"),
    kcAuthenticatorWebAuthnPasswordlessClass: icon("key"),
    kcWebAuthnDefaultIcon: icon("key"),
    kcWebAuthnKeyIcon: icon("key"),
    kcWebAuthnUnknownIcon: icon("key"),
    kcWebAuthnUSB: icon("key"),
    kcWebAuthnNFC: icon("key"),
    kcWebAuthnBLE: icon("key"),
    kcWebAuthnInternal: icon("key"),

    kcLoginOTPListClass: "gd-otp-tile",
    kcLoginOTPListInputClass: "gd-otp-tile__input",
    kcLoginOTPListItemHeaderClass: "gd-otp-tile__header",
    kcLoginOTPListItemIconBodyClass: "gd-otp-tile__icon",
    kcLoginOTPListItemIconClass: icon("phone"),
    kcLoginOTPListItemTitleClass: "gd-otp-tile__title",

    kcSrOnlyClass: "gd-sr-only"
} satisfies { [key in ClassKey]?: string };
