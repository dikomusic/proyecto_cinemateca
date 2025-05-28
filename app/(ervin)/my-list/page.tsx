import CustomListManager from "@/components/ervin/organims/CustomListManager";
import WatchHistory from "@/components/ervin/organims/WatchHistory";
import ProfileLayout from "@/components/ervin/templates/ProfileLayout";

export default function MyListPage() {
  return (
    <ProfileLayout>
      <CustomListManager />
      <WatchHistory />
    </ProfileLayout>
  )
}
