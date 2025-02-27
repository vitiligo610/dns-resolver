export type DNSEntry = {
  id: number;
  domain_name: string;
  ip_address: string;
  ip_class: string;
};

export type DNSEntryWithoutId = Omit<DNSEntry, "id">;