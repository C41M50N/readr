import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddPromptModal } from "@/stores";
import { Button } from "@/components/ui/button";
import React from "react";
import { BlockTypeSelect, BoldItalicUnderlineToggles, CreateLink, InsertCodeBlock, InsertTable, MDXEditor, toolbarPlugin, UndoRedo } from '@mdxeditor/editor'
import {
  headingsPlugin, listsPlugin, quotePlugin,
  thematicBreakPlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  markdownShortcutPlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "@convex/_generated/api";

export function AddPromptModal() {
  const modalStateStore = useAddPromptModal();
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const { mutate: addPrompt } = useMutation({
    mutationFn: useConvexMutation(api.features.prompts.mutations.addPrompt),
    onSuccess: () => {
      toast.success("Prompt added successfully");
      setTitle("");
      setText("");
    },
    onError: (error) => {
      console.error("Add prompt error:", error);
      toast.error(`Failed to add prompt: ${error.message}`);
    }
  });

  function onSubmit() {
    // validate inputs
    if (title.trim() === "" || text.trim() === "") {
      toast.error("Title and prompt text are required");
      return;
    }

    addPrompt({ title: title.trim(), text: text.trim() });
    modalStateStore.set("closed");
  }

  return (
    <Dialog
      onOpenChange={(open) => !open && modalStateStore.set("closed")}
      open={modalStateStore.state === "open"}
    >
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer" onClick={() => modalStateStore.set("open")}>+ new prompt</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="gap-0">
        <Input
          placeholder="title"
          className="w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MDXEditor
          markdown={text}
          contentEditableClassName="prose-sm"
          onChange={setText}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            tablePlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
            codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', ts: 'TypeScript', tsx: 'TypeScript', md: 'Markdown' } }),
            markdownShortcutPlugin(),
            // toolbarPlugin({
            //   toolbarContents: () => (
            //     <>
            //       <UndoRedo />
            //       <BoldItalicUnderlineToggles />
            //       <BlockTypeSelect />
            //       <CreateLink />
            //       <InsertTable />
            //       <InsertCodeBlock />
            //     </>
            //   )
            // })
          ]}
          placeholder={
            <span className="text-sm text-muted-foreground">
              enter prompt text here...
            </span>
          }
          className="mt-4 h-96 border border-gray-300 rounded"
        />
        <div className="flex flex-row gap-3 justify-end">
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => modalStateStore.set("closed")}
          >
            cancel
          </Button>
          <Button
            className="mt-4"
            onClick={onSubmit}
          >
            create prompt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
