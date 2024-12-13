"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSelection } from "@/contexts/selection-context";
import { useToast } from "@/hooks/use-toast";
import { deleteEntries } from "@/lib/actions";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteEntriesButton = () => {
  const { selectedIds, setSelectedIds } = useSelection();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteEntries(selectedIds);
      toast({
        description: "DNS Entries deleted successfully!",
      });
      setSelectedIds([]);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={selectedIds.length === 0}>
          <Trash /> Delete ({selectedIds.length})
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {selectedIds.length} DNS entries. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEntriesButton;
