import { Calendar } from "lucide-react";

export interface Component {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
}

export const components: Component[] = [
  {
    id: "cinema-booking",
    title: "Cinema Seat Booking",
    description:
      "Interactive movie theater seat selection with real-time pricing and booking flow",
    icon: Calendar,
    color: "from-red-500 to-pink-500",
    gradient: "bg-gradient-to-br from-red-500 to-pink-500",
  },
];
