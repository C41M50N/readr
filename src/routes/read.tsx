import { MarkdownViewer } from '@/components/markdown-viewer'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpIcon, BookIcon, BotIcon, ChevronDownIcon, PlusIcon, UploadIcon } from 'lucide-react'


export const Route = createFileRoute('/read')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-row">

      {/* Reader section (left half of the page) */}
      <div className="h-full w-1/2 border-r border-gray-300">
        {/* Content switcher */}
        <div className="w-full h-8 border-b border-gray-300 mb-4 flex flex-row items-start gap-0">
          <div className="px-0 text-ellipsis overflow-hidden whitespace-nowrap">
            <Tooltip delayDuration={600}>
              <TooltipTrigger>
                <Button variant="ghost" className="h-full max-w-52 pl-3 pr-1 rounded-none border-x">
                  <BookIcon className="size-3 mr-0" />
                  <span className="text-xs text-left text-ellipsis font-normal overflow-hidden whitespace-nowrap">
                    Article Title Example That Is Quite Long and Might Overflow
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="px-1.5 py-1">
                <span className="text-xs">Article Title Example That Is Quite Long and Might Overflow</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Markdown viewer goes here */}
        <ScrollArea className="px-6 pb-6">
          {/* toolbar (copy markdown button, download button, ) */}
          <MarkdownViewer
            content={"## Sample Article\nThis is a sample article content displayed in the reader section.\n\n- Point 1\n- Point 2\n\nEnjoy reading!\n\n```js\nconsole.log('Hello, world!');\n```"}
          />
        </ScrollArea>
      </div>

      {/* Chat section (right half of the page) */}
      <div className="w-1/2">
        <div className="w-full h-8 border-b border-gray-300 mb-4 flex flex-row items-center justify-between">
          {/* Chat title (or "new chat" when no chat is active) */}
          <Popover>
            <PopoverTrigger asChild>
              <Button role="combobox" variant="ghost" size="sm" className="flex-1 flex flex-row items-center justify-between rounded-none">
                <span className="text-sm font-medium">new chat</span>
                <ChevronDownIcon className="size-4 opacity-70" />
              </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={0} className="p-0 w-(--radix-popover-trigger-width) rounded-none">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem>new chat</CommandItem>
                    <CommandItem>Chat 1</CommandItem>
                    <CommandItem>Chat 2</CommandItem>
                    <CommandItem>Chat 3</CommandItem>
                    <CommandItem>Chat 4</CommandItem>
                    <CommandItem>Chat 5</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Chat actions (e.g., clear chat, export chat) */}
          <div className="pl-0.5 pr-1 flex flex-row items-center gap-1">
            <Button variant="ghost" size="icon-sm" className="rounded-none">
              <PlusIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" className="rounded-none">
              <UploadIcon className="size-4" />
            </Button>
          </div>
        </div>

        {/* Chat UI goes here */}
        <ScrollArea className="px-6 mb-4 h-[calc(100vh-200px)]">
          {/* Example chat messages */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-3">
              <div className="size-8 rounded-full bg-gray-300 flex items-center justify-center">
                <BotIcon className="size-5 text-white" />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[70%]">
                <p className="text-sm">
                  Hello! How can I assist you today?
                </p>
              </div>
            </div>
            <div className="self-end bg-blue-600 text-white p-3 rounded-lg max-w-[70%]">
              <p className="text-sm">
                Hi! I have a question about my recent order.
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <div className="size-8 rounded-full bg-gray-300 flex items-center justify-center">
                <BotIcon className="size-5 text-white" />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-[70%]">
                <p className="text-sm">
                  Sure! Could you please provide me with your order number?
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Chat input */}
        <InputGroup className="mx-auto max-w-xl mb-6">
          <InputGroupTextarea placeholder="Ask, Search or Chat..." />
          <InputGroupAddon align="block-end">
            {/* <InputGroupButton
              variant="outline"
              className="rounded-full"
              size="icon-xs"
            >
              <PaperclipIcon />
            </InputGroupButton> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <InputGroupButton variant="ghost"><BotIcon className='mr-0.5' /> Gemini 2.0 Flash</InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                className="[--radius:0.95rem]"
              >
                <DropdownMenuItem>Gemini 2.0 Flash</DropdownMenuItem>
                <DropdownMenuItem disabled>Claude Haiku 4.5</DropdownMenuItem>
                <DropdownMenuItem disabled>GPT 5 Nano</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <InputGroupButton
              variant="default"
              className="ml-auto rounded-full"
              size="icon-xs"
            >
              <ArrowUpIcon />
              <span className="sr-only">Send</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
