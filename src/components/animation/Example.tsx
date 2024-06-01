import * as React from "react"
import { useRef } from "react"
import { motion, useAnimation } from "framer-motion"

const Example = ({ count, setCount }) => {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const generateCircularMotionKeyframes = (radius: number, steps: number) => {
    const keyframes: any[] = []
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * 2 * Math.PI
      keyframes.push({
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      })
    }
    return keyframes
  }
  const circularMotionKeyframes = generateCircularMotionKeyframes(60,60);

  React.useEffect(() => {
    controls.start({
      x: circularMotionKeyframes.map((frame) => frame.x),
      y: circularMotionKeyframes.map((frame) => frame.y),
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      }
    });
  }, [controls, circularMotionKeyframes]);

  const handleDragEnd = async () => {
    await controls.start({ x: 60, y: 0 });
    setCount(count + 1);
  }

  return (
    <>
      <motion.div className="drag-area" ref={constraintsRef} />
      <motion.div
        className="drag"
        drag
        dragConstraints={constraintsRef}
        animate={controls}
        transition={{ duration: 0.5 }}
        onDragEnd={()=> handleDragEnd()}
      />
    </>
  )
}
export default Example
