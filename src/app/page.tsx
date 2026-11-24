import InvitationClient from "@/components/InvitationClient";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ to?: string | string[] }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawTo = Array.isArray(params.to) ? params.to[0] : params.to;
  const guestName = rawTo?.trim().slice(0, 60) || undefined;

  return <InvitationClient guestName={guestName} />;
}
