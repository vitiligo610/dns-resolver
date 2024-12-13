"use client";

import DNSDialogForm from "@/components/dns-dialog-form";
import { Button } from "@/components/ui/button";
import { DNSEntry } from "@/lib/definitions";
import { Edit } from "lucide-react";

const EditDialogButton = ({ entry }: { entry: DNSEntry }) => {
  return (
    <DNSDialogForm mode="edit" initialData={entry}>
      <Button variant="ghost" size="icon">
        <Edit />
      </Button>
    </DNSDialogForm>
  );
};

export default EditDialogButton;
