import { Sparkle } from "@/components/Doodles";

export default function AnnouncementBar() {
  return (
    <div className="bg-espresso text-oat">
      <div className="container-x flex items-center justify-center gap-3 py-2 text-center">
        <span className="label">Free shipping over ₹999</span>
        <Sparkle className="h-3 w-3 text-crema" />
        <span className="label">10% off your first pour</span>
      </div>
    </div>
  );
}
