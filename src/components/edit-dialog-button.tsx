"use client";

import DNSDialogForm from "@/components/dns-dialog-form";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DNSEntry } from "@/lib/definitions";
import { Edit } from "lucide-react";

const EditDialogButton = ({ entry }: { entry: DNSEntry }) => {
  return (
    <DNSDialogForm mode="edit" initialData={entry}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Edit />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DNSDialogForm>
  );
};

export default EditDialogButton;
