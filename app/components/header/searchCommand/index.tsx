import { FileIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import MoonIcon from "../../icon/moonIcon";
import SunIcon from "../../icon/sunIcon";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";

function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const [value, setValue] = useState("");

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", keyDown);
    return () => document.removeEventListener("keydown", keyDown);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <div className="w-full flex-1 md:w-auto md:flex-none">
        <button
          className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-50 lg:w-64 "
          onClick={() => setOpen(true)}
        >
          <span className="lg:inline-flex">Search documentation...</span>
          <kbd className="hidden pointer-events-none absolute right-1.5 top-1.5 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              value={value + "ghost"}
              onSelect={() => {
                runCommand(() => !!value && router.push(`/?search=${value}`));
              }}
            >
              <FileIcon className="mr-2 h-4 w-4" />
              {!value ? "Please enter your search term" : `Search: ${value}`}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem
              value="Light"
              onSelect={() => runCommand(() => setTheme("light"))}
            >
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem
              value="Dark"
              onSelect={() => runCommand(() => setTheme("dark"))}
            >
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SearchCommand;
