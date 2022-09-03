import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useStore } from "../../../store/store.js";

export const DragableWrapper = ({ children, drag_offset_limit }) => {
	const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
	const setTimescale = useStore((state) => state.setTimescale);
	const timescale = useStore((state) => state.timescale);

  function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ currentTarget, down, movement: [mx, my] }) => {
    // Speed Slider
		my = 0;
		if (mx < -drag_offset_limit) {
			mx = -drag_offset_limit;
		}
		if (mx > drag_offset_limit) {
			mx = drag_offset_limit;
		}
    setTimescale(lerp(0.01,2,((mx+drag_offset_limit)/(drag_offset_limit*2))));
		api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
	});

	// Bind it to a component
	return (
		<animated.div
			id={"animated DRAGABLE"}
			className={" h-fit w-fit"}
			{...bind()}
			style={{ x, y, touchAction: "none" }}>
			{children}
		</animated.div>
	);
};

export default DragableWrapper;
