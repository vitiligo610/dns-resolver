import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import DNSDialogForm from "@/components/dns-dialog-form";
import DeleteEntriesButton from "@/components/delete-entries-button";

const Toolbar = () => {
  return (
    <div className="flex gap-2">
      <SearchInput />
      <Button variant="outline" size="icon">
        <Filter />
      </Button>
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
