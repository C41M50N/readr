import { Doc } from "@convex/_generated/dataModel";
import { ArchiveIcon, Calendar1Icon, CalendarIcon, ClockIcon, ExternalLinkIcon } from "lucide-react";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export type ContentCardProps = {
  content: Doc<"contents">;
};

export function ContentCard({ content }: ContentCardProps) {

  const host = (new URL(content.url).hostname).replace(/^www\./, '');
  const title = content.metadata?.title || null;
  const thumbnail = content.metadata?.thumbnail || content.metadata?.cover_img || null;
  const date = content.metadata?.publish_date || null;
  const time = content.metadata?.read_time || content.metadata?.watch_time || null;

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
          <div className="max-w-2xl">
            {title ? (
              <h3 className="text-xl font-semibold mb-0.5">{title}</h3>
            ) : (
              <div className="h-5 w-[500px] bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 bg-size-[200%_100%] animate-[shimmer_0.5s_infinite] rounded mb-2" />
            )}
          </div>
          <p className="mb-2 max-w-2xl text-xs text-gray-700 line-clamp-2 text-ellipsis">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          {/* TODO: Add short description */}

          {/* Details */}
          <div className="flex flex-row">
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
                {time || 12} min read
              </span>
            </div>
          </div>
        </div>

        {/* TODO: Add actions (like, share, open, etc.) */}
        <div className="flex flex-row items-center gap-2">
          <Tooltip delayDuration={1000}>
            <TooltipTrigger>
              <Button variant="ghost" size="icon-sm">
                <ArchiveIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="px-1.5 py-1">
              <span className="text-xs">Archive</span>
            </TooltipContent>
          </Tooltip>
          <Link to={content.url} target="_blank" rel="noopener noreferrer">
            <Tooltip delayDuration={1000}>
              <TooltipTrigger>
                <Button variant="ghost" size="icon-sm">
                  <ExternalLinkIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="px-1.5 py-1">
                <span className="text-xs">Open</span>
              </TooltipContent>
            </Tooltip>
          </Link>
        </div>
      </div>
    </div>
  );
}
