
interface FadeOnLoadParams {
    duration?: number;
}
export const fadeOnLoad = (node: HTMLElement, params: FadeOnLoadParams = {}) => {
    if (node instanceof HTMLImageElement && node.complete) {
        return;
    }

    params.duration = params.duration || 0.1;

    node.style.opacity = '0';
    node.style.transition = `opacity ${params.duration}s ease-in-out`;
    node.onload = () => {
        node.style.opacity = '1';
    };
}