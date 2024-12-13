import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DNSDialogForm from "@/components/dns-dialog-form";
import DeleteEntriesButton from "@/components/delete-entries-button";
import FilterEntries from "@/components/filter-entries";

const Toolbar = () => {
  return (
    <div className="flex gap-2">
      <SearchInput />
      <FilterEntries />
      <DNSDialogForm mode="add">
        <Button>
          <Plus className="mr-2" /> Add New
        </Button>
      </DNSDialogForm>
      <DeleteEntriesButton />
    </div>
  );
};

export default Toolbar;
