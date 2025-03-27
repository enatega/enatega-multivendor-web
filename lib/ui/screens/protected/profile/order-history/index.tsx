import { ActiveOrders, PastOrders } from "@/lib/ui/screen-components/protected/profile";

  export default function OrderHistoryScreen() {
    return (
      <div className="flex flex-col space-y-10 my-10">
        {/* Active Orders */}
        <ActiveOrders/>
       {/* Past Orders  */}
        <PastOrders/>
      </div>
    );
  }
  