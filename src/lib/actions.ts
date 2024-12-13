"use server";

import { pool } from "@/lib/db";
import { DNSEntry, DNSEntryWithoutId } from "@/lib/definitions";
import dns from "dns/promises";

export const fetchEntries = async (query: string) => {
  try {
    const conditions = [];
    const params = [];

    if (query) {
      conditions.push("domain_name LIKE ? OR ip_address LIKE ?");
      params.push(`%${query}%`, `%${query}%`);
    }

    const whereClause =
      conditions.length > 0 ? "WHERE " + conditions.join("") : "";

    const [entries] = await pool.query(
      `SELECT * FROM dns
      ${whereClause}`,
      params
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data]: any = await pool.query(
      `SELECT COUNT(*) AS count FROM dns
      ${whereClause}`,
      params
    );

    return { entries: entries as DNSEntry[], count: data[0].count };
  } catch (error) {
    console.log("An error occured: ", error);
    throw new Error("Error fetching DNS entries.");
  }
};

export const insertEntry = async (entry: DNSEntryWithoutId) => {
  try {
    await pool.query(
      `INSERT INTO dns (domain_name, ip_address, ip_class)
      VALUES (?, ?, ?)`,
      [entry.domain_name, entry.ip_address, entry.ip_class]
    );
  } catch (error) {
    console.log("An error occured: ", error);
    throw new Error(`The domain '${entry.domain_name}' already exists in the table.`);
  }
}

export const updateEntry = async (entry_id: number, entry: DNSEntryWithoutId) => {
  try {
    await pool.query(
      `UPDATE dns
      SET domain_name = ?,
          ip_address = ?,
          ip_class = ?
      WHERE id = ?`,
      [entry.domain_name, entry.ip_address, entry.ip_class, entry_id]
    );
  } catch (error) {
    console.log("An error occured: ", error);
    throw new Error("Error updating DNS entry.");
  }
}

export const deleteEntry = async (entry_id: number) => {
  try {
    await pool.query(
      `DELETE FROM dns
      WHERE id = ?`,
      [entry_id]
    );
  } catch (error) {
    console.log("An error occured: ", error);
    throw new Error("Error deleting DNS entry.");
  }
}

export const deleteEntries = async (entry_ids: number[]) => {
  try {
    await pool.query(
      `DELETE FROM dns
      WHERE id IN ?`,
      [entry_ids]
    );
  } catch (error) {
    console.log("An error occured: ", error);
    throw new Error("Error deleting DNS entries.");
  }
}

export const resolveDns = async (domain: string) => {
  try {
    const addresses = await dns.resolve4(domain);
    const ip_address = addresses[0];
    const ip_class = getIpClass(ip_address);

    return { ip_address, ip_class };
  } catch (error) {
    console.log("An error occured: ", error);
    throw new Error("Failed to resolve domain");
  }
};

const getIpClass = (address: string) => {
  const firstOctet = parseInt(address.split(".")[0]);

  if (firstOctet >= 1 && firstOctet <= 126) return "A";
  else if (firstOctet >= 128 && firstOctet <= 191) return "B";
  else if (firstOctet >= 192 && firstOctet <= 223) return "C";
  else if (firstOctet >= 224 && firstOctet <= 239) return "D";
  else return "E";
};
