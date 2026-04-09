import { Button } from "@/components/ui/button";
import { Star, MapPin, Package, Users } from "lucide-react";
import { mockFarms } from "@/modules/profile/components/account/mockData";
import { useState } from "react";

const FarmSection = () => {
  const [following, setFollowing] = useState(mockFarms.map((f) => f.id));

  const toggleFollow = (id) => {
    setFollowing((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl"></span>
        <h3 className="text-xl font-semibold text-foreground">
          Theo dõi trang trại
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockFarms.map((farm) => {
          const isFollowing = following.includes(farm.id);
          return (
            <div
              key={farm.id}
              className="border border-border rounded-xl p-5 hover:shadow-md hover:shadow-primary/5 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-3xl shrink-0">
                  {farm.image}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">
                    {farm.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" /> {farm.location}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Package className="w-3 h-3" /> {farm.products} SP
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />{" "}
                      {farm.followers.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning" /> {farm.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  Xem trang trại
                </Button>
                <Button
                  size="sm"
                  variant={isFollowing ? "outline" : "default"}
                  onClick={() => toggleFollow(farm.id)}
                  className={`flex-1 ${isFollowing ? "border-destructive text-destructive hover:bg-destructive/10" : ""}`}
                >
                  {isFollowing ? "Bỏ theo dõi" : "Theo dõi"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FarmSection;
