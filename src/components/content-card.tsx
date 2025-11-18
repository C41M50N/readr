import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDuration } from "@/lib/utils";
import { Doc } from "@convex/_generated/dataModel";
import { IconMessagePlus } from '@tabler/icons-react';
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { ArchiveIcon, BookOpenIcon, CalendarIcon, ClockIcon, ExternalLinkIcon } from "lucide-react";

export type ContentCardProps = {
  content: Doc<"contents">;
};

export function ContentCard({ content }: ContentCardProps) {

  const host = (new URL(content.url).hostname).replace(/^www\./, '');
  const title = content.metadata?.title || null;
  const thumbnail = content.metadata?.thumbnail || content.metadata?.cover_img || null;
  const date = content.metadata?.publish_date || null;
  const time = content.metadata?.read_time || content.metadata?.duration || null as number | null;
  const author = content.metadata?.author || content.metadata?.channel_name || "Unknown Author";

  function moveToArchive() {
    // TODO: Implement archive logic here
  }

  return (
    <div className="min-h-28 w-full max-w-[2000px] p-4 border border-gray-300 rounded-sm">
      <div className="flex flex-row items-start">
        {/* thumbnail */}
        <div className="size-24 mr-4 shrink-0 bg-gray-200 rounded overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 bg-size-[200%_100%] animate-[pulse_2.5s_infinite] rounded" />
          )}
        </div>
        <div className="flex-1 min-h-20 flex flex-col justify-between">
          <div className="mb-0.5 max-w-3xl">
            {title ? (
              <h3 className="text-xl font-semibold line-clamp-1 text-ellipsis">{title}</h3>
            ) : (
              <div className="h-6 w-full max-w-[700px] bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 bg-size-[200%_100%] animate-[shimmer_0.5s_infinite] rounded mb-2" />
            )}
          </div>
          <p className="mb-2 max-w-2xl text-xs text-gray-700 line-clamp-2 text-ellipsis">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          {/* TODO: Add short description */}

          {/* Details */}
          <div className="-mb-5 flex flex-row">
            <div className="flex flex-row items-center">
              <div className="size-3.5 mr-2">
                <img src={content.metadata?.favicon || `https://www.google.com/s2/favicons?domain=${host}`} alt="Favicon" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm">
                {host}
              </span>
            </div>

            <span className="px-2.5 text-neutral-700">•</span>

            {/* TODO: Add author info */}
            <div className="flex flex-row items-center">
              <span className="text-sm text-neutral-900">
                {author}
              </span>
            </div>

            <span className="px-2.5 text-neutral-700">•</span>

            {date && (
              <div className="flex flex-row items-center">
                <CalendarIcon className="size-3.5 inline-block mr-2 text-neutral-900" strokeWidth={1.5} />
                <span className="text-sm text-neutral-900">
                  {dayjs(date).format("MMM D, YYYY")}
                </span>
              </div>
            )}

            <span className="px-2.5 text-neutral-700">•</span>

            <div className="flex flex-row items-center">
              <ClockIcon className="size-3.5 inline-block mr-2 text-neutral-900" strokeWidth={1.5} />
              <span className="text-sm text-neutral-900">
                {content.type === "video" ? `${formatDuration(time)} watch` : `${time || 12} min read`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1.5">
          <Link to={`/content/${content._id.toString()}`}>
            <Tooltip delayDuration={1000}>
              <TooltipTrigger>
                <Button asChild variant="ghost" className="p-1 size-7">
                  <BookOpenIcon className="size-4.5" strokeWidth={1.75} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="px-1.5 py-1">
                <span className="text-xs">read</span>
              </TooltipContent>
            </Tooltip>
          </Link>
          <Link to={`/chat/new?contents=${content._id.toString()}`}>
            <Tooltip delayDuration={1000}>
              <TooltipTrigger>
                <Button asChild variant="ghost" className="p-1 size-7">
                  <IconMessagePlus className="size-4.5" strokeWidth={1.75} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="px-1.5 py-1">
                <span className="text-xs">chat</span>
              </TooltipContent>
            </Tooltip>
          </Link>
          <Tooltip delayDuration={1000}>
            <TooltipTrigger>
              <Button asChild variant="ghost" className="p-1 size-7" onClick={moveToArchive}>
                <ArchiveIcon className="size-4.5" strokeWidth={1.75} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="px-1.5 py-1">
              <span className="text-xs">archive</span>
            </TooltipContent>
          </Tooltip>
          <Link to={content.url} target="_blank" rel="noopener noreferrer">
            <Tooltip delayDuration={1000}>
              <TooltipTrigger>
                <Button asChild variant="ghost" className="p-1 size-7">
                  <ExternalLinkIcon strokeWidth={1.75} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="px-1.5 py-1">
                <span className="text-xs">open</span>
              </TooltipContent>
            </Tooltip>
          </Link>
        </div>
      </div>
    </div>
  );
}
