import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Trash } from "lucide-react";
import DNSDialogForm from "./dns-dialog-form";

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
      <Button variant="destructive" disabled>
        <Trash /> Delete
      </Button>
    </div>
  );
};

export default Toolbar;
