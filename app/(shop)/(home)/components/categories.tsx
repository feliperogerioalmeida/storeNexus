"Use server"

import { db } from "@/app/_lib/prisma"
import CategoryItem from "./category-item"

const Categories = async () => {
  const categories = await db.category.findMany({})

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-6">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Categories
