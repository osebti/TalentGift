import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";

function DeleteOrgButton() {
  return (
    <Button
      id="delete-org"
      label="Delete Organization"
      href="/dashboard/delete-org"
      navigate
      style="btn-secondary rounded-2xl"
    />
  );
}

export default function Settings() {
  return (
    <div id="settings-outer-container" className="px-4 md:px-8">
      <PageTitle id="settings" title="Settings" style="mb-4" />
      <DeleteOrgButton />
    </div>
  );
}
