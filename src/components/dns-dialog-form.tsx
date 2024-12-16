"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { insertEntry, updateEntry, resolveDns } from "@/lib/actions";
import { DNSEntry, DNSEntryWithoutId } from "@/lib/definitions";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface DNSDialogFormProps {
  mode: "add" | "edit";
  initialData?: DNSEntry;
  children: React.ReactNode;
}

const DNSDialogForm = ({ mode, initialData, children }: DNSDialogFormProps) => {
  const [open, setOpen] = useState(false);
  const [domain, setDomain] = useState(initialData?.domain_name ?? "");
  const [ipAddress, setIpAddress] = useState(initialData?.ip_address ?? "");
  const [ipClass, setIpClass] = useState(initialData?.ip_class ?? "");
  const [isFetching, setIsFetching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isFetchSuccess, setIsFetchSuccess] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (open && initialData) {
      console.log("intiial data is, ", initialData);
      setDomain(initialData.domain_name);
      setIpAddress(initialData.ip_address);
      setIpClass(initialData.ip_class);
    }
  }, [initialData, open]);

  const resetForm = () => {
    setDomain("");
    setIpAddress("");
    setIpClass("");
  };

  const handleFetchDetails = async () => {
    try {
      setIsFetching(true);
      const { ip_address, ip_class } = await resolveDns(domain);
      setIpAddress(ip_address);
      setIpClass(ip_class);
      setIsFetchSuccess(true);
    } catch (error) {
      console.error("Failed to fetch DNS details:", error);
      toast({
        variant: "destructive",
        description: "Failed to fetch DNS details.",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleAdd = async () => {
    try {
      setIsAdding(true);
      const entry: DNSEntryWithoutId = {
        domain_name: domain,
        ip_address: ipAddress,
        ip_class: ipClass,
      };
      if (!initialData)
        await insertEntry(entry)
      else
        await updateEntry(initialData.id, entry);
      setOpen(false);
      resetForm();
      toast({
        description: `DNS entry ${mode === "add" ? "added" : "updated"} successfully!`,
      });
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to add DNS entry:", error.message);
      toast({
        variant: "destructive",
        description: error.message,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add" : "Edit"} DNS Entry</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="domain">Domain Name</Label>
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ip">IP Address</Label>
            <Input
              id="ip"
              value={ipAddress}
              disabled
              placeholder="Will be fetched automatically"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="class">IP Class</Label>
            <Input
              id="class"
              value={ipClass}
              disabled
              placeholder="Will be determined automatically"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleFetchDetails}
              disabled={!domain || isFetching}
            >
              {isFetching ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                "Fetch Details"
              )}
            </Button>
            <Button
              onClick={handleAdd}
              disabled={!ipAddress || !ipClass || !isFetchSuccess || isAdding}
            >
              {isAdding ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  {mode == "add" ? "Adding" : "Updating"}...
                </>
              ) : (
                <>
                  {mode === "add" ? "Add" : "Update"}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DNSDialogForm;
