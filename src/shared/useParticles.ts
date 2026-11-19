import { useEffect } from "react";
import particlesConfig from "../config/particlesjs-config.json";

declare global {
    interface Window {
        particlesJS?: (tagId: string, params: unknown) => void;
    }
}

const PARTICLES_SRC = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";

/**
 * Mounts particles.js into the element with the given id.
 * Motion and density come from src/config/particlesjs-config.json; colors are
 * overridden so the particles read on top of the amber brand panel.
 */
export function useParticles(params: { containerId: string; color: string }) {
    const { containerId, color } = params;

    useEffect(() => {
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const config = {
            ...particlesConfig,
            particles: {
                ...particlesConfig.particles,
                color: { value: color },
                shape: {
                    ...particlesConfig.particles.shape,
                    stroke: { ...particlesConfig.particles.shape.stroke, width: 0 }
                },
                line_linked: { ...particlesConfig.particles.line_linked, color }
            }
        };

        const init = () => {
            if (window.particlesJS && document.getElementById(containerId)) {
                window.particlesJS(containerId, config);
            }
        };

        if (window.particlesJS) {
            init();
            return;
        }

        const script = document.createElement("script");
        script.src = PARTICLES_SRC;
        script.async = true;
        script.onload = init;
        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, [containerId, color]);
}
