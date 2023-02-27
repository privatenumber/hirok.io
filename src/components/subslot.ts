import {
	h,
	Fragment,
	Text,
	cloneVNode,
	type PropType,
	type VNode,
	type VNodeTypes,
} from 'vue';

const createFilter = (
	filter?: string | Array<string>,
) => {
	if (!filter) {
		return [];
	}

	const filterArray = Array.isArray(filter) ? filter : [filter];
	return filterArray.map(type => (
		type === 'text'
			? Text
			: type
	)) as VNodeTypes[];
};

const parseNumber = (value: any) => (
	typeof value === 'number'
		? value
		: Number.parseInt(value, 10)
);

export default defineComponent({
	props: {
		filter: {
			type: [String, Array] as PropType<string | Array<string>>,
		},
		offset: {
			type: [String, Number],
			validator: value => !Number.isNaN(parseNumber(value)),
		},
		limit: {
			type: [String, Number],
			validator: value => !Number.isNaN(parseNumber(value)),
		},
	},
	render() {
		if (!this.$slots.default) {
			return;
		}

		const slotNodes = this.$slots.default();

		let vnodes = slotNodes.flatMap(vnode => (
			vnode.type === Fragment
				? vnode.children
				: vnode
		)) as VNode[];

		if (this.$props.filter) {
			const filter = createFilter(this.$props.filter);
			vnodes = vnodes.filter(
				vnode => filter.includes(vnode.type),
			);
		}

		const isAllText = vnodes.length > 0 && vnodes.every(vnode => vnode.type === Text);
		if (
			isAllText
			&& this.$slots['text-wrapper']
		) {
			const textWrapperSlot = this.$slots['text-wrapper'];
			const textWrapperVnodes = textWrapperSlot();

			if (textWrapperVnodes.length !== 1) {
				throw new Error('Wrapper must be a single element');
			}

			const [textWrapper] = textWrapperVnodes;
			if (
				'children' in textWrapper
				&& textWrapper.children !== null
			) {
				// Eventually support nested wrapper
				throw new Error('Wrapper must be empty');
			}

			const cloned = cloneVNode(textWrapper);
			/**
			 1  ShapeFlags.ELEMENT
			 16 ShapeFlags.ARRAY_CHILDREN
			 */
			cloned.shapeFlag = 17;
			cloned.children = vnodes;
			return cloned;
		}

		if (this.$props.offset) {
			const offset = parseNumber(this.$props.offset);
			vnodes = vnodes.slice(offset);
		}

		if (this.$props.limit) {
			const limit = parseNumber(this.$props.limit);
			vnodes = vnodes.slice(0, limit);
		}

		return (
			vnodes.length > 1
				? h(Fragment, vnodes)
				: vnodes[0]
		);
	},
});
