import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Property {
  id: number
  title: string
  location: string
  price: number
  image: string
  rating: number
  reviews: number
  guests: number
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/property/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-border">
        {/* Image */}
        <div className="relative h-56 bg-muted overflow-hidden">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <CardContent className="p-4">
          {/* Title and Location */}
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">{property.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{property.location}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-semibold text-foreground">{property.rating}</span>
            <span className="text-sm text-muted-foreground">({property.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              <span className="font-bold text-lg text-primary">${property.price}</span>
              <span className="text-sm text-muted-foreground ml-1">/ night</span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">{property.guests} guests</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
