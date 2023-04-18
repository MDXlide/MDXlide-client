import stlyes from "@/styles/components/FullSlideItem.module.css";

export default function FullSlideItem({ chapter }) {
  const { mdxResult, position } = chapter;
  const slideStyle = {
    gridColumn: position[0] + 1,
    gridRow: position[1] + 1,
  };

  return (
    <div className={stlyes.slide} style={slideStyle}>
      {mdxResult}
    </div>
  );
}
