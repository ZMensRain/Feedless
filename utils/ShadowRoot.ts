type ShadowRootSelectorPart = "$shadowRoot" | string;
export function GetElementThroughShadowRoots(path: ShadowRootSelectorPart[], root: Document | ShadowRoot = document) {
	if (!Array.isArray(path) || path.length === 0) return null;

	let current: Element | Document | ShadowRoot | null = root;

	for (const step of path) {
		if (step === "$shadowRoot") {
			// Enter shadow root of current element
			if (!(current instanceof Element)) return null;
			current = (current as Element).shadowRoot ?? null;
			if (!current) return null;
		} else {
			// Query within current root/element
			if (current instanceof Document || current instanceof ShadowRoot) {
				current = current.querySelector(step);
			} else if (current instanceof Element) {
				current = current.querySelector(step);
			} else {
				return null;
			}
			if (!current) return null;
		}
	}

	return current instanceof Element ? current : null;
}
