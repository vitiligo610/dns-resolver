import DNSTable from "@/components/table/dns-table";
import Toolbar from "@/components/toolbar";
import { SelectionProvider } from "@/contexts/selection-context";

const Home = async ({
  searchParams
}: {
  searchParams?: {
    query?: string;
    classes?: string;
    tlds?: string;
  }
}) => {
  const params = await searchParams;
  const query = params?.query || "";
  const classes = params?.classes?.split(",") || [];
  const tlds = params?.tlds?.split(",") || [];

  return (
    <SelectionProvider>
      <div className="h-20 flex flex-col gap-8">
        <Toolbar />
        <DNSTable 
          query={query} 
          classes={classes}
          tlds={tlds}
        />
      </div>
    </SelectionProvider>
  );
}

export default Home;