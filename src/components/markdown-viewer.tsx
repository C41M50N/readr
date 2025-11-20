import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

type MarkdownViewerProps = {
  content: string;
  className?: string;
};

export function MarkdownViewer(props: MarkdownViewerProps) {
  return (
    <div className={cn("w-full prose", props.className)}>
      <ReactMarkdown>{props.content}</ReactMarkdown>
    </div>
  )
}
