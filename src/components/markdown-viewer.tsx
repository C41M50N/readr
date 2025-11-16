import ReactMarkdown from "react-markdown";

type MarkdownViewerProps = {
  content: string;
};

export function MarkdownViewer(props: MarkdownViewerProps) {
  return (
    <div className="prose">
      <ReactMarkdown>{props.content}</ReactMarkdown>
    </div>
  )
}
