import codeStyles from "@/styles/CodeEditor.module.css";

export default function CodeEditor() {
  return (
    <section className={codeStyles.section}>
      <div className="title">
        <h3>MDX CODE</h3>
        <span>what mdx?</span>
      </div>
      <textarea />
    </section>
  );
}
