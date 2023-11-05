/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SensusIconSpin {
    }
    interface SensusScore {
        "value": number;
    }
}
declare global {
    interface HTMLSensusIconSpinElement extends Components.SensusIconSpin, HTMLStencilElement {
    }
    var HTMLSensusIconSpinElement: {
        prototype: HTMLSensusIconSpinElement;
        new (): HTMLSensusIconSpinElement;
    };
    interface HTMLSensusScoreElement extends Components.SensusScore, HTMLStencilElement {
    }
    var HTMLSensusScoreElement: {
        prototype: HTMLSensusScoreElement;
        new (): HTMLSensusScoreElement;
    };
    interface HTMLElementTagNameMap {
        "sensus-icon-spin": HTMLSensusIconSpinElement;
        "sensus-score": HTMLSensusScoreElement;
    }
}
declare namespace LocalJSX {
    interface SensusIconSpin {
    }
    interface SensusScore {
        "value"?: number;
    }
    interface IntrinsicElements {
        "sensus-icon-spin": SensusIconSpin;
        "sensus-score": SensusScore;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "sensus-icon-spin": LocalJSX.SensusIconSpin & JSXBase.HTMLAttributes<HTMLSensusIconSpinElement>;
            "sensus-score": LocalJSX.SensusScore & JSXBase.HTMLAttributes<HTMLSensusScoreElement>;
        }
    }
}