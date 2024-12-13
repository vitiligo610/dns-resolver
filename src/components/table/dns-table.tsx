import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { fetchEntries } from "@/lib/actions";

interface DNSTableProps {
  query: string;
}

const DNSTable = async ({ query }: DNSTableProps) => {
  const { entries, count } = await fetchEntries(query);

  return (
    <div className="flex flex-col gap-4 pb-8">
      <DataTable columns={columns} data={entries} />
      <p className="text-muted-foreground text-sm text-right italic">
        Showing {count} entries
      </p>
    </div>
  )
}

export default DNSTable;