"use client";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const IP_CLASSES = ["A", "B", "C", "D", "E"];
const DEFAULT_TLDS = [".com", ".net", ".org", ".edu", ".gov"];

const FilterEntries = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedTlds, setSelectedTlds] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState(0);
  const [allTlds, setAllTlds] = useState<string[]>(DEFAULT_TLDS);
  const [customTld, setCustomTld] = useState("");

  useEffect(() => {
    const classes = searchParams.get("classes")?.split(",") || [];
    const tlds = searchParams.get("tlds")?.split(",") || [];
    setSelectedClasses(classes);
    setSelectedTlds(tlds);
    setAllTlds([...new Set([...DEFAULT_TLDS, ...tlds])]);
    setActiveFilters(classes.length + tlds.length);
  }, [searchParams]);

  const addCustomTld = () => {
    const formattedTld = customTld.startsWith(".")
      ? customTld
      : `.${customTld}`;
    if (formattedTld && !allTlds.includes(formattedTld)) {
      setAllTlds((prev) => [...prev, formattedTld]);
      setSelectedTlds((prev) => [...prev, formattedTld]);
      setCustomTld("");
    }
  };

  const handleClassToggle = (ipClass: string) => {
    setSelectedClasses((prev) =>
      prev.includes(ipClass)
        ? prev.filter((c) => c !== ipClass)
        : [...prev, ipClass]
    );
  };

  const handleTldToggle = (tld: string) => {
    setSelectedTlds((prev) =>
      prev.includes(tld) ? prev.filter((t) => t !== tld) : [...prev, tld]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedClasses.length)
      params.set("classes", selectedClasses.join(","));
    if (selectedTlds.length) params.set("tlds", selectedTlds.join(","));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedClasses([]);
    setSelectedTlds([]);
    router.replace(pathname);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="icon" className="relative">
                <Filter className="h-4 w-4" />
                {activeFilters > 0 && (
                  <Badge className="absolute -top-2 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center">
                    {activeFilters}
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filter entries</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-6 p-2">
          <div>
            <h4 className="font-medium mb-3">IP Classes</h4>
            <div className="grid grid-cols-5 gap-4">
              {IP_CLASSES.map((ipClass) => (
                <div key={ipClass} className="flex items-center space-x-2">
                  <Checkbox
                    id={`class-${ipClass}`}
                    checked={selectedClasses.includes(ipClass)}
                    onCheckedChange={() => handleClassToggle(ipClass)}
                  />
                  <Label htmlFor={`class-${ipClass}`}>{ipClass}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-3">TLD Filters</h4>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {allTlds.map((tld) => (
                <div key={tld} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tld-${tld}`}
                    checked={selectedTlds.includes(tld)}
                    onCheckedChange={() => handleTldToggle(tld)}
                  />
                  <Label htmlFor={`tld-${tld}`}>{tld}</Label>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={customTld}
                onChange={(e) => setCustomTld(e.target.value)}
                placeholder="Add custom TLD (e.g. .io)"
                className="h-8"
              />
              <Button
                onClick={addCustomTld}
                disabled={!customTld}
                className="h-8"
              >
                Add
              </Button>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={clearFilters} size="sm">
              Clear All
            </Button>
            <Button onClick={applyFilters} size="sm">
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterEntries;
